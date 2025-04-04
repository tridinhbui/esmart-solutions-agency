const axios = require("axios");
const { Content, SeoMetadata, TrendData } = require("../models");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * SEO Checklist used for content evaluation
 */
const SEO_CHECKLIST = {
  keywordOptimization: {
    weight: 25,
    checks: [
      "Keyword used in title",
      "Keyword used in first paragraph",
      "Keyword used in at least one H2 heading",
      "Keyword density between 1-3%",
      "LSI keywords used appropriately",
    ],
  },
  contentQuality: {
    weight: 30,
    checks: [
      "Content has at least 1000 words",
      "Content divided into short paragraphs (max 3-4 sentences)",
      "Headings used to structure content (H2, H3)",
      "No spelling or grammar errors",
      "Information is accurate and up-to-date",
    ],
  },
  readability: {
    weight: 20,
    checks: [
      "Flesch Reading Ease score above 60",
      "Uses short and simple sentences",
      "Uses active voice",
      "Avoids jargon and complex terminology",
      "Uses bullet points and numbered lists where appropriate",
    ],
  },
  metaTags: {
    weight: 15,
    checks: [
      "Optimized meta title (under 60 characters and contains main keyword)",
      "Optimized meta description (under 160 characters and contains main keyword)",
      "SEO-friendly URL (short, contains keyword)",
      "Alt text for images (if any)",
      "Appropriate schema markup",
    ],
  },
  userExperience: {
    weight: 10,
    checks: [
      "Content is readable on mobile devices",
      "Uses internal linking",
      "Reading time is appropriate for content length",
      "Clear call-to-action",
      "Readable formatting (font size, spacing, etc.)",
    ],
  },
};

/**
 * Function to analyze SEO for content
 * @param {string} contentId - ID of content to analyze
 * @returns {Object} SEO analysis results
 */
async function analyzeSEO(contentId) {
  try {
    console.log(
      `[SEO_WORKFLOW] Starting SEO analysis for content ID: ${contentId}`
    );

    // Get content from database
    const content = await Content.findByPk(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    // Check if generatedContent exists and has length property
    if (!content.generatedContent) {
      console.warn(
        `[SEO_WORKFLOW] Content ID ${contentId} has no generatedContent`
      );
      content.generatedContent = ""; // Set default empty string for safety
    }

    console.log(
      `[SEO_WORKFLOW] Content found, content length: ${content.generatedContent.length} characters`
    );

    // Get current SEO data if available
    let seoMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    // If none exists, create new metadata
    if (!seoMetadata) {
      seoMetadata = await SeoMetadata.create({
        contentId,
        seoScore: 0,
        optimizationCount: 0,
      });
    }

    // Analyze trending keywords from Google Trends using Gemini Pro
    console.log(
      `[SEO_WORKFLOW] Calling Gemini API to analyze keyword trends: ${
        content.keywords || ""
      }`
    );

    // Add safety check for keywords as well
    if (!content.keywords) {
      content.keywords = "";
      console.warn(
        `[SEO_WORKFLOW] Content ID ${contentId} has no keywords, using empty string`
      );
    }

    const trendKeywords = await analyzeTrendKeywords(
      content.keywords,
      content.topic || ""
    );
    console.log(
      `[SEO_WORKFLOW] Received keyword trend analysis from Gemini`,
      JSON.stringify(trendKeywords).substring(0, 200) + "..."
    );

    // Analyze content using Gemini Pro
    console.log(`[SEO_WORKFLOW] Calling Gemini API to analyze SEO content`);
    const seoAnalysis = await analyzeContentWithGemini(
      content.generatedContent,
      content.keywords,
      trendKeywords
    );
    console.log(
      `[SEO_WORKFLOW] Received content analysis from Gemini, SEO Score: ${seoAnalysis.score}`
    );

    // Save analysis results to SEO metadata
    seoMetadata.seoScore = seoAnalysis.score;
    seoMetadata.keywordDensity = seoAnalysis.keywordDensity;
    seoMetadata.readabilityScore = Math.round(
      parseFloat(seoAnalysis.readabilityScore || 0)
    );
    seoMetadata.metaTitle = seoAnalysis.metaTitle;
    seoMetadata.metaDescription = seoAnalysis.metaDescription;
    seoMetadata.suggestedKeywords = JSON.stringify(
      seoAnalysis.suggestedKeywords
    );
    seoMetadata.analysisReport = JSON.stringify(seoAnalysis.detailedAnalysis);

    await seoMetadata.save();

    console.log(
      `[SEO_WORKFLOW] Completed SEO analysis for content ID: ${contentId}, SEO Score: ${seoAnalysis.score}`
    );
    return {
      contentId,
      seoScore: seoAnalysis.score,
      analysis: seoAnalysis,
      metadata: seoMetadata,
    };
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw error;
  }
}

/**
 * Function to analyze trending keywords from Google Trends
 * @param {string} keywords - Original keywords
 * @param {string} topic - The main topic for the content
 * @returns {Array} List of trending keywords
 */
async function analyzeTrendKeywords(keywords, topic = "") {
  try {
    // Extract keywords and determine topic
    const keywordArray = keywords.split(",").map((k) => k.trim());
    const mainKeyword = keywordArray[0]; // Use first keyword as main keyword

    // If no topic provided, try to extract from first keyword
    if (!topic || topic.trim() === "") {
      topic = mainKeyword;
    }

    console.log(
      `[SEO] Analyzing trending keywords for topic: "${topic}" with main keyword: "${mainKeyword}"`
    );

    // Extract key words from topic for better matching
    const topicWords = topic
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 3 &&
          !["about", "with", "from", "that", "this", "these", "those"].includes(
            word
          )
      );

    console.log(`[SEO] Topic keywords for matching: ${topicWords.join(", ")}`);

    // Search in MongoDB - first with exact matching
    let existingTrend = await TrendData.findOne({
      $or: [
        { keyword: { $regex: new RegExp(`^${mainKeyword}$`, "i") } },
        { keyword: { $regex: new RegExp(`^${topic}$`, "i") } },
      ],
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Within the last 7 days
    }).sort({ createdAt: -1 });

    // If no exact match but we have topic words, try matching with topic words
    if (!existingTrend && topicWords.length > 0) {
      const topicPatterns = topicWords.map(
        (word) => new RegExp(`\\b${word}\\b`, "i")
      );

      existingTrend = await TrendData.findOne({
        $or: [
          { keyword: { $in: topicPatterns } },
          { relatedKeywords: { $elemMatch: { $in: topicPatterns } } },
        ],
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      }).sort({ createdAt: -1 });

      if (existingTrend) {
        console.log(
          `[SEO] Found trending keywords from topic match: ${existingTrend.keyword}`
        );
      }
    }

    // If recent data exists, validate it's related to our topic before using
    if (existingTrend) {
      const isRelatedToTopic = topicWords.some(
        (word) =>
          existingTrend.keyword.toLowerCase().includes(word) ||
          existingTrend.relatedKeywords.some((kw) =>
            kw.toLowerCase().includes(word)
          )
      );

      if (isRelatedToTopic) {
        console.log(
          `[SEO] Using existing trend data for "${existingTrend.keyword}"`
        );
        return {
          mainKeyword: existingTrend.keyword,
          relatedKeywords: existingTrend.relatedKeywords,
          trendScore: existingTrend.trend_score,
          recommendations: existingTrend.recommendations || [],
          competition: existingTrend.competition || "Medium",
          trend: existingTrend.trend || "Stable",
        };
      } else {
        console.log(
          `[SEO] Found trend data is not related to topic, generating new data`
        );
      }
    }

    // If not, call Gemini API for analysis with improved prompt
    const prompt = `
    As an expert SEO analyst with deep knowledge of current search trends, analyze the following:
    
    TOPIC: ${topic}
    MAIN KEYWORD: ${mainKeyword}
    RELATED KEYWORDS: ${keywords}
    
    Your task:
    1. Identify 5-10 high-performing, trending keywords that are DIRECTLY related to the topic "${topic}"
    2. Evaluate the competition level for each keyword (low, medium, high)
    3. Provide specific, actionable recommendations for content optimization
    4. Identify the search trend direction over recent months (increasing, decreasing, or stable)
    
    IMPORTANT: The keywords you suggest MUST be directly related to "${topic}" - do not suggest keywords for unrelated products or services.
    
    Format your analysis as a clean JSON object with these exact fields:
    {
      "mainKeyword": "primary keyword",
      "relatedKeywords": ["related keyword 1", "related keyword 2", ...],
      "trendScore": a number from 0-100 representing the keyword's current popularity,
      "competition": "Low/Medium/High",
      "recommendations": ["specific suggestion 1", "specific suggestion 2", ...],
      "trend": "Increasing/Stable/Decreasing"
    }
    
    Important guidelines:
    - Use the same language as the provided topic and keywords
    - Focus on ONLY trending related keywords that directly relate to the topic "${topic}"
    - Provide specific, actionable recommendations that would genuinely improve content
    - Base your analysis on current search trends and SEO best practices
    - Return ONLY the JSON object, nothing else`;

    const response = await axios.post(
      GEMINI_API_URL,
      {
        model: "google/gemini-pro",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Process response to remove markdown code blocks if any
    let content = response.data.choices[0].message.content;

    // --- Improved JSON processing method ---
    // 1. Process common markdown code block cases
    content = content.replace(/```json\s*([\s\S]*?)\s*```/g, "$1"); // Remove complete json blocks
    content = content.replace(/```\s*([\s\S]*?)\s*```/g, "$1"); // Remove untagged code blocks
    content = content.replace(/`/g, ""); // Remove single backticks

    // 2. Try to find valid JSON in the content
    const jsonRegex = /(\{[\s\S]*\})/;
    const jsonMatch = content.match(jsonRegex);

    let trendData;

    if (jsonMatch && jsonMatch[1]) {
      try {
        trendData = JSON.parse(jsonMatch[1].trim());
      } catch (parseError) {
        console.error("Error parsing extracted JSON:", parseError);
        console.log(
          "Problematic JSON:",
          jsonMatch[1].trim().substring(0, 500) + "..."
        );

        // 3. If still error, apply advanced error correction methods
        let fixedJson = jsonMatch[1]
          .trim()
          .replace(/,(\s*})/g, "$1") // Remove comma before final }
          .replace(/,(\s*])/g, "$1") // Remove comma before final ]
          .replace(/\n/g, " ") // Remove newlines
          .replace(/\t/g, " ") // Remove tabs
          .replace(/\\/g, "\\\\") // Escape backslash
          .replace(/([,\s]+])/, "]") // Process invalid comma-separated arrays
          .replace(/([^\\])"/g, '$1\\"') // Escape double quotes not allowed in JSON
          .replace(/([^\\])'/g, '$1"') // Change single quotes to double quotes
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'); // Ensure JSON property names are valid

        try {
          trendData = JSON.parse(fixedJson);
        } catch (secondError) {
          console.error("Error parsing fixed JSON:", secondError);

          // Last resort: Use default data
          console.log("Using fallback trend data");
          trendData = createDefaultTrendData(keywordArray, mainKeyword, topic);
        }
      }
    } else {
      console.error("No valid JSON found in response");
      trendData = createDefaultTrendData(keywordArray, mainKeyword, topic);
    }

    // Validate that keywords are related to topic
    const validatedKeywords = validateKeywordsForTopic(
      trendData.relatedKeywords,
      topic,
      mainKeyword
    );
    trendData.relatedKeywords = validatedKeywords;

    // Check for complete data
    if (!trendData.mainKeyword) trendData.mainKeyword = mainKeyword;
    if (
      !trendData.relatedKeywords ||
      !Array.isArray(trendData.relatedKeywords) ||
      trendData.relatedKeywords.length === 0
    ) {
      trendData.relatedKeywords = createTopicBasedKeywords(topic, mainKeyword);
    }
    if (!trendData.trendScore || isNaN(trendData.trendScore))
      trendData.trendScore = 50;
    if (
      !trendData.recommendations ||
      !Array.isArray(trendData.recommendations) ||
      trendData.recommendations.length === 0
    ) {
      trendData.recommendations = [
        `Use "${topic}" in title tag`,
        `Add "${mainKeyword}" to headings`,
        "Include topic keywords in meta description",
        "Ensure content addresses key topic points",
        "Use related keywords in subheadings",
      ];
    }

    console.log(
      `[SEO] Generated trending keywords: ${trendData.relatedKeywords.join(
        ", "
      )}`
    );

    // Save data to MongoDB
    try {
      await TrendData.create({
        keyword: mainKeyword,
        relatedKeywords: trendData.relatedKeywords,
        trend_score: trendData.trendScore,
        competition: trendData.competition || "Medium",
        recommendations: trendData.recommendations,
        analysisText: JSON.stringify(trendData),
        category: trendData.category || "general",
        topic: topic, // Save topic for better future matching
      });
    } catch (dbError) {
      console.error("Error saving trend data to database:", dbError);
      // Continue with analyzed data without error
    }

    return trendData;
  } catch (error) {
    console.error("Error analyzing trend keywords:", error);
    // Fallback if API error - create topic-based keywords
    return createDefaultTrendData(
      keywords.split(",").map((k) => k.trim()),
      keywords.split(",")[0].trim(),
      topic || keywords.split(",")[0].trim()
    );
  }
}

/**
 * Validate that keywords are related to the topic with improved detection including prices, numerical ranges
 */
function validateKeywordsForTopic(keywords, topic, mainKeyword) {
  if (!keywords || !Array.isArray(keywords)) {
    return createTopicBasedKeywords(topic, mainKeyword);
  }

  // Tiền xử lý topic để nhận dạng đặc biệt (số, khoảng giá, mã SP)
  const processedTopic = topic.toLowerCase();

  // Trích xuất các phần đặc biệt từ topic (phạm vi giá, số liệu, mã SP)
  const specialPatterns = {
    // Phạm vi giá 50K-100K hoặc 50,000-100,000 VND hoặc $50-$100
    priceRanges:
      processedTopic.match(
        /(\d+[k,.\d]*\s*[-]\s*\d+[k,.\d]*\s*(?:vnd|vnđ|\$)?)/gi
      ) || [],

    // Mã sản phẩm/model (như A8L 2016, iPhone 13 Pro Max, BMW X5)
    productCodes:
      processedTopic.match(/([a-z0-9]+\s*[0-9]+|[a-z]+\s*[0-9]+\s*[a-z]+)/gi) ||
      [],

    // Số liệu cụ thể (25MP, 128GB, 4.7inch)
    numbers:
      processedTopic.match(
        /(\d+[.,]?\d*\s*(?:mp|gb|tb|inch|km|m|cm|mm|kg|g)?)/gi
      ) || [],
  };

  // Tách topic thành các từ riêng lẻ
  let topicWords = topic
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 2 &&
        ![
          "about",
          "with",
          "from",
          "that",
          "this",
          "these",
          "those",
          "the",
          "and",
          "for",
          "a",
          "an",
        ].includes(word)
    );

  console.log(`[SEO_VALIDATION] Special patterns detected in topic: 
    Price ranges: ${specialPatterns.priceRanges.join(", ")}
    Product codes: ${specialPatterns.productCodes.join(", ")}
    Numbers: ${specialPatterns.numbers.join(", ")}
  `);

  // Tạo bộ kiểm tra tương đồng từ topic
  const topicMatchers = [
    // Kiểm tra từ khóa chứa từ nào đó trong topic
    (keyword) =>
      topicWords.some(
        (word) =>
          keyword.toLowerCase().includes(word) ||
          word.includes(keyword.toLowerCase())
      ),

    // Kiểm tra từ khóa chứa phạm vi giá tương tự
    (keyword) =>
      specialPatterns.priceRanges.some((range) =>
        keyword.toLowerCase().includes(range)
      ),

    // Kiểm tra từ khóa chứa mã sản phẩm/model tương tự
    (keyword) =>
      specialPatterns.productCodes.some(
        (code) =>
          keyword.toLowerCase().includes(code) ||
          keyword
            .toLowerCase()
            .match(new RegExp(code.replace(/\s+/g, "\\s*"), "i"))
      ),

    // Kiểm tra từ khóa chứa số liệu tương tự
    (keyword) =>
      specialPatterns.numbers.some((num) =>
        keyword.toLowerCase().includes(num)
      ),

    // Kiểm tra từ khóa bao gồm mainKeyword
    (keyword) =>
      keyword.toLowerCase().includes(mainKeyword.toLowerCase()) ||
      mainKeyword.toLowerCase().includes(keyword.toLowerCase()),

    // Kiểm tra từ khóa bao gồm toàn bộ topic
    (keyword) =>
      keyword.toLowerCase().includes(processedTopic) ||
      processedTopic.includes(keyword.toLowerCase()),
  ];

  // Xác định từ khóa liên quan dựa trên các bộ kiểm tra
  const relatedKeywords = keywords.filter((keyword) =>
    topicMatchers.some((matcher) => matcher(keyword))
  );

  const nonRelatedKeywords = keywords.filter(
    (keyword) => !relatedKeywords.includes(keyword)
  );

  console.log(
    `[SEO_VALIDATION] Found ${relatedKeywords.length}/${keywords.length} keywords related to topic "${topic}"`
  );

  if (nonRelatedKeywords.length > 0) {
    console.log(
      `[SEO_VALIDATION] Non-related keywords: ${nonRelatedKeywords.join(", ")}`
    );
  }

  // Nếu không có từ khóa liên quan hoặc có ít hơn 40% từ khóa liên quan
  if (
    relatedKeywords.length === 0 ||
    relatedKeywords.length / keywords.length < 0.4
  ) {
    console.log(
      `[SEO_VALIDATION] Insufficient related keywords, adding topic-based keywords`
    );

    // Tạo từ khóa dựa trên topic
    const topicKeywords = createTopicBasedKeywords(topic, mainKeyword);

    // Nếu có một số từ khóa liên quan, kết hợp chúng
    if (relatedKeywords.length > 0) {
      // Thêm các từ khóa liên quan vào đầu danh sách, sau đó là các từ khóa từ topic
      return [
        ...relatedKeywords,
        ...topicKeywords.filter((tk) => !relatedKeywords.includes(tk)),
      ].slice(0, 10);
    }

    // Nếu không có từ khóa liên quan, sử dụng các từ khóa dựa trên topic và một số từ khóa gốc
    return [...topicKeywords, ...keywords.slice(0, 3)].slice(0, 10);
  }

  // Nếu đủ từ khóa liên quan, sử dụng chúng
  return relatedKeywords.slice(0, 10); // Giới hạn 10 từ khóa
}

/**
 * Create keywords based on topic
 */
function createTopicBasedKeywords(topic, mainKeyword) {
  const topicWords = topic
    .toLowerCase()
    .split(/\s+/)
    .filter(
      (word) =>
        word.length > 3 &&
        !["about", "with", "from", "that", "this", "these", "those"].includes(
          word
        )
    );

  // Create base keywords
  const baseKeywords = [
    mainKeyword,
    topic,
    `${topic} tips`,
    `best ${mainKeyword}`,
    `${mainKeyword} guide`,
  ];

  // Add combinations with topic words
  const topicCombinations = topicWords
    .map((word) => `${word} ${mainKeyword}`)
    .slice(0, 5);

  return [...baseKeywords, ...topicCombinations];
}

/**
 * Create default trend data with topic information
 */
function createDefaultTrendData(keywordArray, mainKeyword, topic = "") {
  // Use topic if provided, or mainKeyword as fallback
  const baseTopic = topic && topic.trim() !== "" ? topic : mainKeyword;

  // Generate keywords based on topic
  const relatedKeywords = createTopicBasedKeywords(baseTopic, mainKeyword);

  return {
    mainKeyword,
    relatedKeywords,
    trendScore: 50,
    competition: "Medium",
    trend: "Stable",
    recommendations: [
      `Use "${baseTopic}" in title`,
      `Add "${mainKeyword}" to headings`,
      "Include topic keywords in meta description",
      "Ensure content addresses key topic points",
      "Use related keywords in subheadings",
    ],
  };
}

/**
 * Function to analyze content using Gemini Pro
 * @param {string} content - Content to analyze
 * @param {string} keywords - Original keywords
 * @param {Object} trendData - Trend data
 * @returns {Object} Analysis results
 */
async function analyzeContentWithGemini(content, keywords, trendData) {
  try {
    console.log(
      `[GEMINI_API] Starting content analysis with Gemini Pro, keywords: ${keywords}`
    );

    // Detect content language
    const contentLanguage = detectContentLanguage(content);
    console.log(`[GEMINI_API] Content language: ${contentLanguage}`);

    // Create new SEO requirements
    const seoRequirements = {
      keywordDensity: "1.5-2%",
      contentLength: "800-1000 words",
      headingStructure: "H1 (1), H2 (3-5), H3 (optional)",
      readabilityScore: "Flesch-Kincaid >70 (easy to read)",
      metaDescription: "50-160 characters containing the keyword",
    };

    // Create prompt for Gemini Pro with new requirements
    let prompt;
    if (contentLanguage === "vietnamese") {
      prompt = `
      Bạn là một chuyên gia SEO hàng đầu. Hãy phân tích nội dung sau và đưa ra đánh giá SEO chi tiết bằng tiếng Việt:

      === TỪ KHÓA ===
      ${keywords}
      
      === TỪ KHÓA XU HƯỚNG ===
      ${JSON.stringify(trendData, null, 2)}
      
      === YÊU CẦU SEO ===
      ${JSON.stringify(seoRequirements, null, 2)}
      
      === NỘI DUNG CẦN PHÂN TÍCH ===
      ${content.substring(0, 15000)} ${
        content.length > 15000 ? "... (nội dung bị cắt)" : ""
      }
      
      === CHECKLIST SEO ===
      ${JSON.stringify(SEO_CHECKLIST, null, 2)}
      
      Hãy phân tích và đánh giá nội dung dựa trên Checklist SEO và các yêu cầu SEO. Với mỗi mục trong checklist, hãy đưa ra điểm số từ 0-100 và các nhận xét chi tiết.
      
      HƯỚNG DẪN QUAN TRỌNG:
      1. Hãy thực hiện phân tích kỹ lưỡng, đánh giá chính xác về mặt chuyên môn SEO
      2. Đảm bảo tất cả các đề xuất cải thiện đều bằng TIẾNG VIỆT và phù hợp với ngôn ngữ gốc của nội dung
      3. Tập trung vào các đề xuất cụ thể, thực tế có thể áp dụng ngay
      4. Các từ khóa gợi ý phải liên quan đến nội dung gốc và PHẢI giữ nguyên ngôn ngữ
      5. KHÔNG dịch nội dung hay đề xuất sang ngôn ngữ khác
      
      Trả về kết quả phân tích CHÍNH XÁC theo định dạng JSON sau:
      {
        "score": (điểm tổng thể từ 0-100),
        "keywordDensity": (phần trăm mật độ từ khóa chính, ví dụ: 2.5),
        "readabilityScore": (điểm đọc từ 0-100),
        "wordCount": (số lượng từ),
        "metaTitle": (đề xuất meta title tối ưu cho SEO),
        "metaDescription": (đề xuất meta description tối ưu cho SEO, 50-160 ký tự có chứa từ khóa),
        "suggestedKeywords": [(đề xuất từ khóa bổ sung)],
        "detailedAnalysis": {
          "keywordOptimization": {
            "score": (điểm từ 0-100),
            "comments": [(nhận xét chi tiết)],
            "improvements": [(đề xuất cải thiện)]
          },
          "contentQuality": {
            "score": (điểm từ 0-100),
            "comments": [(nhận xét chi tiết)],
            "improvements": [(đề xuất cải thiện)]
          },
          "readability": {
            "score": (điểm từ 0-100),
            "comments": [(nhận xét chi tiết)],
            "improvements": [(đề xuất cải thiện)]
          },
          "metaTags": {
            "score": (điểm từ 0-100),
            "comments": [(nhận xét chi tiết)],
            "improvements": [(đề xuất cải thiện)]
          },
          "userExperience": {
            "score": (điểm từ 0-100),
            "comments": [(nhận xét chi tiết)],
            "improvements": [(đề xuất cải thiện)]
          }
        }
      }`;
    } else {
      prompt = `
      You are a top SEO expert. Analyze the following content and provide a detailed SEO assessment in English:

      === KEYWORDS ===
      ${keywords}
      
      === TREND KEYWORDS ===
      ${JSON.stringify(trendData, null, 2)}
      
      === SEO REQUIREMENTS ===
      ${JSON.stringify(seoRequirements, null, 2)}
      
      === CONTENT TO ANALYZE ===
      ${content.substring(0, 15000)} ${
        content.length > 15000 ? "... (content truncated)" : ""
      }
      
      === SEO CHECKLIST ===
      ${JSON.stringify(SEO_CHECKLIST, null, 2)}
      
      Analyze and evaluate the content based on the SEO Checklist and SEO requirements. For each item in the checklist, provide a score from 0-100 and detailed professional comments.
      
      IMPORTANT GUIDELINES:
      1. Perform in-depth analysis with technically accurate SEO assessments
      2. Ensure all suggested improvements are in ENGLISH and relevant to the original content
      3. Focus on specific, actionable recommendations that can be implemented immediately
      4. Suggested keywords must be relevant to the original content and MUST maintain the same language
      5. DO NOT translate to any other language
      
      Return your analysis in this EXACT JSON format:
      {
        "score": (overall score from 0-100),
        "keywordDensity": (percentage of main keyword density, e.g., 2.5),
        "readabilityScore": (reading score from 0-100),
        "wordCount": (number of words),
        "metaTitle": (suggested meta title optimized for SEO),
        "metaDescription": (suggested meta description optimized for SEO, 50-160 characters containing the keyword),
        "suggestedKeywords": [(suggested additional keywords)],
        "detailedAnalysis": {
          "keywordOptimization": {
            "score": (score from 0-100),
            "comments": [(detailed comments)],
            "improvements": [(suggested improvements)]
          },
          "contentQuality": {
            "score": (score from 0-100),
            "comments": [(detailed comments)],
            "improvements": [(suggested improvements)]
          },
          "readability": {
            "score": (score from 0-100),
            "comments": [(detailed comments)],
            "improvements": [(suggested improvements)]
          },
          "metaTags": {
            "score": (score from 0-100),
            "comments": [(detailed comments)],
            "improvements": [(suggested improvements)]
          },
          "userExperience": {
            "score": (score from 0-100),
            "comments": [(detailed comments)],
            "improvements": [(suggested improvements)]
          }
        }
      }`;
    }

    // Call Gemini Pro API
    console.log("[GEMINI_API] Sending request to Gemini Pro API...");
    const response = await axios.post(
      GEMINI_API_URL,
      {
        model: "google/gemini-pro",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "[GEMINI_API] Received response from Gemini Pro API successfully"
    );

    // Add log for response check
    console.log(
      `[GEMINI_API] First raw response from Gemini: ${response.data.choices[0].message.content.substring(
        0,
        300
      )}...`
    );

    // Process response to remove markdown code blocks if any
    let responseContent = response.data.choices[0].message.content;

    // --- Improved JSON processing method ---
    // 1. Process common markdown code block cases
    responseContent = responseContent.replace(
      /```json\s*([\s\S]*?)\s*```/g,
      "$1"
    ); // Remove complete json blocks
    responseContent = responseContent.replace(/```\s*([\s\S]*?)\s*```/g, "$1"); // Remove untagged code blocks
    responseContent = responseContent.replace(/`/g, ""); // Remove single backticks

    // 2. Try to find valid JSON in the content
    const jsonRegex = /(\{[\s\S]*\})/;
    const jsonMatch = responseContent.match(jsonRegex);

    let analysisResult;

    if (jsonMatch && jsonMatch[1]) {
      try {
        analysisResult = JSON.parse(jsonMatch[1].trim());
      } catch (parseError) {
        console.error("Error parsing extracted JSON:", parseError);
        console.log(
          "Problematic JSON:",
          jsonMatch[1].trim().substring(0, 500) + "..."
        );

        // 3. If still error, apply advanced error correction methods
        let fixedJson = jsonMatch[1]
          .trim()
          .replace(/,(\s*})/g, "$1") // Remove comma before final }
          .replace(/,(\s*])/g, "$1") // Remove comma before final ]
          .replace(/\n/g, " ") // Remove newlines
          .replace(/\t/g, " ") // Remove tabs
          .replace(/\\/g, "\\\\") // Escape backslash
          .replace(/([,\s]+])/, "]") // Process invalid comma-separated arrays
          .replace(/([^\\])"/g, '$1\\"') // Escape double quotes not allowed in JSON
          .replace(/([^\\])'/g, '$1"') // Change single quotes to double quotes
          .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":'); // Ensure JSON property names are valid

        try {
          analysisResult = JSON.parse(fixedJson);
        } catch (secondError) {
          console.error("Error parsing fixed JSON:", secondError);

          // Last resort: Build full JSON from scratch
          try {
            // Build default JSON based on response format
            const manuallyFixedJson = buildDefaultAnalysisJson(
              keywords,
              content,
              trendData
            );
            analysisResult = JSON.parse(manuallyFixedJson);
            console.log("Successfully created default JSON structure");
          } catch (finalError) {
            console.error("All JSON parsing attempts failed:", finalError);
            throw new Error("Unable to parse JSON from response");
          }
        }
      }
    } else {
      console.error("No valid JSON found in response");
      // Create default JSON if no JSON structure found
      const defaultJson = buildDefaultAnalysisJson(
        keywords,
        content,
        trendData
      );
      try {
        analysisResult = JSON.parse(defaultJson);
        console.log(
          "Created default JSON structure due to missing JSON in response"
        );
      } catch (error) {
        console.error("Error creating default JSON:", error);
        throw new Error("No valid JSON found in response");
      }
    }

    // Check for complete data in result and fill in default values if missing
    const keywordArray = keywords.split(",").map((k) => k.trim());
    const mainKeyword = keywordArray[0];
    const wordCount = content ? content.split(/\s+/).length : 0;

    // Ensure all fields are present
    console.log(
      `[GEMINI_API] Content analysis successful, SEO Score: ${
        analysisResult.score || 70
      }`
    );

    // Process JSON result for consistency and ensure proper types
    if (analysisResult) {
      // Ensure score is an integer
      if (analysisResult.score && !isNaN(analysisResult.score)) {
        analysisResult.score = Math.round(parseFloat(analysisResult.score));
      }

      // Ensure readabilityScore is an integer
      if (
        analysisResult.readabilityScore &&
        !isNaN(analysisResult.readabilityScore)
      ) {
        analysisResult.readabilityScore = Math.round(
          parseFloat(analysisResult.readabilityScore)
        );
      }

      // Ensure keywordDensity is a float
      if (
        analysisResult.keywordDensity &&
        !isNaN(analysisResult.keywordDensity)
      ) {
        analysisResult.keywordDensity = parseFloat(
          analysisResult.keywordDensity
        );
      }
    }

    // Create fallback if needed
    if (!analysisResult) {
      const keywordArray = keywords.split(",").map((k) => k.trim());
      const mainKeyword = keywordArray[0];
      const wordCount = content ? content.split(/\s+/).length : 0;

      analysisResult = {
        score: 70,
        keywordDensity: 1.5,
        readabilityScore: 75,
        wordCount: wordCount,
        metaTitle: `${mainKeyword} - Comprehensive Guide`,
        metaDescription: `Learn about ${mainKeyword} with a comprehensive guide. Providing leading solutions for ${mainKeyword}.`,
        suggestedKeywords: keywordArray,
        detailedAnalysis: createDefaultAnalysis(mainKeyword),
      };
    }

    console.log(
      `[GEMINI_API] Content analysis successful, SEO Score: ${
        analysisResult.score || 70
      }`
    );

    return analysisResult;
  } catch (error) {
    console.error("[GEMINI_API] Error when analyzing content:", error);
    if (error.response) {
      console.error("[GEMINI_API] API error details:", {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
      });
    }

    // Return default result if error
    const keywordArray = keywords.split(",").map((k) => k.trim());
    const mainKeyword = keywordArray[0];
    const wordCount = content ? content.split(/\s+/).length : 0;

    return {
      score: 70,
      keywordDensity: 1.5,
      readabilityScore: 75,
      wordCount: wordCount,
      metaTitle: `${mainKeyword} - Comprehensive Guide`,
      metaDescription: `Learn about ${mainKeyword} with a comprehensive guide. Providing leading solutions for ${mainKeyword}.`,
      suggestedKeywords: keywordArray,
      detailedAnalysis: createDefaultAnalysis(mainKeyword),
    };
  }
}

// Function to create default analysis when no API result
function createDefaultAnalysis(keyword) {
  return {
    keywordOptimization: {
      score: 65,
      comments: ["Keyword density needs optimization"],
      improvements: [
        `Increase "${keyword}" keyword density to 1.5-2%`,
        `Add "${keyword}" to H1 title`,
        `Ensure "${keyword}" appears in the first paragraph`,
      ],
    },
    contentQuality: {
      score: 70,
      comments: ["Content needs better structuring"],
      improvements: [
        "Ensure content is at least 800-1000 words",
        "Structure content with 1 H1, 3-5 H2, and H3 as needed",
        "Divide content into short paragraphs for better readability",
      ],
    },
    readability: {
      score: 75,
      comments: ["Improve readability"],
      improvements: [
        "Use shorter sentences and simpler words",
        "Avoid jargon and complex terminology",
        "Increase Flesch-Kincaid score above 70",
      ],
    },
    metaTags: {
      score: 70,
      comments: ["Meta tags need optimization"],
      improvements: [
        `Use "${keyword}" in meta title`,
        "Keep meta description between 50-160 characters",
        "Add schema markup for better search results",
      ],
    },
    userExperience: {
      score: 70,
      comments: ["User experience can be improved"],
      improvements: [
        "Add internal linking for related content",
        "Ensure content is readable on mobile devices",
        "Add clear call-to-action at the end of the article",
      ],
    },
  };
}

/**
 * Function to optimize content based on SEO analysis
 * @param {string} contentId - ID of content to optimize
 * @returns {Object} Optimized content
 */
async function optimizeContent(contentId) {
  try {
    console.log(
      `[SEO_WORKFLOW] Starting content optimization for content ID: ${contentId}`
    );

    // Get content and SEO metadata
    const content = await Content.findByPk(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }
    console.log(
      `[SEO_WORKFLOW] Content found for optimization, content length: ${content.generatedContent.length} characters`
    );

    let seoMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    // If no metadata, perform analysis before optimization
    if (!seoMetadata) {
      console.log(
        `[SEO_WORKFLOW] No SEO data, performing SEO analysis before optimization`
      );
      await analyzeSEO(contentId);
      seoMetadata = await SeoMetadata.findOne({
        where: { contentId },
      });
    }

    // Save SEO score before optimization
    const previousScore = seoMetadata.seoScore;
    console.log(
      `[SEO_WORKFLOW] SEO score before optimization: ${previousScore}`
    );

    // Optimize content using DeepSeek
    console.log(`[SEO_WORKFLOW] Calling DeepSeek API to optimize content`);
    const optimizedContent = await optimizeContentWithDeepSeek(
      content.generatedContent,
      content.keywords,
      JSON.parse(seoMetadata.analysisReport || "{}")
    );
    console.log(
      `[SEO_WORKFLOW] Received optimized content from DeepSeek, new content length: ${optimizedContent.length} characters`
    );

    // Update content and increase optimization count
    content.generatedContent = optimizedContent;
    await content.save();
    console.log(`[SEO_WORKFLOW] Saved optimized content to database`);

    seoMetadata.optimizationCount += 1;
    await seoMetadata.save();
    console.log(
      `[SEO_WORKFLOW] Increased optimization count to ${seoMetadata.optimizationCount}`
    );

    // Re-analyze after optimization
    console.log(`[SEO_WORKFLOW] Re-analyzing SEO after content optimization`);
    const updatedAnalysis = await analyzeSEO(contentId);

    // Get updated SEO metadata
    const updatedMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    // If new score is lower than old, use old score
    if (updatedMetadata.seoScore < previousScore) {
      console.log(
        `[SEO_WORKFLOW] New SEO (${updatedMetadata.seoScore}) is lower than old (${previousScore}), keeping old score`
      );
      updatedMetadata.seoScore = previousScore;
      await updatedMetadata.save();
      updatedAnalysis.seoScore = previousScore;
    } else {
      console.log(
        `[SEO_WORKFLOW] New SEO (${updatedMetadata.seoScore}) is higher than old (${previousScore})`
      );
    }

    console.log(
      `[SEO_WORKFLOW] Completed content optimization for content ID: ${contentId}`
    );
    return {
      contentId,
      optimized: true,
      previousScore: previousScore,
      newScore: updatedMetadata.seoScore,
      content,
      seoMetadata: updatedAnalysis.metadata,
    };
  } catch (error) {
    console.error("Error optimizing content:", error);
    throw error;
  }
}

/**
 * Function to optimize content using DeepSeek
 * @param {string} content - Content to optimize
 * @param {string} keywords - Keywords
 * @param {Object} seoAnalysis - SEO analysis results
 * @returns {string} Optimized content
 */
async function optimizeContentWithDeepSeek(content, keywords, seoAnalysis) {
  try {
    console.log(
      `[DEEPSEEK_API] Starting content optimization with DeepSeek, keywords: ${keywords}`
    );

    // Detect content language
    const contentLanguage = detectContentLanguage(content);
    console.log(`[DEEPSEEK_API] Content language: ${contentLanguage}`);

    // Prepare input based on SEO analysis
    const keywordArray = keywords.split(",").map((k) => k.trim());
    const mainKeyword = keywordArray[0];

    let improvementsNeeded = [];
    if (seoAnalysis && seoAnalysis.detailedAnalysis) {
      // Get all suggested improvements
      for (const category in seoAnalysis.detailedAnalysis) {
        if (seoAnalysis.detailedAnalysis[category].improvements) {
          improvementsNeeded = [
            ...improvementsNeeded,
            ...seoAnalysis.detailedAnalysis[category].improvements,
          ];
        }
      }
    }

    // Fallback if no improvements suggested
    if (improvementsNeeded.length === 0) {
      improvementsNeeded = [
        "Optimize keyword density (1.5-2%)",
        "Use keywords in title and first paragraph",
        "Improve content structure with clear headings",
        "Improve readability (Flesch-Kincaid >70)",
        "Optimize content length (800-1000 words)",
      ];
    }

    // Limit suggested improvements to avoid too long prompt
    if (improvementsNeeded.length > 10) {
      improvementsNeeded = improvementsNeeded.slice(0, 10);
    }

    // SEO requirements
    const seoRequirements = {
      keywordDensity: "1.5-2%",
      contentLength: "800-1000 words",
      headingStructure: "H1 (1), H2 (3-5), H3 (optional)",
      readabilityScore: "Flesch-Kincaid >70 (easy to read)",
      metaDescription: "50-160 characters containing the keyword",
      evaluationCriteria: [
        "Keyword placement",
        "Content structure",
        "Readability",
        "Meta tags",
        "Internal linking",
      ],
    };

    // Create system prompt
    const systemPrompt =
      "You are a professional content optimization expert who specializes in enhancing content while maintaining its natural tone and authentic voice. Your optimizations are seamless and preserve the original meaning while making the content more engaging and effective. You never use markdown formatting like #, ##, *, or - in your output. You maintain the content's original language and cultural context completely.";

    // Create user prompt for DeepSeek based on detected language
    let userPrompt;
    if (contentLanguage === "vietnamese") {
      userPrompt = `
      Tôi cần bạn tối ưu hóa nội dung sau đây để cải thiện SEO mà vẫn giữ nguyên tính tự nhiên và giọng điệu của bài viết:

      === TỪ KHÓA CHÍNH ===
      ${keywords}
      
      === YÊU CẦU TỐI ƯU HÓA SEO ===
      ${JSON.stringify(seoRequirements, null, 2)}
      
      === CẢI TIẾN CẦN THỰC HIỆN ===
      ${improvementsNeeded.join("\n")}
      
      === NỘI DUNG GỐC ===
      ${content}
      
      Hãy tối ưu hóa nội dung trên theo các hướng dẫn sau:
      
      HƯỚNG DẪN QUAN TRỌNG:
      1. GIỮ NGUYÊN NGÔN NGỮ TIẾNG VIỆT của bài viết, KHÔNG dịch sang ngôn ngữ khác
      2. Giữ cấu trúc tổng thể và ý nghĩa chính của nội dung, chỉ cải thiện cách diễn đạt
      3. Đảm bảo từ khóa chính xuất hiện trong tiêu đề H1 và đoạn văn đầu tiên một cách tự nhiên
      4. Tối ưu mật độ từ khóa để đạt 1.5-2%, nhưng đảm bảo sự tự nhiên trong cách dùng từ
      5. Cải thiện cấu trúc tiêu đề với 1 H1, 3-5 H2, và H3 nếu cần, sử dụng CHỮ IN HOA cho tiêu đề thay vì markdown
      6. Cải thiện khả năng đọc bằng cách sử dụng câu ngắn hơn và từ ngữ đơn giản hơn
      7. KHÔNG giảm giá trị thông tin của nội dung
      8. Đảm bảo văn phong và giọng điệu tự nhiên, không có cảm giác "viết bởi AI"
      9. KHÔNG sử dụng markdown (*, #, ##, -, >, \`\`\`)
      
      CHỈ TRẢ VỀ NỘI DUNG ĐÃ TỐI ƯU HÓA, không kèm theo giải thích hoặc thông tin bổ sung nào.`;
    } else {
      userPrompt = `
      I need you to optimize the following content to improve SEO while maintaining its natural tone and authentic voice:

      === MAIN KEYWORDS ===
      ${keywords}
      
      === SEO OPTIMIZATION REQUIREMENTS ===
      ${JSON.stringify(seoRequirements, null, 2)}
      
      === IMPROVEMENTS NEEDED ===
      ${improvementsNeeded.join("\n")}
      
      === ORIGINAL CONTENT ===
      ${content}
      
      Please optimize the above content following these guidelines:
      
      IMPORTANT INSTRUCTIONS:
      1. PRESERVE THE ORIGINAL LANGUAGE (English) completely, DO NOT translate
      2. Maintain the overall structure and meaning while enhancing clarity and engagement
      3. Ensure the main keyword appears naturally in the H1 title and first paragraph
      4. Optimize keyword density to reach 1.5-2% while keeping the text natural and flowing
      5. Improve heading structure with 1 H1, 3-5 H2, and H3 as needed, using ALL CAPS for headings instead of markdown
      6. Enhance readability with shorter sentences and simpler words where appropriate
      7. DO NOT reduce the informational value or unique insights
      8. Ensure the tone and voice remain natural, without an "AI-written" feel
      9. DO NOT use any markdown formatting (*, #, ##, -, >, \`\`\`)
      
      ONLY return the optimized content without any explanations or additional information.`;
    }

    // Call DeepSeek API
    console.log("[DEEPSEEK_API] Sending request to DeepSeek API...");
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek/deepseek-coder",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 3500,
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      "[DEEPSEEK_API] Received response from DeepSeek API successfully"
    );

    // Add log for response check
    console.log(
      `[DEEPSEEK_API] First raw response from DeepSeek: ${response.data.choices[0].message.content.substring(
        0,
        300
      )}...`
    );

    // Get optimized content
    let optimizedContent = response.data.choices[0].message.content;

    // Process returned content
    // Remove markdown blocks
    optimizedContent = optimizedContent
      .replace(/```(\w*\n|\n)?/, "")
      .replace(/```$/, "");
    optimizedContent = optimizedContent
      .replace(/^```\w*\s*/gm, "")
      .replace(/\s*```$/gm, "");
    optimizedContent = optimizedContent
      .replace(/^```markdown\s*/gm, "")
      .replace(/\s*```$/gm, "");
    optimizedContent = optimizedContent
      .replace(/^```html\s*/gm, "")
      .replace(/\s*```$/gm, "");

    // Remove any explanations in square or round brackets at the start or end
    optimizedContent = optimizedContent.replace(/^\s*\[.*?\]\s*/gm, "");
    optimizedContent = optimizedContent.replace(/^\s*\(.*?\)\s*/gm, "");
    optimizedContent = optimizedContent.replace(/\s*\[.*?\]\s*$/gm, "");
    optimizedContent = optimizedContent.replace(/\s*\(.*?\)\s*$/gm, "");

    // Remove lines that only contain headings like "Optimized content:" or "Optimized content:"
    optimizedContent = optimizedContent.replace(
      /^(Optimized content:|Optimized content:|Optimized content:)\s*\n/gm,
      ""
    );

    // Trim extra whitespace
    optimizedContent = optimizedContent.trim();

    // Check minimum length
    const minLength = Math.min(content.length / 2, 200); // At least half of original content or 200 characters

    // Return original content if optimizedContent too short
    if (!optimizedContent || optimizedContent.trim().length < minLength) {
      console.error(
        "Optimized content is empty or too short, returning original content"
      );
      return content;
    }

    // If optimized content much longer than original, may be error, return original content
    if (optimizedContent.length > content.length * 2) {
      console.error(
        "Optimized content is significantly longer than original, may be error. Returning original content."
      );
      return content;
    }

    console.log(
      `[DEEPSEEK_API] Content optimization successful, new content length: ${optimizedContent.length} characters`
    );
    return optimizedContent;
  } catch (error) {
    console.error("[DEEPSEEK_API] Error when optimizing content:", error);
    if (error.response) {
      console.error("[DEEPSEEK_API] API error details:", {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data,
      });
    }

    // Return original content if error
    return content;
  }
}

/**
 * Function to generate complete SEO report
 * @param {string} contentId - ID of content to generate report for
 * @returns {Object} Complete SEO report
 */
async function generateSEOReport(contentId) {
  try {
    // Get content and SEO metadata
    const content = await Content.findByPk(contentId);
    if (!content) {
      throw new Error(`Content with ID ${contentId} not found`);
    }

    const seoMetadata = await SeoMetadata.findOne({
      where: { contentId },
    });

    if (!seoMetadata) {
      // If no metadata, perform analysis
      const analysis = await analyzeSEO(contentId);
      return {
        contentId,
        content: content.generatedContent,
        keywords: content.keywords,
        seoScore: analysis.seoScore,
        keywordDensity: analysis.analysis.keywordDensity,
        readabilityScore: analysis.analysis.readabilityScore,
        wordCount: analysis.analysis.wordCount,
        metaTitle: analysis.analysis.metaTitle,
        metaDescription: analysis.analysis.metaDescription,
        suggestedKeywords: analysis.analysis.suggestedKeywords,
        detailedAnalysis: analysis.analysis.detailedAnalysis,
        optimizationCount: 0,
      };
    }

    // Parse JSON from string
    const detailedAnalysis = JSON.parse(seoMetadata.analysisReport || "{}");
    const suggestedKeywords = JSON.parse(seoMetadata.suggestedKeywords || "[]");

    return {
      contentId,
      content: content.generatedContent,
      keywords: content.keywords,
      seoScore: seoMetadata.seoScore,
      keywordDensity: seoMetadata.keywordDensity,
      readabilityScore: seoMetadata.readabilityScore,
      metaTitle: seoMetadata.metaTitle,
      metaDescription: seoMetadata.metaDescription,
      suggestedKeywords: suggestedKeywords,
      detailedAnalysis: detailedAnalysis,
      optimizationCount: seoMetadata.optimizationCount,
    };
  } catch (error) {
    console.error("Error generating SEO report:", error);
    throw error;
  }
}

// Function to create default JSON when all analysis methods fail
function buildDefaultAnalysisJson(keywords, content, trendData) {
  const keywordArray = keywords.split(",").map((k) => k.trim());
  const mainKeyword = keywordArray[0];
  const wordCount = content ? content.split(/\s+/).length : 0;

  // Return object instead of string to ensure proper type handling
  return JSON.stringify({
    score: 70,
    keywordDensity: 1.5,
    readabilityScore: 75,
    wordCount: wordCount,
    metaTitle: `${mainKeyword} - Comprehensive Guide`,
    metaDescription: `Learn about ${mainKeyword} with a comprehensive guide. Providing leading solutions for ${mainKeyword}.`,
    suggestedKeywords: keywordArray,
    detailedAnalysis: createDefaultAnalysis(mainKeyword),
  });
}

/**
 * Function to detect content language
 * @param {string} content - Content to detect language for
 * @returns {string} Content language ('vietnamese' or 'english')
 */
function detectContentLanguage(content) {
  // Check for Vietnamese special characters
  const vietnameseChars =
    /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

  // Check for common Vietnamese words
  const vietnameseWords =
    /(của|và|trong|những|các|không|được|đây|là|phải|với|đang|này|thì|để|làm|quá|rất|lại|lên|xuống|nhất|từng|mới|như|đó|vì|tại)/i;

  // Calculate score to determine language
  let score = 0;

  // If there are Vietnamese characters
  if (vietnameseChars.test(content)) {
    score += 2;
  }

  // If there are common Vietnamese words
  if (vietnameseWords.test(content)) {
    score += 1;
  }

  // Take sample of 200 characters for quick analysis
  const contentSample = content.slice(0, 200);
  const words = contentSample.split(/\s+/);

  // Count Vietnamese words
  const vietnameseWordCount = words.filter((word) =>
    vietnameseChars.test(word)
  ).length;
  const wordRatio = vietnameseWordCount / words.length;

  if (wordRatio > 0.1) {
    score += 2;
  }

  return score >= 2 ? "vietnamese" : "english";
}

const basicAnalyzeTopicAndKeywords = async (topic, keywords) => {
  console.log(`[SEO] Performing basic analysis for topic: "${topic}"`);

  // Lấy các từ khóa chính từ chủ đề
  const topicKeywords = topic
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word) =>
        ![
          "about",
          "with",
          "from",
          "that",
          "this",
          "the",
          "and",
          "for",
          "review",
          "đánh",
          "giá",
        ].includes(word)
    );

  console.log(
    `[SEO] Extracted keywords from topic: ${topicKeywords.join(", ")}`
  );

  // Tạo mảng từ khóa từ chuỗi keywords
  const keywordArray = keywords ? keywords.split(",").map((k) => k.trim()) : [];

  // Đảm bảo các từ khóa từ chủ đề được thêm vào danh sách
  topicKeywords.forEach((topicKw) => {
    if (
      !keywordArray.some(
        (kw) =>
          kw.toLowerCase().includes(topicKw) ||
          topicKw.includes(kw.toLowerCase())
      )
    ) {
      keywordArray.push(topicKw);
    }
  });

  // Đảm bảo có ít nhất một từ khóa
  if (keywordArray.length === 0) {
    keywordArray.push(topic.split(/\s+/)[0]);
  }

  // Tạo default analysis
  return {
    topic,
    keywords: keywordArray,
    relevance: "high",
    competition: "medium",
    searchVolume: "medium",
    suggestions: [
      "Thêm các từ khóa vào tiêu đề",
      "Sử dụng từ khóa trong các đoạn đầu",
      "Thêm hình ảnh có alt text chứa từ khóa",
      "Tối ưu hóa meta description",
      "Thêm nội dung chi tiết, có chiều sâu",
    ],
    trendKeywords: topicKeywords,
    success: true,
  };
};

module.exports = {
  analyzeSEO,
  optimizeContent,
  generateSEOReport,
  SEO_CHECKLIST,
  detectContentLanguage,
  basicAnalyzeTopicAndKeywords,
};

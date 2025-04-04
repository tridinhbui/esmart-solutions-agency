const axios = require("axios");
require("dotenv").config();
const { TrendData } = require("../models");

const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Automated workflow between DeepSeek and Gemini
 * 1. DeepSeek creates a prompt from user input
 * 2. Gemini analyzes and suggests trending keywords
 * 3. DeepSeek rewrites the prompt based on Gemini's keywords
 * 4. Creates SEO-optimized content
 */
async function generateOptimizedContent(
  topic,
  keywords,
  tone,
  type,
  additionalDetails = ""
) {
  try {
    console.log(
      `[OPTIMIZED_FLOW] Starting optimized content generation workflow for topic: "${topic}"`
    );

    // Step 1: Create initial prompt
    const initialPrompt = createInitialPrompt(
      topic,
      keywords,
      tone,
      type,
      additionalDetails
    );

    // Step 2: Get trending keywords from Gemini
    console.log(
      `[OPTIMIZED_FLOW] Getting trend keywords from Gemini for topic: "${topic}"`
    );
    let trendKeywords;
    try {
      trendKeywords = await analyzeTrendKeywordsWithGemini(
        initialPrompt,
        topic,
        keywords
      );
      console.log(
        `[OPTIMIZED_FLOW] Received trend keywords: ${trendKeywords.relatedKeywords.join(
          ", "
        )}`
      );
    } catch (geminiError) {
      console.error(
        "[OPTIMIZED_FLOW] Error getting trend keywords, using standard flow:",
        geminiError.message
      );
      // If Gemini step fails, fallback to standard content generation
      const standardContent = await generateContent(
        topic,
        keywords,
        tone,
        type,
        additionalDetails
      );
      return {
        content: standardContent,
        usedFallback: true,
        errorMessage:
          "Trending keyword analysis failed, using standard content generation",
      };
    }

    // Step 3: Rewrite prompt with trending keywords
    console.log("[OPTIMIZED_FLOW] Enhancing prompt with trend keywords");
    let optimizedPrompt;
    try {
      optimizedPrompt = await rewritePromptWithTrendKeywords(
        initialPrompt,
        trendKeywords,
        tone,
        type
      );
    } catch (promptError) {
      console.error(
        "[OPTIMIZED_FLOW] Error rewriting prompt with trend keywords:",
        promptError.message
      );
      // If prompt rewriting fails, use initial prompt
      optimizedPrompt = initialPrompt;
    }

    // Step 4: Generate content with optimized prompt
    console.log("[OPTIMIZED_FLOW] Generating content with optimized prompt");
    try {
      const content = await generateContentWithOptimizedPrompt(
        optimizedPrompt,
        type
      );

      return {
        content,
        trendKeywords,
        usedPrompt: optimizedPrompt,
        usedFallback: false,
      };
    } catch (contentError) {
      console.error(
        "[OPTIMIZED_FLOW] Error in optimized content generation:",
        contentError.message
      );

      // Final fallback to standard content generation
      console.log(
        "[OPTIMIZED_FLOW] Falling back to standard content generation"
      );
      const fallbackContent = await generateContent(
        topic,
        keywords,
        tone,
        type,
        additionalDetails
      );

      return {
        content: fallbackContent,
        trendKeywords,
        usedFallback: true,
        errorMessage: `Optimized content generation failed: ${contentError.message}`,
      };
    }
  } catch (error) {
    console.error(
      "[OPTIMIZED_FLOW] Critical error in optimized workflow:",
      error.message
    );

    // Return sample content as ultimate fallback
    let sampleContent;
    if (type === "blog") {
      sampleContent = generateSampleBlogContent(topic, keywords);
    } else {
      sampleContent = generateSampleContent(topic, keywords, type);
    }

    return {
      content: sampleContent,
      usedFallback: true,
      errorMessage: `Critical error in content generation: ${error.message}`,
    };
  }
}

/**
 * DeepSeek creates initial prompt from user input
 */
async function createInitialPrompt(
  topic,
  keywords,
  tone,
  type,
  additionalDetails = ""
) {
  try {
    console.log(
      `[DEEPSEEK_PROMPT] Creating initial prompt for topic: "${topic}"`
    );

    const systemPrompt =
      "You are a prompt engineer specializing in SEO content creation. Your task is to create detailed and effective prompts for content generation that will rank well on search engines.";

    const userPrompt = `Please create a detailed prompt for generating ${type} content about "${topic}" with the following requirements:
    - Keywords: ${keywords}
    - Tone: ${tone}
    - Type: ${type}
    - Additional Details: ${additionalDetails}
    
    Your prompt should include:
    1. Clear instructions for content structure
    2. SEO optimization guidelines 
    3. Specific sections to include
    4. Word count recommendations based on the type of content (min 8000 for articles, min 4000 words for blog posts, min 1000 words for social media, product descriptions, and emails)
    5. Formatting suggestions
    6. Keep the original language of the topic
    
    Create a prompt that will help generate high-quality, engaging, and SEO-optimized content.`;

    const response = await axios.post(
      API_URL,
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://esmart-solutions-agency.com",
          "X-Title": "Esmart AI Content Generator",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "[DEEPSEEK_PROMPT] Error creating initial prompt:",
      error.message
    );

    // Fallback prompt if there's an error
    return `Create a ${type} about "${topic}" with the following requirements:
    - Keywords: ${keywords}
    - Tone: ${tone}
    - Type: ${type}
    - Include SEO optimization
    - Minimum 1000 words
    - Well-structured content with clear sections`;
  }
}

/**
 * Gemini analyzes and suggests trending keywords
 */
async function analyzeTrendKeywordsWithGemini(initialPrompt, topic, keywords) {
  try {
    console.log(
      `[GEMINI_KEYWORDS] Analyzing keyword trends for topic: "${topic}"`
    );

    // Kiểm tra nếu topic hoặc keywords không tồn tại
    if (!topic || topic.trim() === "") {
      console.warn(
        "[GEMINI_KEYWORDS] Empty topic provided, trying to use keywords instead"
      );
      if (keywords && keywords.trim() !== "") {
        const keywordParts = keywords.split(",");
        topic = keywordParts[0].trim();
        console.log(
          `[GEMINI_KEYWORDS] Using first keyword as topic: "${topic}"`
        );
      } else {
        topic = "General content";
        console.warn(
          "[GEMINI_KEYWORDS] Both topic and keywords are empty, using default topic"
        );
      }
    }

    if (!keywords || keywords.trim() === "") {
      console.warn(
        "[GEMINI_KEYWORDS] Empty keywords provided, using topic as keyword"
      );
      keywords = topic;
    }

    const keywordArray = keywords.split(",").map((k) => k.trim());
    const mainKeyword = keywordArray[0];

    // Extract topic keywords for better matching - thêm tiếng Việt (cơm tấm, gà rán, etc.)
    const stopWords = [
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
      "review",
    ];
    const topicKeywords = topic
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.includes(word));

    console.log(
      `[GEMINI_KEYWORDS] Topic keywords for matching: ${topicKeywords.join(
        ", "
      )}`
    );

    // Check MongoDB for related topic or keyword matches
    let existingTrend = null;

    // First try to find exact match with topic
    existingTrend = await TrendData.findOne({
      $or: [
        { keyword: { $regex: new RegExp(`^${topic}$`, "i") } },
        { keyword: { $regex: new RegExp(`\\b${topic}\\b`, "i") } },
        { topic: { $regex: new RegExp(`^${topic}$`, "i") } },
      ],
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Within 7 days
    }).sort({ createdAt: -1 });

    // If we found an existing trend, validate that it's related to our topic
    if (existingTrend) {
      // Strict validation function to ensure keywords are truly related to topic
      const isStrictlyRelatedToTopic = () => {
        // Direct topic match check
        if (
          existingTrend.topic &&
          (existingTrend.topic.toLowerCase() === topic.toLowerCase() ||
            topic.toLowerCase().includes(existingTrend.topic.toLowerCase()) ||
            existingTrend.topic.toLowerCase().includes(topic.toLowerCase()))
        ) {
          console.log(
            `[GEMINI_KEYWORDS] Direct topic match: "${existingTrend.topic}" - "${topic}"`
          );
          return true;
        }

        // Kiểm tra nếu topic hiện tại và topic đã lưu khác nhau hoàn toàn
        // Ví dụ: "Review Cơm tấm" vs "Mercedes S500"
        const savedTopicWords = (existingTrend.topic || "")
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 2);
        const currentTopicWords = topic
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 2);

        // Nếu không có từ nào trùng giữa 2 chủ đề, xem như không liên quan
        const hasCommonWord = savedTopicWords.some((word) =>
          currentTopicWords.some(
            (current) => current.includes(word) || word.includes(current)
          )
        );

        if (
          savedTopicWords.length > 0 &&
          currentTopicWords.length > 0 &&
          !hasCommonWord
        ) {
          console.log(
            `[GEMINI_KEYWORDS] Topics are completely different: "${existingTrend.topic}" vs "${topic}"`
          );
          return false;
        }

        // Check if keywords from MongoDB contain topic words or vice versa
        const hasTopicOverlap = topicKeywords.some(
          (word) =>
            existingTrend.keyword.toLowerCase().includes(word) ||
            existingTrend.relatedKeywords.some((kw) =>
              kw.toLowerCase().includes(word)
            )
        );

        // Check if topic includes keywords from MongoDB
        const topicIncludesKeywords =
          topic.toLowerCase().includes(existingTrend.keyword.toLowerCase()) ||
          existingTrend.relatedKeywords.some((kw) =>
            topic.toLowerCase().includes(kw.toLowerCase())
          );

        const result = hasTopicOverlap || topicIncludesKeywords;
        console.log(
          `[GEMINI_KEYWORDS] Topic overlap check: ${
            result ? "PASSED" : "FAILED"
          }`
        );

        return result;
      };

      if (isStrictlyRelatedToTopic()) {
        console.log(
          `[GEMINI_KEYWORDS] Found relevant trending keyword data in MongoDB: ${existingTrend.keyword}`
        );
        return {
          mainKeyword: existingTrend.keyword,
          relatedKeywords: existingTrend.relatedKeywords,
          trendScore: existingTrend.trend_score,
          recommendations: existingTrend.recommendations || [],
          competition: existingTrend.competition || "Medium",
          trend: existingTrend.trend || "Increasing",
        };
      } else {
        console.log(
          `[GEMINI_KEYWORDS] Found trend data but not relevant to topic "${topic}", will generate new trends`
        );
      }
    }

    // Generate new trending keywords with Gemini if no relevant data in MongoDB
    const systemPrompt =
      "You are an SEO expert with access to the latest search trends. Your job is to analyze topics and keywords to suggest trending related keywords that would help content rank better. You MUST ensure suggested keywords are DIRECTLY and STRONGLY related to the exact topic given. Never suggest keywords for a different topic, product, or business.";

    const userPrompt = `Analyze this EXACT topic and suggest trending keywords for it:
    
    TOPIC: ${topic}
    KEYWORDS: ${keywords}
    
    Please perform the following:
    
    1. First, understand EXACTLY what "${topic}" is about - identify the main subject and all related components
    2. Search for trending keywords that match BOTH the TOPIC and the user-provided KEYWORDS
    3. Find 5-7 trending keywords that are DIRECTLY related to "${topic}" (not any other topic)
    4. Evaluate competition level for these exact keywords (Low, Medium, High)
    5. Suggest how to optimize content for these keywords
    
    CRITICAL RULES:
    - Your keywords MUST be directly about "${topic}" and nothing else
    - If the topic is about food (like "Review Cơm tấm ở Sài gòn"), ALL keywords must be about that EXACT food, NOT about cars or unrelated products
    - If the topic is about a car model (like "Mercedes S500 2016"), ALL keywords must be about that EXACT car model, NOT about food or unrelated products
    - If the topic is about a place, ALL keywords must be about that EXACT place
    - DO NOT generate keywords about unrelated topics, businesses, or products
    - You MUST use "${topic}" as the mainKeyword in your response
    - If you find keywords like "Mercedes" for a food review topic, you are doing it WRONG. Double-check your understanding of the topic.
    
    Topic keywords for matching: ${topic
      .split(" ")
      .filter((word) => word.length > 3)
      .join(", ")}
    
    Return your analysis in JSON format with these fields:
    {
      "mainKeyword": "${topic}",
      "relatedKeywords": ["related keyword 1", "related keyword 2", ...],
      "trendScore": number from 0-100 indicating trend strength,
      "competition": "Low/Medium/High",
      "recommendations": ["recommendation 1", "recommendation 2", ...],
      "trend": "Increasing/Stable/Decreasing",
      "topicMatch": true
    }
    
    The "topicMatch" field should be set to true only if you are ABSOLUTELY CERTAIN that all keywords relate directly to the topic.
    
    ONLY return the JSON, nothing else.`;

    console.log(
      "[GEMINI_KEYWORDS] Topic keywords for matching:",
      topic
        .split(" ")
        .filter((word) => word.length > 3)
        .join(", ")
    );

    console.log(
      "[GEMINI_KEYWORDS] Sending prompt to Gemini:",
      userPrompt.substring(0, 100) + "..."
    );

    const response = await axios.post(
      GEMINI_API_URL,
      {
        model: "google/gemini-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://esmart-solutions-agency.com",
          "X-Title": "Esmart AI Content Generator",
        },
      }
    );

    let result = response.data.choices[0].message.content;
    console.log(
      "[GEMINI_KEYWORDS] Raw response from Gemini:",
      result.substring(0, 100) + "..."
    );

    // Ensure result is valid JSON
    try {
      // Remove any non-JSON characters (if any)
      result = result.replace(/```json\s*|\s*```/g, "").trim();

      // Parse JSON
      const trendData = JSON.parse(result);
      console.log(
        `[GEMINI_KEYWORDS] Received trending keyword analysis from Gemini: ${trendData.relatedKeywords.join(
          ", "
        )}`
      );

      // Improved validation of topic-keyword relationship
      const validateTopicKeywordRelation = () => {
        // Extract important words from topic and original keywords (words with 2+ characters)
        const topicWords = topic
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 2 && !stopWords.includes(word));

        // Extract important words from keywords
        const keywordWords = keywords
          .toLowerCase()
          .split(/\s+|,/)
          .filter((word) => word.length > 2 && !stopWords.includes(word));

        // Combine topic words and keyword words for matching
        const matchWords = [...new Set([...topicWords, ...keywordWords])];

        if (matchWords.length === 0) {
          console.warn("[GEMINI_KEYWORDS] No valid words to match against!");
          return false; // No valid words to match
        }

        console.log(`[GEMINI_KEYWORDS] Match words: ${matchWords.join(", ")}`);

        // Check if keywords match with topic or original keywords
        const relatedCount = trendData.relatedKeywords.filter((kw) => {
          const kwLower = kw.toLowerCase();
          // Check if keyword contains ANY of the important words from topic or user keywords
          const matches =
            matchWords.some((word) => kwLower.includes(word)) ||
            // Check for exact topic match
            kwLower.includes(topic.toLowerCase());

          if (!matches) {
            console.log(
              `[GEMINI_KEYWORDS] Keyword "${kw}" does NOT match any topic words`
            );
          }

          return matches;
        }).length;

        // Require at least 70% of keywords to be related to topic or original keywords
        const threshold = 0.7;
        const matchRatio = relatedCount / trendData.relatedKeywords.length;

        console.log(
          `[GEMINI_KEYWORDS] Topic match validation: ${relatedCount}/${
            trendData.relatedKeywords.length
          } keywords match (${(matchRatio * 100).toFixed(2)}%)`
        );

        return matchRatio >= threshold;
      };

      if (!validateTopicKeywordRelation() || !trendData.topicMatch) {
        console.warn(
          `[GEMINI_KEYWORDS] Generated keywords might not be related to topic, will forcibly recreate topic-based keywords`
        );

        // Create new keywords directly from topic and user keywords
        const seoModule = require("./seoService");
        const topicBasedKeywords = await seoModule.basicAnalyzeTopicAndKeywords(
          topic,
          keywords
        );

        // Combine topic words with user keywords to ensure relevance
        const userKeywordsList = keywords.split(",").map((k) => k.trim());

        // Tạo danh sách từ khóa đảm bảo liên quan đến chủ đề
        const oldRelatedKeywords = trendData.relatedKeywords;
        trendData.relatedKeywords = [
          topic, // Luôn có chủ đề là từ khóa đầu tiên
          ...userKeywordsList.slice(0, 3), // Thêm một số từ khóa người dùng
          ...topicBasedKeywords.keywords.slice(0, 4), // Thêm từ khóa dựa trên chủ đề
        ];

        console.log(`[GEMINI_KEYWORDS] Replaced keywords:
          OLD: ${oldRelatedKeywords.join(", ")}
          NEW: ${trendData.relatedKeywords.join(", ")}`);

        trendData.topicMatch = true; // We've forced it to match
        trendData.forcedMatch = true; // Flag that we had to force it
      }

      // Force set the mainKeyword to be the actual topic
      trendData.mainKeyword = topic;

      // Save the trend data to MongoDB for future use
      const savedData = {
        ...trendData,
        topic: topic, // Add topic explicitly for future matching
      };
      await saveTrendKeywordsToMongoDB(topic, savedData);

      return trendData;
    } catch (e) {
      console.error(
        "[GEMINI_KEYWORDS] Error parsing JSON from Gemini:",
        e.message
      );
      // Call the basic analysis function when JSON parsing fails
      const seoModule = require("./seoService");
      const basicAnalysis = await seoModule.basicAnalyzeTopicAndKeywords(
        topic,
        keywords
      );

      const fallbackData = {
        mainKeyword: topic,
        relatedKeywords: basicAnalysis.keywords,
        trendScore: 50,
        competition: "Medium",
        recommendations: basicAnalysis.suggestions,
        trend: "Stable",
        topic: topic,
        topicMatch: true,
        forcedMatch: true,
      };

      // Save even the fallback data for future use
      await saveTrendKeywordsToMongoDB(topic, fallbackData);

      return fallbackData;
    }
  } catch (error) {
    console.error(
      "[GEMINI_KEYWORDS] Error analyzing keyword trends:",
      error.message
    );

    // Call the basic analysis function on API error
    const seoModule = require("./seoService");
    const basicAnalysis = await seoModule.basicAnalyzeTopicAndKeywords(
      topic,
      keywords
    );

    return {
      mainKeyword: topic,
      relatedKeywords: basicAnalysis.keywords,
      trendScore: 50,
      competition: "Medium",
      recommendations: basicAnalysis.suggestions,
      trend: "Stable",
      topic: topic,
      topicMatch: true,
      forcedMatch: true,
    };
  }
}

/**
 * Save trending keywords to MongoDB
 */
async function saveTrendKeywordsToMongoDB(topic, trendData) {
  try {
    const {
      mainKeyword,
      relatedKeywords,
      trendScore,
      competition,
      recommendations,
      trend,
    } = trendData;

    // Create object to save to MongoDB
    const trendDataToSave = new TrendData({
      keyword: mainKeyword,
      relatedKeywords: relatedKeywords,
      trend_score: trendScore,
      competition: competition,
      recommendations: recommendations,
      analysisText: JSON.stringify(trendData),
      source: "gemini_pro",
      category: "general",
      trend: trend,
    });

    // Save to MongoDB
    await trendDataToSave.save();
    console.log(
      `[MONGODB] Saved trending keyword data to MongoDB for keyword "${mainKeyword}"`
    );

    return true;
  } catch (error) {
    console.error(
      "[MONGODB] Error saving trending keyword data to MongoDB:",
      error.message
    );
    return false;
  }
}

/**
 * DeepSeek rewrites prompt based on trending keywords from Gemini
 */
async function rewritePromptWithTrendKeywords(
  initialPrompt,
  trendKeywords,
  tone,
  type
) {
  try {
    console.log(`[DEEPSEEK_REWRITE] Rewriting prompt with trending keywords`);

    // Prepare trending keywords for prompt
    const { mainKeyword, relatedKeywords, recommendations } = trendKeywords;
    const trendingKeywordsText = relatedKeywords.join(", ");
    const recommendationsText = recommendations.join("\n- ");

    const systemPrompt =
      "You are an AI prompt engineer specializing in SEO content creation. Your job is to enhance content prompts based on trending keyword data to create content that will rank well on search engines.";

    const userPrompt = `I have an initial content prompt and trending keyword data. Please enhance the prompt to incorporate the trending keywords and SEO recommendations.

    INITIAL PROMPT:
    ${initialPrompt}
    
    TRENDING KEYWORD DATA:
    - Main keyword: ${mainKeyword}
    - Related trending keywords: ${trendingKeywordsText}
    - SEO recommendations:
    - ${recommendationsText}
    
    Tone: ${tone}
    Content type: ${type}
    
    Please rewrite the prompt to:
    1. Incorporate all the trending keywords naturally
    2. Follow the SEO recommendations
    3. Maintain the original tone and content type
    4. Ensure the content will be well-structured and engaging
    5. Add specific instructions for keyword placement (title, headings, first paragraph, etc.)
    
    Your improved prompt should be detailed, clear, and designed to generate SEO-optimized content.`;

    const response = await axios.post(
      API_URL,
      {
        model: "deepseek/deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://esmart-solutions-agency.com",
          "X-Title": "Esmart AI Content Generator",
        },
      }
    );

    const optimizedPrompt = response.data.choices[0].message.content;
    console.log(`[DEEPSEEK_REWRITE] Prompt rewritten successfully`);

    return optimizedPrompt;
  } catch (error) {
    console.error("[DEEPSEEK_REWRITE] Error rewriting prompt:", error.message);

    // If there's an error, directly add trending keywords to initial prompt
    const { relatedKeywords } = trendKeywords;
    const trendingKeywordsText = relatedKeywords.join(", ");

    return `${initialPrompt}
    
    ADDITIONAL INSTRUCTIONS:
    - Include these trending keywords: ${trendingKeywordsText}
    - Optimize content for SEO
    - Structure content with clear sections`;
  }
}

/**
 * Create content based on improved prompt
 */
async function generateContentWithOptimizedPrompt(optimizedPrompt, type) {
  try {
    console.log(`[DEEPSEEK_GENERATE] Creating content from improved prompt`);

    // Không cần cắt ngắn prompt nữa, sử dụng trực tiếp prompt đầy đủ
    let finalPrompt = optimizedPrompt;

    // Log thông tin về độ dài prompt để theo dõi
    console.log(
      `[DEEPSEEK_GENERATE] Using full prompt with length: ${optimizedPrompt.length} characters`
    );

    // Xác định số lượng tokens tối đa dựa trên loại nội dung
    let maxTokens = calculateMaxTokens(type);
    console.log(
      `[DEEPSEEK_GENERATE] Using max_tokens=${maxTokens} for content type: ${type}`
    );

    const systemPrompt =
      "You are a professional content creator who specializes in creating high-quality, engaging content. Your writing adapts perfectly to the requested tone and content type while maintaining a natural, human-like flow. You create content that feels authentic rather than AI-generated. Follow the instructions carefully and create content that truly resonates with the target audience, maintaining their language and cultural context throughout. Never use markdown formatting like #, ##, *, -, >, or ``` in your output - use only standard text formatting with paragraphs and spacing.";

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalPrompt },
          ],
          temperature: 0.7,
          max_tokens: maxTokens,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://esmart-solutions-agency.com",
            "X-Title": "Esmart AI Content Generator",
          },
          timeout: Math.min(maxTokens * 50, 300000), // Timeout based on max_tokens, max 5 minutes
        }
      );

      let content = response.data.choices[0].message.content;

      // Process the content
      content = await processContent(content, type);
      console.log(
        `[DEEPSEEK_GENERATE] Content created successfully, length: ${content.length} characters`
      );

      return content;
    } catch (apiError) {
      console.error(
        "[DEEPSEEK_GENERATE] API error when creating content:",
        apiError.message
      );
      console.error("[DEEPSEEK_GENERATE] Trying alternate model...");

      // Try with alternate model (Claude)
      // Adjust max tokens for fallback model if needed
      const backupMaxTokens = Math.min(maxTokens, 4000);

      const backupResponse = await axios.post(
        API_URL,
        {
          model: "anthropic/claude-3-haiku",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: finalPrompt },
          ],
          temperature: 0.7,
          max_tokens: backupMaxTokens,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://esmart-solutions-agency.com",
            "X-Title": "Esmart AI Content Generator",
          },
          timeout: Math.min(backupMaxTokens * 50, 300000), // Timeout based on max_tokens, max 5 minutes
        }
      );

      let backupContent = backupResponse.data.choices[0].message.content;
      backupContent = await processContent(backupContent, type);
      console.log(
        `[DEEPSEEK_GENERATE] Content created using alternate model, length: ${backupContent.length} characters`
      );

      return backupContent;
    }
  } catch (error) {
    console.error("[DEEPSEEK_GENERATE] Error creating content:", error.message);

    // Create sample content based on topic and keywords from prompt
    console.log("[DEEPSEEK_GENERATE] Using sample content due to error...");

    // Extract information from prompt
    let topic = "Unknown Topic";
    let keywordsFromPrompt = [];

    // Try extracting topic from prompt
    const topicMatch = optimizedPrompt.match(
      /(?:about|on|về)\s+["']?([^"'.,;]+)["']?/i
    );
    if (topicMatch && topicMatch[1]) {
      topic = topicMatch[1].trim();
    }

    // Try extracting keywords from prompt
    const keywordsMatch = optimizedPrompt.match(/keywords?:?\s*([^.,;]+)/i);
    if (keywordsMatch && keywordsMatch[1]) {
      keywordsFromPrompt = keywordsMatch[1]
        .split(/,|\sand\s/)
        .map((k) => k.trim())
        .filter((k) => k.length > 0);
    }

    // Create sample content with extracted information
    const keywords =
      keywordsFromPrompt.length > 0
        ? keywordsFromPrompt.join(", ")
        : "main keyword";

    if (type === "blog") {
      return generateSampleBlogContent(topic, keywords);
    } else {
      return generateSampleContent(topic, keywords, type);
    }
  }
}

/**
 * Create sample blog content when there's an error
 */
function generateSampleBlogContent(topic, keywords) {
  return `
INTRODUCTION TO ${topic.toUpperCase()}

${topic} is one of the topics that many people are interested in these days. In this article, we'll explore deeper into ${topic} and related aspects of ${keywords}.

UNDERSTANDING ${topic.toUpperCase()}

${topic} has become an integral part of modern life. When we talk about ${keywords}, the significance becomes even more apparent. These are the core elements that help us understand ${topic} better.

In recent years, many studies have highlighted the importance of ${topic} to society and personal development. Experts in this field agree that a thorough understanding of ${topic} and ${keywords} can bring significant benefits.

MAIN BENEFITS

1. Expanding Understanding: When you learn about ${topic}, you'll gain a more comprehensive view of the world and new trends.

2. Developing Skills: ${keywords} can help you develop various important skills, from analytical thinking to problem-solving.

3. Expanding Opportunities: Knowledge about ${topic} opens up many opportunities in learning and work, especially in today's technology-driven world.

4. Improving Quality of Life: Applying knowledge about ${keywords} to daily life can help you make better decisions and improve your quality of life.

NEW TRENDS IN ${topic.toUpperCase()}

In recent years, several new trends have emerged in the field of ${topic}. These trends are mainly related to ${keywords} and are creating a big wave of change.

The latest research has shown that ${topic} is evolving towards integration with technology and sustainability. This is in line with the increasing demand for high-quality products and services that are environmentally friendly.

HOW TO APPLY ${keywords.toUpperCase()} IN PRACTICE

To make the most of your knowledge about ${topic}, you can apply ${keywords} in practice in the following ways:

1. Continuous Learning and Research: Keep up-to-date with the latest information about ${topic} through books, news, online courses, and reputable sources.

2. Regular Practice: Apply knowledge about ${keywords} to your work and daily life to consolidate understanding.

3. Connecting with the Community: Join groups, forums, and events related to ${topic} to share experiences and expand your network.

4. Evaluation and Adjustment: Regularly evaluate results and adjust your approach for the best results.

CONCLUSION

${topic} and ${keywords} are important topics, bringing significant value to individuals and society. Gaining a comprehensive understanding of these topics not only opens up opportunities but also helps you adapt better to future changes.

We hope this article has provided useful information and inspired you to further explore ${topic}. Feel free to share your thoughts and experiences in the comments below!
`;
}

/**
 * Create sample content when there's an error
 */
function generateSampleContent(topic, keywords, type) {
  if (type === "social") {
    return `
Have you ever researched ${topic}? It's a very interesting topic we want to share with you today!

${topic} is closely related to ${keywords}, many important factors that many people often overlook.

Through research and practical experience, we've discovered many surprising things about ${topic}. These can help you understand and apply more effectively in your life.

Do you have any experience with ${topic}? Please share in the comments below!

#${topic.replace(/\s+/g, "")} #${keywords.replace(/,\s*/g, " #")}
`;
  } else {
    return `
${topic.toUpperCase()} - UNIFIED SOLUTION

${topic} is the top solution for those looking for a new and effective approach. Focusing on ${keywords}, we provide high-quality services that meet all customer needs.

WHY CHOOSE US?

- Top Expert in ${topic}
- Concentrate on ${keywords} - the key factor for success
- Personalized Approach
- Measured and Sustainable Results
- 24/7 Support from Professional Team

MAIN SERVICES

1. Deep Consulting on ${topic}
2. Customized Solution for Each Customer
3. Training and Guidance on ${keywords}
4. Implementation and Follow-up
5. Analysis and Reporting

CONTACT NOW

Don't miss the opportunity to enhance your understanding and skills in ${topic}. Contact us now for a free consultation!

Email: info@example.com
Hotline: 0987 654 321
Website: www.example.com/${topic.toLowerCase().replace(/\s+/g, "-")}
`;
  }
}

/**
 * Process content to ensure it meets all requirements
 * - Remove markdown formatting
 * - Ensure proper length based on content type
 */
async function processContent(content, type) {
  try {
    console.log(`[PROCESSOR] Processing content for type: ${type}`);

    // Loại bỏ toàn bộ định dạng markdown
    content = content
      .replace(/```(?:json|js|html|markdown|md)?[\s\S]*?```/g, "") // Xóa code blocks
      .replace(/`([^`]+)`/g, "$1") // Xóa inline code
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Xóa bold
      .replace(/\*([^*]+)\*/g, "$1") // Xóa italic
      .replace(/\_\_([^_]+)\_\_/g, "$1") // Xóa bold underscore
      .replace(/\_([^_]+)\_/g, "$1") // Xóa italic underscore
      .replace(/\#\#+ (.+)$/gm, "$1") // Xóa headings
      .replace(/\# (.+)$/gm, "$1") // Xóa heading H1
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1") // Xóa links
      .replace(/^\s*[-*+](?=\s)/gm, "") // Xóa bullet points
      .replace(/^\s*\d+\.(?=\s)/gm, "") // Xóa numerical lists
      .replace(/^\s*>/gm, "") // Xóa blockquotes
      .replace(/\n\s*\n\s*\n+/g, "\n\n"); // Xóa nhiều dòng trống liên tiếp

    // Kiểm tra nếu nội dung trống sau khi xử lý
    if (!content || content.trim().length === 0) {
      console.error("[PROCESSOR] Content is empty after processing");
      return generateFallbackContent(
        "Unknown Topic",
        "keyword",
        "professional",
        type
      );
    }

    // Lấy giá trị độ dài tối thiểu theo loại nội dung
    let minLength = 0;
    let currentLength = content.split(/\s+/).length;

    switch (type.toLowerCase()) {
      case "article":
        minLength = 8000;
        break;
      case "blog":
        minLength = 4000;
        break;
      // case "social":
      //   minLength = 2000;
      //   break;
      case "email":
      case "product":
      case "social":
        minLength = 1000;
        break;
      default:
        minLength = 2000; // Mặc định cho các loại nội dung khác
    }

    console.log(
      `[PROCESSOR] Content type: ${type}, current length: ${currentLength} words, minimum required: ${minLength} words`
    );

    // Kiểm tra nếu nội dung không đủ dài
    if (currentLength < minLength) {
      console.log(
        `[PROCESSOR] Content does not meet minimum length requirements. Requesting extended content...`
      );
      const extendedContent = await extendContent(
        content,
        type,
        minLength,
        currentLength
      );
      return extendedContent;
    }

    return content.trim();
  } catch (error) {
    console.error("[PROCESSOR] Error processing content:", error.message);
    return content || "Error processing content";
  }
}

/**
 * Extend content that doesn't meet minimum length requirements
 * Makes an API call to DeepSeek to expand the content
 */
async function extendContent(content, type, minLength, currentLength) {
  try {
    console.log(
      `[PROCESSOR] Extending content for type ${type} to reach minimum ${minLength} words (currently ${currentLength} words)`
    );

    const additionalWordsNeeded = minLength - currentLength;

    // Chuẩn bị prompt để yêu cầu API mở rộng nội dung
    const systemPrompt =
      "You are a professional content writer who excels at expanding existing content while maintaining the original topic, tone, and style. You add relevant details, examples, and explanations to make the content more comprehensive and valuable. Your expanded content feels like a natural extension of the original text, not like additional content tacked on. You never use markdown formatting (*, #, ##, -, etc.) in your output, only normal text with paragraph breaks.";

    // Xác định hướng mở rộng dựa trên loại nội dung
    let expansionInstructions;
    switch (type.toLowerCase()) {
      case "article":
        expansionInstructions =
          "Expand this article with detailed explanations, research data, expert opinions, case studies, and practical applications. Add relevant subheadings for new sections.";
        break;
      case "blog":
        expansionInstructions =
          "Expand this blog post with more detailed points, real-life examples, actionable tips, and engaging stories that illustrate the main ideas. Add personal perspectives and questions to engage readers.";
        break;
      case "social":
        expansionInstructions =
          "Expand this social media content with more engaging points, relevant hashtags, calls to action, and interactive elements to encourage engagement. Make it conversational and shareable.";
        break;
      case "email":
        expansionInstructions =
          "Expand this email with more personalized content, clear value propositions, specific details about offers or information, and stronger calls to action. Maintain a conversational, direct tone.";
        break;
      case "product":
        expansionInstructions =
          "Expand this product description with more details about features, benefits, specifications, use cases, and competitive advantages. Add customer-focused language about value and problem-solving.";
        break;
      default:
        expansionInstructions =
          "Expand this content with more details, examples, and explanations while maintaining the original style and purpose.";
    }

    const userPrompt = `Please expand the following ${type} content. It currently has about ${currentLength} words but needs to be expanded to at least ${minLength} words (add approximately ${additionalWordsNeeded} more words).

${expansionInstructions}

Make sure that:
1. The expanded content flows naturally with the original text
2. You maintain the same style, tone, and language as the original
3. All added information is relevant to the topic and valuable to readers
4. You DO NOT use any markdown formatting (*, #, ##, -, etc.), only normal text with paragraph breaks
5. You preserve the original meaning and intent while adding depth
6. You RETURN THE COMPLETE EXPANDED TEXT, not just the additions

ORIGINAL CONTENT:
${content}

COMPLETE EXPANDED CONTENT (at least ${minLength} words):`;

    try {
      console.log(`[PROCESSOR] Calling DeepSeek API to expand content`);

      const response = await axios.post(
        API_URL,
        {
          model: "deepseek/deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: Math.max(3500, additionalWordsNeeded * 5), // Ước tính 5 tokens cho mỗi từ
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://esmart-solutions-agency.com",
            "X-Title": "Esmart AI Content Generator - Content Expansion",
          },
          timeout: 90000, // 90 seconds - extended for longer content generation
        }
      );

      let expandedContent = response.data.choices[0].message.content;

      // Xử lý để loại bỏ định dạng markdown nếu có
      expandedContent = expandedContent
        .replace(/```(?:json|js|html|markdown|md)?[\s\S]*?```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/\_\_([^_]+)\_\_/g, "$1")
        .replace(/\_([^_]+)\_/g, "$1")
        .replace(/\#\#+ (.+)$/gm, "$1")
        .replace(/\# (.+)$/gm, "$1")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
        .replace(/^\s*[-*+](?=\s)/gm, "")
        .replace(/^\s*\d+\.(?=\s)/gm, "")
        .replace(/^\s*>/gm, "")
        .replace(/\n\s*\n\s*\n+/g, "\n\n");

      // Kiểm tra độ dài mới
      const newLength = expandedContent.split(/\s+/).length;

      console.log(
        `[PROCESSOR] Content extension successful: ${currentLength} -> ${newLength} words`
      );

      if (newLength < minLength) {
        console.log(
          `[PROCESSOR] Warning: Extended content is still below the minimum length (${newLength}/${minLength} words). Using anyway.`
        );
      }

      return expandedContent.trim();
    } catch (apiError) {
      console.error(`[PROCESSOR] API error when extending content:`, apiError);

      // Thử với model dự phòng
      try {
        console.log(
          `[PROCESSOR] Trying alternate model (Claude) for content extension`
        );

        const backupResponse = await axios.post(
          API_URL,
          {
            model: "anthropic/claude-3-haiku",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: Math.max(4000, additionalWordsNeeded * 5),
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "https://esmart-solutions-agency.com",
              "X-Title": "Esmart AI Content Generator - Content Expansion",
            },
            timeout: 90000,
          }
        );

        let backupExpandedContent =
          backupResponse.data.choices[0].message.content;

        // Xử lý để loại bỏ định dạng markdown
        backupExpandedContent = backupExpandedContent
          .replace(/```(?:json|js|html|markdown|md)?[\s\S]*?```/g, "")
          .replace(/`([^`]+)`/g, "$1")
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/\_\_([^_]+)\_\_/g, "$1")
          .replace(/\_([^_]+)\_/g, "$1")
          .replace(/\#\#+ (.+)$/gm, "$1")
          .replace(/\# (.+)$/gm, "$1")
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
          .replace(/^\s*[-*+](?=\s)/gm, "")
          .replace(/^\s*\d+\.(?=\s)/gm, "")
          .replace(/^\s*>/gm, "")
          .replace(/\n\s*\n\s*\n+/g, "\n\n");

        const backupNewLength = backupExpandedContent.split(/\s+/).length;

        console.log(
          `[PROCESSOR] Content extension with backup model: ${currentLength} -> ${backupNewLength} words`
        );

        return backupExpandedContent.trim();
      } catch (backupError) {
        console.error(`[PROCESSOR] Backup model error:`, backupError);
        console.log(`[PROCESSOR] Using original content due to API errors`);
        return content.trim();
      }
    }
  } catch (error) {
    console.error(`[PROCESSOR] Error in content extension:`, error);
    return content.trim();
  }
}

/**
 * Generate fallback content when all else fails
 */
function generateFallbackContent(topic, keywords, tone, type) {
  console.log(`[FALLBACK] Generating fallback content for ${topic} (${type})`);

  if (type === "blog") {
    return `INTRODUCTION TO ${topic.toUpperCase()}

${topic} is one of the topics that many people are interested in these days. In this article, we'll explore deeper into ${topic} and related aspects of ${keywords}.

UNDERSTANDING ${topic.toUpperCase()}

${topic} has become an integral part of modern life. When we talk about ${keywords}, the significance becomes even more apparent. These are the core elements that help us understand ${topic} better.

In recent years, many studies have highlighted the importance of ${topic} to society and personal development. Experts in this field agree that a thorough understanding of ${topic} and ${keywords} can bring significant benefits.

MAIN BENEFITS

1. Expanding Understanding: When you learn about ${topic}, you'll gain a more comprehensive view of the world and new trends.

2. Developing Skills: ${keywords} can help you develop various important skills, from analytical thinking to problem-solving.

3. Expanding Opportunities: Knowledge about ${topic} opens up many opportunities in learning and work, especially in today's technology-driven world.

4. Improving Quality of Life: Applying knowledge about ${keywords} to daily life can help you make better decisions and improve your quality of life.

NEW TRENDS IN ${topic.toUpperCase()}

In recent years, several new trends have emerged in the field of ${topic}. These trends are mainly related to ${keywords} and are creating a big wave of change.

The latest research has shown that ${topic} is evolving towards integration with technology and sustainability. This is in line with the increasing demand for high-quality products and services that are environmentally friendly.

HOW TO APPLY ${keywords.toUpperCase()} IN PRACTICE

To make the most of your knowledge about ${topic}, you can apply ${keywords} in practice in the following ways:

1. Continuous Learning and Research: Keep up-to-date with the latest information about ${topic} through books, news, online courses, and reputable sources.

2. Regular Practice: Apply knowledge about ${keywords} to your work and daily life to consolidate understanding.

3. Connecting with the Community: Join groups, forums, and events related to ${topic} to share experiences and expand your network.

4. Evaluation and Adjustment: Regularly evaluate results and adjust your approach for the best results.

CONCLUSION

${topic} and ${keywords} are important topics, bringing significant value to individuals and society. Gaining a comprehensive understanding of these topics not only opens up opportunities but also helps you adapt better to future changes.

We hope this article has provided useful information and inspired you to further explore ${topic}. Feel free to share your thoughts and experiences in the comments below!`;
  } else if (type === "social") {
    return `Have you ever researched ${topic}? It's a very interesting topic we want to share with you today!

${topic} is closely related to ${keywords}, many important factors that many people often overlook.

Through research and practical experience, we've discovered many surprising things about ${topic}. These can help you understand and apply more effectively in your life.

Do you have any experience with ${topic}? Please share in the comments below!

#${topic.replace(/\s+/g, "")} #${keywords.replace(/,\s*/g, " #")}`;
  } else {
    return `${topic.toUpperCase()} - UNIFIED SOLUTION

${topic} is the top solution for those looking for a new and effective approach. Focusing on ${keywords}, we provide high-quality services that meet all customer needs.

WHY CHOOSE US?

- Top Expert in ${topic}
- Concentrate on ${keywords} - the key factor for success
- Personalized Approach
- Measured and Sustainable Results
- 24/7 Support from Professional Team

MAIN SERVICES

1. Deep Consulting on ${topic}
2. Customized Solution for Each Customer
3. Training and Guidance on ${keywords}
4. Implementation and Follow-up
5. Analysis and Reporting

CONTACT NOW

Don't miss the opportunity to enhance your understanding and skills in ${topic}. Contact us now for a free consultation!

Email: info@example.com
Hotline: 0987 654 321
Website: www.example.com/${topic.toLowerCase().replace(/\s+/g, "-")}`;
  }
}

/**
 * Calculate max tokens based on content type
 * Used to determine the appropriate token limit for API calls
 */
function calculateMaxTokens(type) {
  switch (type.toLowerCase()) {
    case "article":
      return 10000;
    case "blog":
      return 8000;
    // case "social":
    //   return 4000;
    case "social":
    case "email":
    case "product":
      return 3500;
    default:
      return 5000;
  }
}

module.exports = {
  generateOptimizedContent,
  createInitialPrompt,
  analyzeTrendKeywordsWithGemini,
  rewritePromptWithTrendKeywords,
  generateContentWithOptimizedPrompt,
};

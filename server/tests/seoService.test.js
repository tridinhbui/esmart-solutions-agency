const { expect } = require("chai");
const { SEO_CHECKLIST } = require("../services/seoService");

// Mock content cho test
const mockContent = {
  good: `
    TIÊU ĐỀ VỀ MARKETING ONLINE VÀ SEO

    Marketing Online là lĩnh vực quan trọng trong thời đại số hóa hiện nay. Việc áp dụng SEO (Search Engine Optimization) là chiến lược cần thiết để tối ưu hóa website trên các công cụ tìm kiếm. 
    
    CHIẾN LƯỢC SEO HIỆU QUẢ
    
    Khi nói về SEO, chúng ta cần phải hiểu rằng đây là quá trình lâu dài và cần kiên nhẫn. Các yếu tố quan trọng bao gồm nghiên cứu từ khóa, tối ưu hóa nội dung, xây dựng liên kết và trải nghiệm người dùng.
    
    Nghiên cứu từ khóa là bước đầu tiên trong chiến lược SEO. Bạn cần xác định đúng từ khóa mà khách hàng mục tiêu đang tìm kiếm. Marketing Online hiệu quả phụ thuộc vào việc lựa chọn từ khóa phù hợp với nhu cầu của người dùng.
    
    Tối ưu hóa nội dung là yếu tố then chốt. Nội dung chất lượng cao không chỉ có từ khóa SEO mà còn phải mang giá trị thực sự cho người đọc. Bài viết tốt sẽ giữ người đọc ở lại trang lâu hơn, giảm tỷ lệ thoát và tăng khả năng chuyển đổi.
    
    Xây dựng liên kết chất lượng từ các trang web uy tín sẽ giúp tăng điểm đánh giá của Google. Marketing Online hiện đại không thể thiếu chiến lược xây dựng backlink hiệu quả và bền vững.
    
    Trải nghiệm người dùng là yếu tố được Google đánh giá cao. Website có tốc độ tải nhanh, giao diện thân thiện với người dùng và tương thích với thiết bị di động sẽ được xếp hạng cao hơn.
    
    KẾT QUẢ ĐO LƯỜNG
    
    Marketing Online và SEO đều cần được đo lường kết quả thường xuyên. Các chỉ số quan trọng bao gồm thứ hạng từ khóa, lưu lượng truy cập hữu cơ, tỷ lệ chuyển đổi và thời gian người dùng dừng lại trên trang.
    
    Việc theo dõi và phân tích dữ liệu sẽ giúp bạn điều chỉnh chiến lược SEO kịp thời. Marketing Online hiệu quả luôn đi kèm với việc phân tích dữ liệu chính xác và đưa ra quyết định dựa trên số liệu thực tế.
    
    KẾT LUẬN
    
    SEO và Marketing Online là hai yếu tố không thể tách rời trong chiến lược kinh doanh số. Việc đầu tư đúng cách vào SEO sẽ mang lại kết quả bền vững trong dài hạn. Hãy nhớ rằng SEO là một hành trình, không phải điểm đến. Marketing Online hiệu quả đòi hỏi sự kiên nhẫn, nhất quán và luôn cập nhật với xu hướng mới.
  `,
  bad: `
    Blog về marketing
    
    Marketing là một lĩnh vực quan trọng. Có nhiều loại marketing khác nhau. Digital marketing đang phát triển nhanh chóng.
    
    Có nhiều kênh digital marketing như social media, email, SEO... Mỗi kênh có ưu và nhược điểm riêng.
    
    Social media marketing rất phổ biến hiện nay. Facebook, Instagram, TikTok là các nền tảng được sử dụng nhiều.
    
    Email marketing vẫn hiệu quả. Nhiều doanh nghiệp vẫn sử dụng email để tiếp cận khách hàng.
    
    SEO giúp website được tìm thấy trên Google. SEO là quá trình dài hạn và cần kiên nhẫn.
    
    Kết luận: Marketing rất quan trọng đối với doanh nghiệp. Hãy chọn kênh marketing phù hợp với doanh nghiệp của bạn.
  `,
};

// Function mô phỏng việc chấm điểm SEO
function calculateSEOScore(content, keywords, scoreComponents) {
  // Chuyển keywords thành mảng
  const keywordArray = keywords.split(",").map((k) => k.trim().toLowerCase());
  const mainKeyword = keywordArray[0];
  const contentLower = content.toLowerCase();

  // Điểm số mỗi thành phần
  const scores = {
    keywordOptimization: 0,
    contentQuality: 0,
    readability: 0,
    metaTags: 0,
    userExperience: 0,
  };

  // 1. Chấm điểm keyword optimization
  const keywordChecks = {
    inTitle: contentLower
      .split("\n")
      .slice(0, 3)
      .some((line) => keywordArray.some((kw) => line.includes(kw))),
    inFirstParagraph: contentLower
      .split("\n")
      .slice(0, 5)
      .some((line) => keywordArray.some((kw) => line.includes(kw))),
    inHeadings: contentLower
      .split("\n")
      .filter((line) => line.trim().toUpperCase() === line.trim())
      .some((heading) =>
        keywordArray.some((kw) => heading.toLowerCase().includes(kw))
      ),
    keywordDensity: calculateKeywordDensity(contentLower, mainKeyword),
    usesLSI:
      keywordArray.length > 1 &&
      keywordArray.slice(1).some((kw) => contentLower.includes(kw)),
  };

  // Tính điểm keyword optimization
  scores.keywordOptimization =
    Object.values(keywordChecks).filter(Boolean).length * 20;

  // 2. Chấm điểm content quality
  const wordCount = content.split(/\s+/).length;
  const paragraphs = content.split("\n").filter((p) => p.trim().length > 0);
  const avgSentencesPerParagraph =
    paragraphs.reduce((total, p) => {
      const sentences = p.split(/[.!?]+/).length;
      return total + sentences;
    }, 0) / Math.max(paragraphs.length, 1);

  const headings = content
    .split("\n")
    .filter((line) => line.trim().toUpperCase() === line.trim()).length;

  const contentChecks = {
    goodLength: wordCount >= 500,
    shortParagraphs: avgSentencesPerParagraph <= 4,
    usesHeadings: headings >= 2,
    noObviousErrors: !content.includes("lorem ipsum"), // Simplistic check
    isStructured: paragraphs.length >= 5,
  };

  // Tính điểm content quality
  scores.contentQuality =
    Object.values(contentChecks).filter(Boolean).length * 20;

  // 3. Chấm điểm readability
  const sentences = content.split(/[.!?]+/);
  const avgWordsPerSentence = wordCount / Math.max(sentences.length, 1);

  const readabilityChecks = {
    shortSentences: avgWordsPerSentence <= 20,
    hasGoodStructure: paragraphs.length >= 5,
    usesBulletPoints:
      content.includes("•") || content.includes("-") || content.includes("*"),
    notTooComplex: calculateComplexityScore(content) <= 70,
    adequateLineSpacing: content.split("\n\n").length >= 3,
  };

  // Tính điểm readability
  scores.readability =
    Object.values(readabilityChecks).filter(Boolean).length * 20;

  // 4. Mô phỏng meta tags (trong thực tế cần kiểm tra từ HTML)
  scores.metaTags = 50; // Giả định điểm trung bình cho các test

  // 5. Mô phỏng user experience
  scores.userExperience = 60; // Giả định điểm trung bình cho các test

  // Tính điểm tổng hợp với trọng số
  const totalScore = Object.keys(scores).reduce((total, key) => {
    return total + (scores[key] * SEO_CHECKLIST[key].weight) / 100;
  }, 0);

  return {
    totalScore: Math.round(totalScore),
    componentScores: scores,
    details: {
      wordCount,
      keywordDensity: calculateKeywordDensity(contentLower, mainKeyword),
      avgWordsPerSentence,
      headingsCount: headings,
    },
  };
}

// Helper functions
function calculateKeywordDensity(content, keyword) {
  const words = content.split(/\s+/).length;
  const keywordCount = (
    content.match(new RegExp(`\\b${keyword}\\b`, "gi")) || []
  ).length;
  return (keywordCount / words) * 100;
}

function calculateComplexityScore(content) {
  // Mô phỏng Flesch Reading Ease score đơn giản
  const sentences = content.split(/[.!?]+/).length;
  const words = content.split(/\s+/).length;
  const syllables = countSyllables(content);

  // Công thức đơn giản hóa: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const asl = words / Math.max(sentences, 1);
  const asw = syllables / Math.max(words, 1);
  return Math.max(0, Math.min(100, 206.835 - 1.015 * asl - 84.6 * asw));
}

function countSyllables(text) {
  // Mô phỏng đơn giản việc đếm âm tiết
  return Math.floor(text.split(/\s+/).length * 1.5);
}

describe("SEO Scoring System", () => {
  it("should correctly score good content higher than bad content", () => {
    // Test với từ khóa giống nhau
    const keywords = "Marketing Online, SEO, Digital Marketing";

    const goodScore = calculateSEOScore(mockContent.good, keywords);
    const badScore = calculateSEOScore(mockContent.bad, keywords);

    console.log("Good content score:", goodScore);
    console.log("Bad content score:", badScore);

    expect(goodScore.totalScore).to.be.greaterThan(badScore.totalScore);
    expect(goodScore.totalScore).to.be.at.least(70); // Nội dung tốt ít nhất đạt 70 điểm
    expect(badScore.totalScore).to.be.at.most(60); // Nội dung kém không quá 60 điểm
  });

  it("should measure keyword density correctly", () => {
    const keyword = "marketing";
    const density = calculateKeywordDensity(
      mockContent.good.toLowerCase(),
      keyword
    );

    expect(density).to.be.at.least(0.5); // Ít nhất 0.5%
    expect(density).to.be.at.most(5); // Không quá 5%
  });

  it("should reward content with good structure", () => {
    const keywords = "Marketing, SEO";
    const goodContentScore = calculateSEOScore(mockContent.good, keywords);

    // Kiểm tra điểm cấu trúc nội dung
    expect(goodContentScore.componentScores.contentQuality).to.be.greaterThan(
      60
    );
    expect(goodContentScore.details.headingsCount).to.be.at.least(2);
  });

  it("should consider multiple aspects of SEO in its scoring", () => {
    const keywords = "Marketing Online, SEO";
    const score = calculateSEOScore(mockContent.good, keywords);

    // Kiểm tra xem tất cả các khía cạnh có được đánh giá không
    expect(score.componentScores).to.have.all.keys([
      "keywordOptimization",
      "contentQuality",
      "readability",
      "metaTags",
      "userExperience",
    ]);

    // Kiểm tra xem trọng số có được áp dụng đúng không
    const expectedMaxScore = Object.keys(score.componentScores).reduce(
      (total, key) => {
        return total + (100 * SEO_CHECKLIST[key].weight) / 100;
      },
      0
    );

    expect(score.totalScore).to.be.at.most(expectedMaxScore);
  });
});

module.exports = {
  calculateSEOScore,
};

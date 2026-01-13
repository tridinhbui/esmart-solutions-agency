const { Blog, sequelize } = require('./models');

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const sampleBlogs = [
  {
    title: "Getting Started with Digital Marketing in 2026",
    content: `<h2>Introduction</h2>
<p>Digital marketing has evolved dramatically in recent years. In this comprehensive guide, we'll explore the latest strategies and tools that can help your business thrive in the digital landscape.</p>

<h3>Key Strategies</h3>
<ul>
<li>Content Marketing</li>
<li>Social Media Engagement</li>
<li>SEO Optimization</li>
<li>Email Marketing Automation</li>
</ul>

<h3>Why Digital Marketing Matters</h3>
<p>With over 5 billion internet users worldwide, having a strong digital presence is no longer optional—it's essential for business growth.</p>

<h3>Getting Started</h3>
<p>Start by defining your target audience, setting clear goals, and choosing the right platforms for your business. Remember, consistency is key to success in digital marketing.</p>`,
    excerpt: "Discover the essential strategies and tools for successful digital marketing in 2026. Learn how to build a strong online presence.",
    author: "Sarah Johnson",
    authorEmail: "sarah@esmartsolutions.com",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
    tags: ["Digital Marketing", "SEO", "Social Media", "Business Growth"],
    category: "Marketing",
    status: "published",
    metaTitle: "Digital Marketing Guide 2026 | ESmart Solutions",
    metaDescription: "Complete guide to digital marketing strategies, tools, and best practices for businesses in 2026.",
    metaKeywords: ["digital marketing", "SEO", "social media", "content marketing", "2026"]
  },
  {
    title: "AI-Powered Solutions: Transforming Business Operations",
    content: `<h2>The AI Revolution</h2>
<p>Artificial Intelligence is no longer a futuristic concept—it's here, and it's transforming how businesses operate. From automation to predictive analytics, AI is driving efficiency and innovation.</p>

<h3>Key Applications</h3>
<ul>
<li>Customer Service Automation</li>
<li>Data Analysis and Insights</li>
<li>Process Optimization</li>
<li>Personalized Marketing</li>
</ul>

<h3>Benefits of AI Integration</h3>
<p>Businesses implementing AI solutions report up to 40% increase in productivity and significant cost savings. AI helps reduce human error, speeds up processes, and provides actionable insights from data.</p>

<h3>Getting Started with AI</h3>
<p>You don't need to be a tech giant to leverage AI. Start small with chatbots or automated email responses, then gradually expand to more complex applications.</p>`,
    excerpt: "Explore how AI-powered solutions are revolutionizing business operations and driving growth in various industries.",
    author: "Michael Chen",
    authorEmail: "michael@esmartsolutions.com",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
    tags: ["AI", "Automation", "Technology", "Business Innovation"],
    category: "Technology",
    status: "published",
    metaTitle: "AI Solutions for Business | ESmart Solutions",
    metaDescription: "Learn how AI-powered solutions can transform your business operations and drive growth.",
    metaKeywords: ["artificial intelligence", "AI solutions", "business automation", "technology"]
  },
  {
    title: "Building a Strong Brand Identity in the Digital Age",
    content: `<h2>Your Brand is Your Story</h2>
<p>In today's crowded digital marketplace, a strong brand identity is what sets you apart. It's not just about a logo—it's about creating an emotional connection with your audience.</p>

<h3>Elements of Brand Identity</h3>
<ul>
<li>Visual Identity (Logo, Colors, Typography)</li>
<li>Brand Voice and Tone</li>
<li>Core Values and Mission</li>
<li>Customer Experience</li>
</ul>

<h3>Why Brand Identity Matters</h3>
<p>Consistent branding across all platforms can increase revenue by up to 23%. A strong brand identity builds trust, recognition, and loyalty among your customers.</p>

<h3>Building Your Brand</h3>
<p>Start by defining your brand values, understanding your audience, and creating consistent messaging across all touchpoints. Remember, authenticity is key.</p>`,
    excerpt: "Learn the essential elements of building a powerful brand identity that resonates with your audience and drives business success.",
    author: "Emma Rodriguez",
    authorEmail: "emma@esmartsolutions.com",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200",
    tags: ["Branding", "Marketing", "Design", "Business Strategy"],
    category: "Branding",
    status: "published",
    metaTitle: "Brand Identity Guide | ESmart Solutions",
    metaDescription: "Complete guide to building a strong brand identity in the digital age.",
    metaKeywords: ["brand identity", "branding", "brand strategy", "marketing"]
  },
  {
    title: "The Future of E-Commerce: Trends to Watch",
    content: `<h2>E-Commerce Evolution</h2>
<p>The e-commerce landscape is constantly evolving. Stay ahead of the curve by understanding the latest trends shaping online retail in 2026.</p>

<h3>Emerging Trends</h3>
<ul>
<li>Social Commerce Integration</li>
<li>AR/VR Shopping Experiences</li>
<li>Sustainable and Ethical Shopping</li>
<li>Voice Commerce</li>
<li>Personalization at Scale</li>
</ul>

<h3>Impact on Business</h3>
<p>E-commerce sales are projected to reach $8 trillion by 2027. Businesses that adapt to these trends will capture a larger market share.</p>

<h3>Implementation Tips</h3>
<p>Start by optimizing your mobile experience, integrating social selling, and leveraging data to personalize customer journeys.</p>`,
    excerpt: "Discover the top e-commerce trends for 2026 and learn how to position your business for success in the evolving online retail landscape.",
    author: "David Park",
    authorEmail: "david@esmartsolutions.com",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200",
    tags: ["E-Commerce", "Online Retail", "Business Trends", "Digital Sales"],
    category: "E-Commerce",
    status: "published",
    metaTitle: "E-Commerce Trends 2026 | ESmart Solutions",
    metaDescription: "Explore the latest e-commerce trends and strategies for online retail success in 2026.",
    metaKeywords: ["e-commerce", "online retail", "shopping trends", "digital sales"]
  },
  {
    title: "Web Design Best Practices for 2026",
    content: `<h2>Modern Web Design</h2>
<p>Web design continues to evolve with new technologies and user expectations. Here are the best practices for creating stunning, user-friendly websites in 2026.</p>

<h3>Key Principles</h3>
<ul>
<li>Mobile-First Design</li>
<li>Fast Loading Speed</li>
<li>Accessibility for All Users</li>
<li>Intuitive Navigation</li>
<li>Clean, Minimalist Aesthetics</li>
</ul>

<h3>User Experience Matters</h3>
<p>88% of online consumers are less likely to return to a site after a bad experience. Good design isn't just about looks—it's about creating seamless user journeys.</p>

<h3>Design Trends</h3>
<p>Dark mode, micro-interactions, 3D elements, and AI-powered personalization are dominating web design in 2026.</p>`,
    excerpt: "Master the essential web design principles and trends for creating exceptional user experiences in 2026.",
    author: "Lisa Wong",
    authorEmail: "lisa@esmartsolutions.com",
    coverImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
    tags: ["Web Design", "UX/UI", "Design Trends", "User Experience"],
    category: "Design",
    status: "published",
    metaTitle: "Web Design Best Practices 2026 | ESmart Solutions",
    metaDescription: "Learn the latest web design best practices and trends for creating exceptional user experiences.",
    metaKeywords: ["web design", "UX design", "UI design", "website development"]
  }
];

async function seedBlogs() {
  try {
    console.log('🌱 Starting blog seeding...\n');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established\n');

    for (let i = 0; i < sampleBlogs.length; i++) {
      try {
        const blogData = {
          ...sampleBlogs[i],
          slug: generateSlug(sampleBlogs[i].title),
        };
        const blog = await Blog.create(blogData);
        console.log(`✅ Created: "${blog.title}" (ID: ${blog.id}, Slug: ${blog.slug})`);
      } catch (error) {
        console.error(`❌ Failed to create blog ${i + 1}:`, error.message);
      }
    }

    console.log('\n✨ Blog seeding completed!');
    console.log(`\n📊 Total blogs in database: ${await Blog.count()}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

seedBlogs();

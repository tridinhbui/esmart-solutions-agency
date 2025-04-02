const fs = require('fs').promises;
const path = require('path');
const { scrapeSite } = require('./scraper'); // Import the scraper

// Configuration
const INPUT_FILE = path.join('scraped_data', 'blog_data.json');
const OUTPUT_FILE = path.join('blog', 'src', 'data', 'blog-content.json');

async function processDataForBlog() {
  try {
    // Check if data file exists, if not, run the scraper
    let blogData;
    try {
      const fileContent = await fs.readFile(INPUT_FILE, 'utf8');
      blogData = JSON.parse(fileContent);
      console.log('Using existing scraped data');
    } catch (error) {
      console.log('No existing data found, running scraper...');
      blogData = await scrapeSite();
    }
    
    // Process data for the blog format
    const processedData = {
      mainPost: processSinglePost(blogData.mainPost, true),
      sidebarPosts: blogData.sidebarPosts.map(post => processSinglePost(post, false))
    };
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Save processed data
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(processedData, null, 2));
    console.log(`Processed data saved to ${OUTPUT_FILE}`);
    
    return processedData;
  } catch (error) {
    console.error('Error processing data:', error);
    throw error;
  }
}

function processSinglePost(post, isMainPost) {
  if (!post) return null;
  
  // Create a cleaner excerpt if necessary
  let excerpt = post.excerpt;
  if (!excerpt && post.plainTextContent) {
    excerpt = post.plainTextContent.substring(0, 150) + '...';
  }
  
  // Base post data
  const processedPost = {
    title: post.title || 'Untitled Post',
    image: post.localFeaturedImage || (post.localContentImages && post.localContentImages.length > 0 
      ? post.localContentImages[0].localSrc : 'image-placeholder.jpg'),
    url: post.url || '#',
    excerpt: excerpt || 'No excerpt available',
    categories: post.categories || [],
    tags: post.tags || [],
    author: post.author || 'Unknown Author',
    date: post.publicationDate || new Date().toISOString()
  };
  
  // Add full content for main post
  if (isMainPost) {
    processedPost.fullText = post.plainTextContent || 'No content available';
    processedPost.htmlContent = post.content || '';
    
    // Process content images
    if (post.localContentImages && post.localContentImages.length > 0) {
      processedPost.contentImages = post.localContentImages;
    }
    
    // Process related posts
    if (post.relatedPosts && post.relatedPosts.length > 0) {
      processedPost.relatedPosts = post.relatedPosts.map(related => ({
        title: related.title || 'Related Post',
        url: related.url || '#',
        image: related.imageSrc || 'image-placeholder.jpg'
      }));
    }
  }
  
  return processedPost;
}

// Run the processor
processDataForBlog().catch(console.error);

module.exports = { processDataForBlog };
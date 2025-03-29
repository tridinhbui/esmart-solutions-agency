const playwright = require('playwright');

(async () => {
  try {
    // Launch browser with slower navigation to give pages time to load
    const browser = await playwright.chromium.launch({ 
      headless: false,
      slowMo: 100 // Add some delay between actions
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // Set a common user agent
    });
    
    const page = await context.newPage();
    
    // Navigate to the page with timeout
    await page.goto('https://advertisingvietnam.com/category/startup', { 
      waitUntil: 'networkidle',
      timeout: 60000 // Increase timeout to 60 seconds
    });
    
    // Wait for the content to be visible
    await page.waitForSelector('.cat-detail-item', { timeout: 10000 });
    
    // Take a screenshot to debug
    await page.screenshot({ path: 'debug-screenshot.png' });
    
    // Extract the data
    const blogs = await page.$$eval('.cat-detail-item', allBlogs => {
      return allBlogs.map(blog => {
        // Use more flexible selectors by trying different options
        const titleEl = blog.querySelector('h3.mb-3.mb-md-2') || blog.querySelector('h3');
        const contentEl = blog.querySelector('h4.d-none.d-md-block') || blog.querySelector('h4');
        const authorEl = blog.querySelector('h5.mb-0') || blog.querySelector('h5');
        const dateEl = blog.querySelector('p.mb-0') || blog.querySelector('p');
        
        return {
          title: titleEl ? titleEl.innerText.trim() : null,
          content: contentEl ? contentEl.innerText.trim() : null,
          author: authorEl ? authorEl.innerText.trim() : null,
          date: dateEl ? dateEl.innerText.trim() : null,
          url: blog.querySelector('a') ? blog.querySelector('a').href : null
        };
      });
    });
    
    console.log(JSON.stringify(blogs, null, 2));
    
    await browser.close();
  } catch (error) {
    console.error('Scraping failed:', error);
  }
})();
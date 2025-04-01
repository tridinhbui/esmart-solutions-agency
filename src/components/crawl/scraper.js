const playwright = require('playwright');
const fs = require('fs');

// Enhanced random delay function with more variation
const randomDelay = async (min = 3000, max = 7000) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Sleeping for ${delay}ms...`);
  await new Promise(resolve => setTimeout(resolve, delay));
  return delay;
};

// Additional longer delay function for between major actions
const longDelay = async () => {
  const delay = Math.floor(Math.random() * (15000 - 8000 + 1)) + 8000;
  console.log(`Taking a longer break for ${delay}ms...`);
  await new Promise(resolve => setTimeout(resolve, delay));
  return delay;
};

// List of user agents to rotate
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
];

// Get random user agent
const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

(async () => {
  let browser;
  try {
    console.log('Starting scraper with anti-blocking measures...');
    
    // Add initial delay before starting
    await randomDelay(5000, 10000);
    
    // Launch browser with stealth options
    browser = await playwright.chromium.launch({ 
      headless: false,
      slowMo: 50, // Reduced slowMo to make it less obvious
    });
    
    // Create a persistent context to maintain cookies
    const context = await browser.newContext({
      userAgent: getRandomUserAgent(),
      viewport: { width: 1920, height: 1080 },
      // Add additional browser fingerprinting protection
      deviceScaleFactor: 1,
      hasTouch: false,
      javaScriptEnabled: true,
      locale: 'en-US',
      timezoneId: 'Asia/Ho_Chi_Minh' // Set Vietnam timezone
    });
    
    // Add storage state if you have previously saved cookies
    try {
      if (fs.existsSync('./cookies.json')) {
        const storageState = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
        await context.addCookies(storageState.cookies);
      }
    } catch (e) {
      console.log('No saved cookies found, proceeding with fresh session');
    }
    
    const page = await context.newPage();
    
    // Set extra HTTP headers to appear more like a real browser
    await page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    });
    
    console.log(`Waiting ${await randomDelay(2000, 5000)}ms before navigating...`);
    
    // Navigate to the page with timeout and retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        console.log(`Attempting to navigate to the website (${retries} retries left)...`);
        await page.goto('https://advertisingvietnam.com/category/startup', { 
          waitUntil: 'networkidle',
          timeout: 60000
        });
        break; // If successful, exit the retry loop
      } catch (error) {
        console.log(`Navigation failed: ${error.message}`);
        retries--;
        
        if (retries === 0) throw error;
        
        // If navigation fails, wait longer before retrying
        console.log(`Taking a longer break before retry...`);
        await longDelay();
        
        // Try with a different user agent
        const newUserAgent = getRandomUserAgent();
        console.log(`Switching to new user agent: ${newUserAgent}`);
        await context.setExtraHTTPHeaders({
          'User-Agent': newUserAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'max-age=0'
        });
      }
    }
    
    
    // Take a screenshot to debug
    await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
    console.log('Screenshot saved as debug-screenshot.png');
    
    // Wait before extracting data
    await randomDelay(2000, 5000);
    
    // Extract the data with more robust selectors
    const blogs = await page.evaluate(() => {
      // Try different selectors to find blog items
      const blogElements = document.querySelectorAll('.cat-detail-item') || 
                          document.querySelectorAll('article') || 
                          document.querySelectorAll('.post');
      
      return Array.from(blogElements).map(blog => {
        // Use multiple possible selector patterns
        const titleEl = blog.querySelector('h3.mb-3.mb-md-2') || 
                       blog.querySelector('h3') || 
                       blog.querySelector('.entry-title');
                       
        const contentEl = blog.querySelector('h4.d-none.d-md-block') || 
                         blog.querySelector('h4') || 
                         blog.querySelector('.entry-summary');
                         
        const authorEl = blog.querySelector('h5.mb-0') || 
                        blog.querySelector('h5') || 
                        blog.querySelector('.author');
                        
        const dateEl = blog.querySelector('p.mb-0') || 
                      blog.querySelector('p') || 
                      blog.querySelector('.date');
        
        const linkEl = blog.querySelector('a');
        
        return {
          title: titleEl ? titleEl.innerText.trim() : null,
          content: contentEl ? contentEl.innerText.trim() : null,
          author: authorEl ? authorEl.innerText.trim() : null,
          date: dateEl ? dateEl.innerText.trim() : null,
          url: linkEl ? linkEl.href : null
        };
      });
    });
    
    console.log(`Found ${blogs.length} blog entries`);
    
    // Wait before saving results
    await randomDelay(1000, 3000);
    
    // Save the results to a file
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    console.log('Results saved to blogs.json');
    
    // Wait before saving cookies
    await randomDelay(1000, 3000);
    
    // Save cookies for future sessions
    const storageState = await context.storageState();
    fs.writeFileSync('./cookies.json', JSON.stringify(storageState));
    
    await browser.close();
    console.log('Browser closed successfully');
    
  } catch (error) {
    console.error('Scraping failed:', error);
    // Take error screenshot
    if (browser) {
      const page = await browser.newPage();
      await page.screenshot({ path: 'error-screenshot.png' });
      console.log('Error screenshot saved');
      await browser.close();
    }
  }
})();
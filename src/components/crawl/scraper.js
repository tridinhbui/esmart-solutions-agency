import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

const browserConfig = {
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920,1080',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
    // Add more stealth arguments
    '--disable-blink-features=AutomationControlled',
    '--disable-infobars'
  ]
};

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.48'
];

function getRandomUserAgent() { 
  return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function randomDelay(min = 3000, max = 7000) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(`Waiting ${delay/1000} seconds...`);
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function checkForAntiBot(page) {
  try {
    const antiBotElements = await page.$$eval('body', elements => {
      const bodyText = elements[0].innerText.toLowerCase();
      return (
        bodyText.includes('captcha') || 
        bodyText.includes('verify') || 
        bodyText.includes('robot') || 
        bodyText.includes('bot detection') ||
        bodyText.includes('blocked') ||
        bodyText.includes('access denied')
      );
    });

    if (antiBotElements) {
      console.log('⚠️ Anti-bot detection found! Waiting longer...');
      await randomDelay(15000, 30000);
      await page.screenshot({ path: 'antibot-detection.png' }); 
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking for anti-bot:', error);
    return false;
  }
}

const FORUM_URL = 'https://advertisingvietnam.com/category/startup';

async function scrapeAdvertisingVietnam() {
  let browser = null;
  try {
    console.log("Starting AdvertisingVietnam scraper...");

    browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    const userAgent = getRandomUserAgent(); 
    await page.setUserAgent(userAgent);
    console.log(`Using user agent: ${userAgent}`);

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'DNT': '1'
    });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const resourceType = request.resourceType();
      if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.setCookie({
      name: 'returningVisitor',
      value: 'true',
      domain: 'advertisingvietnam.com/category/startup',
      path: '/'
    });

    await randomDelay(1000, 3000);

    console.log(`--- Navigating to: ${FORUM_URL} ---`);
    
    await page.goto(FORUM_URL, { 
      waitUntil: "domcontentloaded",
      timeout: 90000
    });
    
    const hasBotDetection = await checkForAntiBot(page);
    if (hasBotDetection) {
      console.log('Attempting to bypass bot detection...');
      // Perform some human-like actions
      await page.mouse.move(100, 100);
      await randomDelay(500, 1500);
      await page.mouse.move(500, 500);
      await randomDelay(500, 1500);
      // Scroll down slowly
      await page.evaluate(() => {
        window.scrollBy(0, 300);
      });
      await randomDelay(1000, 2000);
    }

    try {
      await page.waitForSelector('article, .cat-detail-item, .post', { 
        timeout: 30000 
      });
      console.log('Content selectors found on page');
    } catch (error) {
      console.warn('Could not find expected selectors, continuing anyway:', error.message);
      await page.screenshot({ path: 'no-selectors-found.png' });
    }

    const blogs = await page.evaluate(() => {
      const selectors = [
        '.cat-detail-item', 
        'article', 
        '.post',
        '.entry',
        '.blog-post',
        '.item',
        '.card',
        '.news-item'
      ];
      
      let blogElements = [];
      
      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          blogElements = [...blogElements, ...Array.from(elements)];
        }
      }
      
      if (blogElements.length === 0) {
        const possibleContainers = document.querySelectorAll('div, section');
        for (const container of possibleContainers) {
          const hasTitle = container.querySelector('h1, h2, h3, h4');
          const hasContent = container.querySelector('p');
          const hasLink = container.querySelector('a');
          
          if (hasTitle && hasContent && hasLink) {
            blogElements.push(container);
          }
        }
      }
      
      // Extract blog data
      return Array.from(new Set(blogElements)).map(blog => {
        const titleSelectors = ['h1', 'h2', 'h3', 'h3.mb-3.mb-md-2', '.entry-title', '.title'];
        const contentSelectors = ['h4.d-none.d-md-block', 'h4', '.entry-summary', 'p', '.excerpt', '.summary'];
        const authorSelectors = ['h5.mb-0', 'h5', '.author', '.byline', 'span[itemprop="author"]'];

        let date = null;
        const dateElements = blog.querySelectorAll('p.mb-0');
        for (const el of dateElements) {
          const text = el.innerText.trim();
          if (text.match(/^\d{2}\s+Thg\s+\d{2}\s+\d{4}$/)) {
            date = text;
            break;
          }
        }

        if (!date) {
          const altDateSelectors = ['span[_ngcontent-serverapp-c55]', 'time', '.date'];
          for (const selector of altDateSelectors) {
            const elements = blog.querySelectorAll(selector);
            for (const el of elements) {
              const text = el.innerText.trim();
              if (text.match(/\d{2}\s+Thg\s+\d{2}\s+\d{4}/)) {
                date = text;
                break;
              }
            }
            if (date) break;
          }
        }
        
        const findContent = (element, selectors) => {
          for (const selector of selectors) {
            const found = element.querySelector(selector);
            if (found) {
              let text = found.innerText.trim();
              return text;
            }
          }
          return null;
        };
        
        let url = null;
        const links = blog.querySelectorAll('a');
        for (const link of links) {
          if (link.href && link.href.length > 0 && !link.href.includes('javascript:')) {
            url = link.href;
            break;
          }
        }

        let image = null;
        const images = blog.querySelectorAll('img:not(.writer-avt)');
        for (const img of images) {
          if (img.src && img.src.length > 0 && !img.src.includes('data:')) {
            image = img.src;
            break;
          }
        }

        let authorImage = null;
        const authorImages = blog.querySelectorAll('img.writer-avt');
        if (authorImages && authorImages.length > 0) {
          const img = authorImages[0];
          // Get the complete src attribute without any modification
          authorImage = img.getAttribute('src');
          
          // If src is empty or contains 'avatar-default', try data-src as fallback
          if (!authorImage || authorImage.includes('avatar-default')) {
            authorImage = img.getAttribute('data-src') || null;
          }
        }
        
        return {
          title: findContent(blog, titleSelectors),
          content: findContent(blog, contentSelectors),
          author: findContent(blog, authorSelectors),
          date: date,
          image: image,
          authorImage: authorImage,
          url: url
        };
      }).filter(item => item.title || item.content);
    });

    console.log(`Found ${blogs.length} blog entries`);
    
    // If no blog posts found, try to get page content for analysis
    if (blogs.length === 0) {
      console.log('No blog entries found, capturing page content for analysis');
      const pageContent = await page.evaluate(() => {
        return {
          title: document.title,
          bodyText: document.body.innerText.slice(0, 500) + '...',
          url: window.location.href,
          headers: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText.trim())
        };
      });
      
      fs.writeFileSync('page-analysis.json', JSON.stringify(pageContent, null, 2));
      console.log('Page analysis saved to page-analysis.json');
    }
    
    await randomDelay(1000, 3000);
    
    fs.writeFileSync('blogs.json', JSON.stringify(blogs, null, 2));
    console.log('Results saved to blogs.json');
    
    await browser.close();
    console.log('Browser closed successfully');
    
    return blogs;
    
  } catch (error) {
    console.error('Scraping failed:', error);
    if (browser) {
      try {
        const pages = await browser.pages();
        if (pages.length > 0) {
          await pages[0].screenshot({ path: 'error-screenshot.png', fullPage: true });
          console.log('Error screenshot saved');
        }
        await browser.close();
        console.log('Browser closed after error');
      } catch (screenshotError) {
        console.error('Failed to take error screenshot:', screenshotError);
      }
    }
    throw error;
  }
}

export const handler = async () => {
  try {
    const result = await scrapeAdvertisingVietnam();
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Scraping completed successfully', 
        blogCount: result.length,
        timestamp: new Date().toISOString()
      }),
    };
  } catch (err) {
    console.error('Scraper failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Scraper failed', 
        error: err.message,
        timestamp: new Date().toISOString()
      }),
    };
  }
}

// Execute the scraper
scrapeAdvertisingVietnam().catch(err => {
  console.error('Scraper failed:', err);
  process.exit(1);
});
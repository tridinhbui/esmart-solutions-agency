require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const questionnaireRoutes = require("../routes/questionnaireRoutes");
const sendEmailRoutes = require("../routes/sendEmailRoute");
const chatBotRoutes = require("../routes/chatBotRoute");
/*
const contentRoute = require("../routes/content");
const imageRoute = require("../routes/image");
const projectRoute = require("../routes/project");
const seoRoute = require("../routes/seo");
const { testConnection } = require("../config/database");
const { initializeModels } = require("../models");
*/


const app = express();
const router = express.Router();
app.use(bodyParser.json({ limit: "50mb" }));

const corsOptions = {
    origin: [
        "http://localhost:8080",
        "http://localhost:3000",
        "https://esmartsolutions.com.vn" // Production
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Allow cookies if needed
};

/*
// Initialize database connection
async function initializeDatabase() {
    try {
      // Test database connection
      await testConnection();
  
      // Initialize models
      await initializeModels();
      console.log("Database models initialized successfully");
    } catch (error) {
      console.error("Database initialization error:", error);
      // Log error but don't exit process - allow server to start anyway
      console.log(
        "Server will continue to run, but database features may not work properly"
      );
    }
}
  
// Call database initialization
initializeDatabase().catch((err) => {
console.error("Failed to initialize database:", err);
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
*/

// Routes
router.use("/api/questionnaire", questionnaireRoutes);
router.use("/api/email", sendEmailRoutes);
router.use("/api/chatbot", chatBotRoutes);

/*
router.use("/api/content", contentRoute);
router.use("/api/image", imageRoute);
router.use("/api", projectRoute);
router.use("/api/seo", seoRoute);

// Simple test page for quick API testing
router.get("/test", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>API Test</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                button { padding: 10px; margin: 10px 0; cursor: pointer; }
                textarea { width: 100%; height: 200px; margin: 10px 0; }
                .field { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; font-weight: bold; }
                input, select { padding: 8px; width: 100%; box-sizing: border-box; }
                #result { white-space: pre-wrap; border: 1px solid #ddd; padding: 10px; }
            </style>
            </head>
            <body>
            <h1>Content Generation API Test</h1>
            
            <div class="field">
                <label for="topic">Topic:</label>
                <input type="text" id="topic" value="Digital Marketing">
            </div>
            
            <div class="field">
                <label for="keywords">Keywords:</label>
                <input type="text" id="keywords" value="SEO, analytics, social media">
            </div>
            
            <div class="field">
                <label for="tone">Tone:</label>
                <select id="tone">
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
                </select>
            </div>
            
            <div class="field">
                <label for="type">Content Type:</label>
                <select id="type">
                <option value="blog">Blog Post</option>
                <option value="social">Social Media Post</option>
                <option value="landing">Landing Page</option>
                <option value="email">Email Marketing</option>
                </select>
            </div>
            
            <button id="generate">Generate Content</button>
            <button id="checkHealth">Check API Health</button>
            
            <h2>Result:</h2>
            <div id="result">Results will appear here...</div>
            
            <script>
                document.getElementById('generate').addEventListener('click', async () => {
                const result = document.getElementById('result');
                result.innerHTML = 'Generating content...';
                
                try {
                    const response = await fetch('/api/generate-content', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: document.getElementById('topic').value,
                        keywords: document.getElementById('keywords').value,
                        tone: document.getElementById('tone').value,
                        type: document.getElementById('type').value
                    })
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                    result.innerHTML = data.content;
                    } else {
                    result.innerHTML = 'Error: ' + (data.error || 'Unknown error') + 
                        '<br>Details: ' + (data.details || 'No details provided');
                    }
                } catch (error) {
                    result.innerHTML = 'Error: ' + error.message;
                }
                });
                
                document.getElementById('checkHealth').addEventListener('click', async () => {
                const result = document.getElementById('result');
                result.innerHTML = 'Checking API health...';
                
                try {
                    const response = await fetch('/api/health');
                    const data = await response.json();
                    result.innerHTML = JSON.stringify(data, null, 2);
                } catch (error) {
                    result.innerHTML = 'Error: ' + error.message;
                }
                });
            </script>
            </body>
        </html>
    `);
});
*/

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);



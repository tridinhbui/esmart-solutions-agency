require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const questionnaireRoutes = require("../routes/questionnaireRoutes");
const sendEmailRoutes = require("../routes/sendEmailRoute");
const chatBotRoutes = require("../routes/chatBot");


const app = express();
const router = express.Router();

const corsOptions = {
    origin: [
        "http://localhost:8080",
        "http://localhost:3000",
        "https://esmartsolutions.com.vn" // Production
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Allow cookies if needed
};

app.use(cors(corsOptions));
app.use(express.json());

router.use("/api/questionnaire", questionnaireRoutes);
router.use("/api/email", sendEmailRoutes);
router.use("/api/chatbot", chatBotRoutes);

app.use("/.netlify/functions/server", router);

module.exports.handler = serverless(app);



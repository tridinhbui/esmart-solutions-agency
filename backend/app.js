require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const sendEmailRoutes = require("./routes/sendEmailRoute");

const app = express();

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

app.use(bodyParser.json());

app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/email", sendEmailRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend is running on ${PORT}`);
});
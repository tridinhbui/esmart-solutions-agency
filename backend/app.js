const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const questionnaireRoutes = require("./routes/questionnaireRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/questionnaire", questionnaireRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});
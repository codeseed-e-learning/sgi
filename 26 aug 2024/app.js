const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/response", async (req, res) => {
    const prompt_user = req.body.query;
    console.log("Received prompt:", prompt_user);
    

    try {
        const genAI = new GoogleGenerativeAI(
            "AIzaSyAaVune5M3Er9B42effluYJLY79CRsDChg"
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = prompt_user || "How are you Google?";
        const result = await model.generateContent(prompt);
        res.send(result.response.text());
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({
            message: "Error generating content",
            error: error.message,
            stack: error.stack,
        });
    }
});

app.listen(3000, () => {
    console.log(`Working on port 3000`);
});

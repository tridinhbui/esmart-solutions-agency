const OpenAI = require("openai");
const dotenv = require("dotenv");
const axios = require("axios");


dotenv.config();
const chatBot = async (req, res) => {
    const message = req.body.message;
    

    try {
      const response = await axios.post(
        process.env.OPENROUTER_API_URL,
        {
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 400,
          temperature: 1,
          top_p: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = response.data.choices[0].message.content;
      if (data != '') res.json({ response: data });
      else res.json({response: 'We will get back to you later'});
  
    } catch (error) {
      console.error("Error:", error?.response?.data || error.message);
      res.status(500).json({ error: "Something went wrong." });
    }
    
  };
  
  


module.exports = { chatBot };

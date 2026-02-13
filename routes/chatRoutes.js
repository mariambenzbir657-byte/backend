const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv =require("dotenv");

const GROQ_KEY = process.env.GROQ_API_KEY;

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "groq/compound-mini", // stable working model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ],
      },
      {
        headers: {
          "Authorization": `Bearer ${GROQ_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response";
    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "AI Error" });
  }
});
module.exports = router;

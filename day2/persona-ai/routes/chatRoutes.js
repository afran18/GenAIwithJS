import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { hiteshPersona } from "../personas/hitesh.js";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

router.post("/", async (req, res) => {
  try {
    const { persona, message } = req.body;

    let personaData;
    if (persona?.toLowerCase() === "hitesh") {
      personaData = hiteshPersona;
    } else {
      return res.status(400).json({ error: "Person not found" });
    }

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are ${persona} and respond in their tone and style based on: ${JSON.stringify(
            personaData
          )}`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.log("Error generating response: ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

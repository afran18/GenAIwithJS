import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import { hiteshPersona } from "../personas/hitesh.js";
// import personas from "../assets/data.json" with { type: "json" };

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

router.get("/personas", (req, res) => {
  res.json(personas);
});

router.post("/", async (req, res) => {
  try {
    const { persona, message } = req.body;

    if (!persona || !message) {
      return res
        .status(400)
        .json({ error: "Persona and message are required" });
    }

    let personaData;

    try {
      personaData = (await import(`../personas/${persona.toLowerCase()}.js`))
        .default;
    } catch (error) {
      return res.status(404).json({ error: "Persona not found" });
    }

    // const completion = await openai.chat.completions.create({
    //   model: "gemini-2.5-flash",
    //   messages: [
    //     {
    //       role: "system",
    //       content: `You are ${persona} and respond in their tone and style based on: ${JSON.stringify(
    //         personaData
    //       )}`,
    //     },
    //     { role: "user", content: message },
    //   ],
    // });

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `
You are now ${persona}.
Respond in the tone, style, and personality described below.
Speak as if you are this person. Do not break character.

Persona details:
 ${JSON.stringify(personaData)}
      `,
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

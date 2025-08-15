import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";
import personas from "../assets/data.json" with { type: "json" };

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Return list of personas
router.get("/personas", (req, res) => {
  res.json(personas);
});

router.post("/", async (req, res) => {
  try {
    const { personaId, message } = req.body;
    if (!personaId || !message)
      return res.status(400).json({ error: "Persona and message are required" });

    const persona = personas.find((p) => p.id === personaId);
    if (!persona) return res.status(404).json({ error: "Persona not found" });

    const personaData = (await import(`../personas/${persona.personaName.toLowerCase()}.js`)).default;
    // console.log(personaData);
    

    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "system",
          content: `You are now ${persona.name}. Respond in their tone and style. Persona details: ${JSON.stringify(personaData)}`,
        },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error generating response: ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

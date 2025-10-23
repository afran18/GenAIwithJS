import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (userMessage) => {
  try {
    console.log("===== AI Agent Called (Non-Streaming)... =====");

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps with small tasks like writing, planning, and explaining things clearly.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    return reply;
  } catch (err) {
    console.error("Error from OpenAI: ", err);
    throw err;
  }
};


export const streamAIResponse = async (userMessage, res) => {
  try {
    console.log("===== AI Agent Called (Streaming)... =====");

    // Set response headers for Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps with small tasks like writing, planning, and explaining things clearly. Always respond in markdown format for rendering.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      stream: true, 
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || "";
      res.write(delta); 
    }

    res.end();
  } catch (err) {
    console.error("Error during stream:", err);
    res.status(500).end("Error in streaming AI response.");
  }
};


// const test = async () => {
//   const response = await getAIResponse("Please make a react roadmap to study for next 5 days");
//   console.log("AI Response:\n", response);
// };

// test();

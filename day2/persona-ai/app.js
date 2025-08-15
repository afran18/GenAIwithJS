import { OpenAI } from "openai";
import fs from "fs";
import readline from "readline";
import dotenv from "dotenv";
import { hiteshPersona } from "./personas/hitesh.js";

dotenv.config();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

rl.question("Choose persona (hitesh): ", async (choice) => {
  let personData;
  if (choice.toLocaleLowerCase() === "hitesh") {
    personData = hiteshPersona;
  } else {
    console.log("Persona not found. Using default persona.");
    rl.close();
    return;
  }

  console.log(`\nPersona selected: ${choice}\n`);
  rl.setPrompt("You: ");
  rl.prompt();

  rl.on("line", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Exiting chat...");
      rl.close();
      return;
    }
    try {
      const completion = await openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are ${choice} and respond to their tone and style based on this data: ${JSON.stringify(
              personData
            )}`,
          },
          { role: "user", content: input },
        ],
      });
      console.log(`${choice}: ${completion.choices[0].message.content}\n`);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  });
});

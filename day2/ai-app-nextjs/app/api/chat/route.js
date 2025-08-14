// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(request) {

//     try {
//         const { message } = await request.json();
        
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{
//                 role: 'user',
//                 content: message
//             }]
//         });
        
//         return Response.json({
//             response: completion.choices[0].message.content,
//         })
//     } catch (error) {
//         console.error("Error in chat completion:", error);
//         return Response.json({
//             error: "Failed to generate response. Please try again later."
//         }, {status: 500});
//     }   
// }

// Import the GoogleGenerativeAI library
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client with your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // Extract the message from the request body
    const { message } = await request.json();

    // Get the generative model to use
    // You can specify a model like 'gemini-pro', 'gemini-1.5-flash', etc.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content using the provided message
    // The Gemini API call is different from OpenAI's,
    // but the concept of passing a prompt is the same.
    const result = await model.generateContent(message);

    // The response object has a different structure.
    // We get the text from the `response` property of the `result`.
    const response = await result.response;
    const text = response.text();

    // Return the generated text in the response
    return Response.json({
      response: text,
    });
  } catch (error) {
    console.error("Error in Gemini chat completion:", error);
    return Response.json({
      error: "Failed to generate response. Please try again later."
    }, { status: 500 });
  }
}

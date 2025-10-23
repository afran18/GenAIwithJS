import { getAIResponse } from "../services/aiAgent.js";

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        if(!message) {
            return res.status(400).json({error: "Message is required"});
        }

        const aiResponse = await getAIResponse(message);
        res.status(200).json({ success: true, response: aiResponse });

    } catch (err) {
        console.error("Error in handleChat: ", err);
        res.status(500).json({error: "Internal Server Error"});
    }
}
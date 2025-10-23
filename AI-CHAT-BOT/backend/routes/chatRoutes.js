import express from "express";
import { handleChat } from "../controllers/chatController.js";
import { streamAIResponse } from "../services/aiAgent.js";

const router = express.Router();

router.post("/", handleChat);

router.post("/stream", async (req, res) => {
  const { message } = req.body;
  await streamAIResponse(message, res);
});

export default router;
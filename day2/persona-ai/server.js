import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
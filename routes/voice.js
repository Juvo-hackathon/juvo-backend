import express from "express";
import { handleVoiceCall } from "../controllers/voice.js";

const voiceRouter = express.Router();

// Route for handling voice requests
voiceRouter.post("/voice", handleVoiceCall);

export default voiceRouter;

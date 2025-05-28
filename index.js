import express from "express";
import bodyParser from "body-parser";
import ussdRouter from "./routes/ussd.js";
import voiceRouter from "./routes/voice.js";
import { getFeedback } from "./services/feedbackService.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ussdRouter);
app.use(voiceRouter);

// A test route
app.get("/", (req, res) => {
  res.send("Hello from JUVO backend!");
});
// This endpoint is called by Vonage when the call is initiated
app.get("/webhooks/answer", (req, res) => {
  const symptom = req.query.symptom || "cough";
  const lang = req.query.lang || "en";

  const feedback = getFeedback(symptom, lang);

  const ncco = [
    {
      action: "talk",
      voiceName: "Amy",
      text: feedback,
    },
  ];

  res.json(ncco);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import ussdRouter from "./routes/ussd.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(ussdRouter);

// A test route
app.get("/", (req, res) => {
  res.send("Hello from JUVO backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

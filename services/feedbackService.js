import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawData = fs.readFileSync(path.join(__dirname, '../data/symptomFeedback.json'));
const feedbackData = JSON.parse(rawData);
// get feedback from data folder
// specify that its a json file
// get the symptom and the language
export const getFeedback = (symptom, lang) => {
  // get object of a specific symptom
  try {
    const entry = feedbackData[symptom];
    // Pulls the right advice based on symptom + language.
    if (entry && entry.feedback[lang]) {
      return entry.feedback[lang];
    } else {
      return "No advice for this symptom";
    }
  } catch (error) {
    console.error("Error loading feedback:", error.message);
    return "Something went wrong. Please try again later.";
  }
};

import { getFeedback } from "../services/feedbackService.js";

export const handleUssd = (req, res) => {
  const text = req.body.text || "";
  const levels = text.split("*");
  let response = "";

  const langOptions = {
    "1": "en",
    "2": "twi",
    "3": "fante",
    "4": "ewe",
    "5": "dagbani",
  };

  const symptomOptions = {
    "1": "headache",
    "2": "swollen_feet",
    "3": "nosebleed",
    "4": "eye_pain",
    "5": "stomach_pain",
  };

  if (text === "") {
    response = `CON Welcome to JUVO\n1. English\n2. Twi\n3. Fante\n4. Ewe\n5. Dagbani`;
  } else if (levels.length === 1) {
    response = `CON Choose a symptom:\n1. Headache\n2. Swollen Feet\n3. Nosebleed\n4. Eye Pain\n5. Stomach Pain`;
  } else if (levels.length === 2) {
    const langKey = langOptions[levels[0]];
    const symptomKey = symptomOptions[levels[1]];

    if (!langKey || !symptomKey) {
      response = "END Invalid selection. Please dial again.";
    } else {
      const feedback = getFeedback(symptomKey, langKey);
      response = `END ${feedback}`;
    }
  } else {
    response = "END Invalid input. Please follow the instructions.";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
};

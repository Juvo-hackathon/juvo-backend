import { getFeedback } from "../services/feedbackService.js";

export const handleUssd = (req, res) => {
  try {
    console.log(req.body);
    const text = req.body.text || "";
    const levels = text.split("*");
    let response = "";

    // Language codes mapped to keys
    const langOptions = {
      1: "en",
      2: "twi",
      3: "fante",
      4: "ewe",
      5: "dagbani",
    };

    // Symptom keys (these are keys used to get feedback)
    const symptomOptions = {
      1: "headache",
      2: "swollen_feet",
      3: "nosebleed",
      4: "eye_pain",
      5: "stomach_pain",
    };

    // Symptom labels for display in different languages
    const symptomLabels = {
      1: {
        en: "Headache",
        twi: "Tipaeɛ",
        fante: "Tipae",
        ewe: "Taɖuame",
        dagbani: "Zuɣuyaali taligu",
      },
      2: {
        en: "Swollen Feet",
        twi: "Nan a ahonhon",
        fante: "Nan ahon",
        ewe: "Afɔwo vuvu",
        dagbani: "Naba piɛmbu",
      },
      3: {
        en: "Nosebleed",
        twi: "Mogya a ɛretu wɔ hwene mu",
        fante: "Hwɛna p)ne",
        ewe: "Ʋu ƒe ŋɔti",
        dagbani: "Nyee ni ʒiɛm",
      },
      4: {
        en: "Eye Pain",
        twi: "Ani akyi yɛ den",
        fante: "Ani Ekyir yaw",
        ewe: "Vevesese le ŋku megbe",
        dagbani: "Piŋmɔ yɛ hiŋmɛii lɛ asɛɛ",
      },
      5: {
        en: "Stomach Pain",
        twi: "Yafunu mu yɛ den",
        fante: "Yɛm kawo",
        ewe: "Dɔgbo ƒe vevesese",
        dagbani: "Puli ni biɛrim",
      },
    };

    if (text === "") {
      // Initial menu: language selection
      response = `CON Welcome to JUVO\n1. English\n2. Twi\n3. Fante\n4. Ewe\n5. Dagbani`;
    } else if (levels.length === 1) {
      // After language selected, show symptom options in chosen language
      const langKey = langOptions[levels[0]]; // Get language key e.g., "en"
      if (!langKey) {
        response = "END Invalid language selection.";
      } else {
        response = "CON Choose a symptom:\n";
        for (const [key, labels] of Object.entries(symptomLabels)) {
          // Use symptom label for selected language
          response += `${key}. ${labels[langKey]}\n`;
        }
        response = response.trim();
      }
    } else if (levels.length === 2) {
      // After symptom selected, provide feedback
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
  } catch (error) {
    console.error("USSD handler error:", error);
    res.status(500).send("END An error occurred.");
  }
};

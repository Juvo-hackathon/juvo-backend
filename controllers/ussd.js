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

    // User-facing messages in each language
    const messages = {
      welcome: {
        en: "Welcome to JUVO",
        twi: "Akwaaba ba JUVO",
        fante: "Akwaaba  JUVO",
        ewe: "Woezɔ JUVO me",
        dagbani: "Nawuni ni ti JUVO",
      },
      chooseSymptom: {
        en: "Choose a symptom:",
        twi: "Fa wo sɛnkyerɛnne ahorow no:",
        fante: "faw yareɛ bi:",
        ewe: "Ge ɖe wò dzesiwo me:",
        dagbani: "Niŋm’ a bɔha ni:",
      },
      invalidLang: {
        en: "Invalid language selection.",
        twi: "Kasa a wɔapaw no nyɛ nokware.",
        fante: "Kasa a wɔapaw no nyɛ nokware.",
        ewe: "Nyenyeŋu meɖe gbe si wòna.",
        dagbani: "Ka pabli la gbɛ noli.",
      },
      invalidSymptom: {
        en: "Invalid selection. Please dial again.",
        twi: "Fa nyɛ nokware. Mesrɛ san frɛ bio.",
        fante: "Fa no nyɛ nokware. Mesrɛ san frɛ bio.",
        ewe: "Nyenyeŋu meɖe. Meseŋu gbɔ le esia me.",
        dagbani: "Ka pabli la noli. Tuma zaa, yoli kaŋa ni.",
      },
      invalidInput: {
        en: "Invalid input. Please follow the instructions.",
        twi: "Wode biribi a ɛnyɛ nokware de baa ha. Mesrɛ di akyire nsɛm no.",
        fante: "Wode biribi a ɛnyɛ nokware de baa ha. Mesrɛ di nsɛm no akyi.",
        ewe: "Nyenyeŋu meɖe wò tsɔe. Meseŋu le edzi me.",
        dagbani: "Pabli gɔvbu. Laafi ni, yoli kaŋa ni noli yɛrima.",
      },
    };

    // Symptom keys (used in service)
    const symptomOptions = {
      1: "headache",
      2: "swollen_feet",
      3: "nosebleed",
      4: "eye_pain",
      5: "stomach_pain",
    };

    // Symptom labels in different languages
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
      // Step 1: Language selection menu (static in English)
      response = `CON Welcome to JUVO, Akwaaba, Woezɔ, Nawuni\n1. English\n2. Twi\n3. Fante\n4. Ewe\n5. Dagbani`;
    } else if (levels.length === 1) {
      // Step 2: Show symptom list in selected language
      const langKey = langOptions[levels[0]];
      if (!langKey) {
        response = `END ${messages.invalidLang["en"]}`;
      } else {
        response = `CON ${messages.chooseSymptom[langKey]}\n`;
        for (const [key, labels] of Object.entries(symptomLabels)) {
          response += `${key}. ${labels[langKey]}\n`;
        }
        response = response.trim();
      }
    } else if (levels.length === 2) {
      // Step 3: Display feedback
      const langKey = langOptions[levels[0]];
      const symptomKey = symptomOptions[levels[1]];

      if (!langKey || !symptomKey) {
        response = `END ${
          messages.invalidSymptom[langKey] || messages.invalidSymptom["en"]
        }`;
      } else {
        const feedback = getFeedback(symptomKey, langKey);
        response = `END ${feedback}`;
      }
    } else {
      // Invalid navigation depth
      const langKey = langOptions[levels[0]] || "en";
      response = `END ${messages.invalidInput[langKey]}`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
  } catch (error) {
    console.error("USSD handler error:", error);
    res.status(500).send("END An error occurred.");
  }
};

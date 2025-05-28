import { getFeedback } from '../services/feedbackService.js';

// Simulates call state
let sessions = {};

export const handleVoiceCall = (req, res) => {
  const { isActive, sessionId, dtmfDigits } = req.body;
  let response = '';

  // Initialize session if not exists
  if (!sessions[sessionId]) {
    sessions[sessionId] = { step: 0, language: null };
  }

  const session = sessions[sessionId];

  if (isActive === '1') {
    // Step 0: Ask for language
    if (session.step === 0) {
      response = `CON Welcome to JUVO. Choose language:\n1. English\n2. Twi\n3. Fante\n4. Ewe\n5. Dagbani`;
      session.step = 1;
    }

    // Step 1: Store language and ask for symptom
    else if (session.step === 1) {
      const langOptions = {
        1: 'en',
        2: 'twi',
        3: 'fante',
        4: 'ewe',
        5: 'dagbani',
      };

      session.language = langOptions[dtmfDigits];
      if (!session.language) {
        response = 'CON Invalid language. Try again.';
        return res.send(response);
      }

      response = `CON Choose a symptom:\n1. Headache\n2. Swollen Feet\n3. Nosebleed\n4. Eye Pain\n5. Stomach Pain`;
      session.step = 2;
    }

    // Step 2: Provide feedback
    else if (session.step === 2) {
      const symptomOptions = {
        1: 'headache',
        2: 'swollen_feet',
        3: 'nosebleed',
        4: 'eye_pain',
        5: 'stomach_pain',
      };

      const symptom = symptomOptions[dtmfDigits];

      if (!symptom) {
        response = 'CON Invalid symptom. Try again.';
      } else {
        const feedback = getFeedback(symptom, session.language);
        response = `END ${feedback}`;
        delete sessions[sessionId]; // End session
      }
    }

  } else {
    // Call ended
    response = 'END Goodbye from JUVO!';
    delete sessions[sessionId];
  }

  res.send(response);
};

# JUVO: Multi-Language Health Feedback System (USSD + Voice)

JUVO is a health support system that helps users get basic health advice through **USSD and voice calls**, available in 5 local languages: English, Twi, Fante, Ewe, and Dagbani.

---

## 📦 Features

- Multi-language support
- USSD-based health menu (via mobile dial)
- Voice-based call system (IVR) using Africa’s Talking
- Structured health advice from a JSON file

---

## 📁 Project Structure

├── controllers/
│ ├── ussd.js # Handles USSD session logic
│ └── voice.js # Handles voice call session logic
├── data/
│ └── symptomFeedback.json # Stores symptom-to-feedback mapping
├── routes/
│ ├── ussd.js # USSD route
│ └── voice.js # Voice route
├── services/
│ └── feedbackService.js # Loads feedback based on symptom and language
├── index.js # Main Express app


---

## Getting Started

### 1. **Install Dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed, then:

```bash
npm install

##  Getting Started

### 2. **Run the Server**

node index.js


### USSD ###
Use a simulator (like Africa’s Talking) to test the USSD flow:


User dials your Africa's Talking sandbox USSD code (*384*12072#)

They select a preferred language

Choose a symptom from the menu

Receive health feedback in the chosen language

Testing USSD
Use the Africa's Talking USSD simulator on the sandbox dashboard

### VOICE ###
Send a POST request to /voice/voice using a tool like Postman or a live call trigger.

Sample request body:

json
Copy
Edit
{
  "isActive": "1",
  "sessionId": "abc123",
  "dtmfDigits": "1"
}

### HOW IT WORKS###
feedbackService.js pulls symptom feedback from a local .json file.

USSD and voice flows are handled separately but share the same logic and data.

Sessions are tracked to guide the user step-by-step.


## 🎥 Demo Video

Watch a demo of JUVO in action:

[▶️ Click here to watch the demo video] (https://drive.google.com/file/d/1Wm6lVxuPGbC38zQy-t_l74fKz5VFMjE3/view?usp=sharing)


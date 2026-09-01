const express = require("express");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const router = express.Router();

router.post("/pronounce", async (req, res) => {
  try {
    const { text } = req.body;

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );

    speechConfig.speechRecognitionLanguage = "en-IN";

    const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
      text,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    pronunciationConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync(result => {
      const json = result.properties.getProperty(
        sdk.PropertyId.SpeechServiceResponse_JsonResult
      );

      res.json(JSON.parse(json));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Azure pronunciation failed" });
  }
});

module.exports = router;
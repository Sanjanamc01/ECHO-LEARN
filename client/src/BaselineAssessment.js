/*this file is missing in the zip file.Its for baseline assessment.*/                                                                                                       import React, { useState, useEffect } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

const baselineWords = [
  "cup", "bed", "sit", "hot", "book", "feet", "bath", "door", "food", "nurse",
  "face", "light", "voice", "mouth", "home", "hair", "ear", "this", "measure", "jump", "ring"
];

const ipaMap = {
  "p": "p", "b": "b", "m": "m", "w": "w", "f": "f", "v": "v",
  "θ": "th", "ð": "dh", "t": "t", "d": "d", "s": "s", "z": "z",
  "n": "n", "l": "l", "r": "r", "ʃ": "sh", "ʒ": "zh", "tʃ": "ch",
  "dʒ": "j", "k": "k", "g": "g", "ŋ": "ng", "h": "h", "j": "y",
  "i": "ee", "ɪ": "ih", "eɪ": "ay", "ɛ": "eh", "æ": "a", "ɑ": "ah",
  "ɔ": "aw", "oʊ": "oh", "ʊ": "uu", "u": "oo", "ʌ": "uh", "ə": "uh",
  "ɜ": "er", "aɪ": "eye", "aʊ": "ow", "ɔɪ": "oy", "ju": "you"
};

function BaselineAssessment({ childId, onClose }) {
  const [mode, setMode] = useState("loading");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [baselineData, setBaselineData] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [phonemeBreakdown, setPhonemeBreakdown] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [expandedWord, setExpandedWord] = useState(null);

  const currentWord = baselineWords[currentIndex];
  const progress = ((currentIndex + 1) / baselineWords.length) * 100;

  // Load baseline data from server
  const loadBaselineData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/get-baseline/${childId}`);
      const data = await res.json();
      setBaselineData(data);
      
      // Check if all 21 words are completed
      if (data.length >= 21) {
        setMode("results");
      } else {
        // Load saved progress from localStorage
        const savedProgress = localStorage.getItem(`baseline_progress_${childId}`);
        if (savedProgress) {
          const progress = JSON.parse(savedProgress);
          setCurrentIndex(progress.currentIndex);
        }
        setMode("test");
      }
    } catch (err) {
      console.error("Failed to load baseline:", err);
      setMode("test");
    }
  };

  // Save progress to localStorage
  const saveProgress = (index) => {
    localStorage.setItem(`baseline_progress_${childId}`, JSON.stringify({
      currentIndex: index
    }));
  };

  useEffect(() => {
    loadBaselineData();
  }, [childId]);

  const getScoreColor = (score) => {
    if (score >= 70) return "#4caf50";
    if (score >= 45) return "#ff9800";
    return "#f44336";
  };

  const saveAttempt = async (word, score, phonemes, recognizedText) => {
    try {
      await fetch("http://localhost:5000/api/save-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId: childId,
          word: word,
          score: score,
          stars: 0,
          phonemes: phonemes,
          heard: recognizedText,
          difficulty: "easy",
          isBaseline: true
        })
      });
    } catch (err) {
      console.error("Failed to save baseline attempt:", err);
    }
  };

  const startListening = async () => {
    setIsListening(true);
    setFeedback("Listening...");

    try {
      const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
      const { key, region } = await tokenResponse.json();

      const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
      speechConfig.speechRecognitionLanguage = "en-US";

      const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
        currentWord,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
      );

      pronunciationConfig.enableProsodyAssessment = true;
      pronunciationConfig.enableMiscue = true;

      const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      pronunciationConfig.applyTo(recognizer);

      recognizer.recognizeOnceAsync(
        async (result) => {
          setIsListening(false);

          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            const json = result.properties.getProperty(
              sdk.PropertyId.SpeechServiceResponse_JsonResult
            );
            const data = JSON.parse(json);
            const nBest = data?.NBest?.[0];

            if (nBest) {
              const score = nBest?.PronunciationAssessment?.PronScore || 0;
              setOverallScore(score);
              
              let allPhonemes = [];
              let breakdown = [];
              
              if (nBest?.Words && nBest.Words.length > 0) {
                nBest.Words.forEach((word) => {
                  if (word?.Phonemes && word.Phonemes.length > 0) {
                    word.Phonemes.forEach((phoneme) => {
                      const phonemeText = phoneme?.Phoneme;
                      const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
                      
                      if (phonemeText && phonemeText.trim() !== "") {
                        allPhonemes.push({
                          sound: phonemeText,
                          score: phonemeScore,
                          errorType: phoneme?.PronunciationAssessment?.ErrorType,
                          hint: ""
                        });
                        
                        breakdown.push({
                          phoneme: phonemeText,
                          score: phonemeScore,
                          display: ipaMap[phonemeText] || phonemeText
                        });
                      }
                    });
                  }
                });
              }
              
              setPhonemeBreakdown(breakdown);

              const recognizedText = nBest.Display || currentWord;
              await saveAttempt(currentWord, score, allPhonemes, recognizedText);
              
              // Reload baseline data to get updated list
              const res = await fetch(`http://localhost:5000/api/get-baseline/${childId}`);
              const updatedData = await res.json();
              setBaselineData(updatedData);
              
              setFeedback(`Score: ${score}%`);
              
              // Auto move to next word after 1.5 seconds
              setTimeout(() => {
                if (currentIndex + 1 < baselineWords.length) {
                  const newIndex = currentIndex + 1;
                  setCurrentIndex(newIndex);
                  saveProgress(newIndex);
                  setPhonemeBreakdown([]);
                  setOverallScore(0);
                  setFeedback("");
                } else {
                  // All words completed
                  localStorage.removeItem(`baseline_progress_${childId}`);
                  setMode("results");
                  setFeedback("");
                }
              }, 3000);
            } else {
              setFeedback("Could not analyze. Try again.");
            }
          } else if (result.reason === sdk.ResultReason.NoMatch) {
            setFeedback("No speech detected. Speak clearly and try again.");
          } else {
            setFeedback("Recognition error. Try again.");
          }
          recognizer.close();
        },
        (err) => {
          setIsListening(false);
          setFeedback("Mic error. Check permissions.");
          recognizer.close();
        }
      );
    } catch (err) {
      setIsListening(false);
      setFeedback("Failed to initialize speech recognition.");
    }
  };

  const speakWord = () => {
    const utter = new SpeechSynthesisUtterance(currentWord);
    utter.lang = "en-US";
    utter.rate = 0.6;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      saveProgress(currentIndex - 1);
      setPhonemeBreakdown([]);
      setOverallScore(0);
      setFeedback("");
    }
  };

  const goToNext = () => {
    if (currentIndex + 1 < baselineWords.length) {
      setCurrentIndex(currentIndex + 1);
      saveProgress(currentIndex + 1);
      setPhonemeBreakdown([]);
      setOverallScore(0);
      setFeedback("");
    }
  };

  const isWordCompleted = (word) => {
    return baselineData.some(w => w.word === word);
  };

  const getWordScore = (word) => {
    const found = baselineData.find(w => w.word === word);
    return found ? found.score : null;
  };

  // Render loading state
  if (mode === "loading") {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
      }}>
        <div style={{ background: "white", borderRadius: 20, padding: 40 }}>
          Loading...
        </div>
      </div>
    );
  }

  // Render Results Mode (only when ALL 21 words are completed)
  if (mode === "results") {
    const avgScore = baselineData.length > 0
      ? Math.round(baselineData.reduce((sum, w) => sum + w.score, 0) / baselineData.length)
      : 0;

    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        overflowY: "auto"
      }}>
        <div style={{
          background: "white",
          borderRadius: 20,
          padding: 30,
          maxWidth: 800,
          width: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          textAlign: "center"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Baseline Assessment Results</h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#999"
              }}
            >
              ×
            </button>
          </div>

          <div style={{
            background: "#f3e5f5",
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            textAlign: "center"
          }}>
            <div style={{ fontSize: 14, color: "#666" }}>Overall Score</div>
            <div style={{ fontSize: 48, fontWeight: "bold", color: "#9b59b6" }}>{avgScore}%</div>
            <div style={{ fontSize: 12, color: "#666" }}>Words completed: {baselineData.length}/{baselineWords.length}</div>
          </div>

          <div style={{ maxHeight: 400, overflowY: "auto", textAlign: "left" }}>
            {baselineWords.map((word, idx) => {
              const completed = isWordCompleted(word);
              const score = getWordScore(word);
              const isExpanded = expandedWord === word;
              const wordData = baselineData.find(w => w.word === word);
              
              return (
                <div key={word} style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  marginBottom: 10,
                  overflow: "hidden"
                }}>
                  <div
                    onClick={() => setExpandedWord(isExpanded ? null : word)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 15px",
                      background: completed ? "#f3e5f5" : "#f5f5f5",
                      cursor: "pointer"
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold" }}>{idx + 1}. {word}</span>
                      {completed && <span style={{ marginLeft: 10, fontSize: 12, color: "#4caf50" }}>✓</span>}
                    </div>
                    <div>
                      {completed ? (
                        <span style={{
                          padding: "4px 12px",
                          background: getScoreColor(score),
                          color: "white",
                          borderRadius: 20,
                          fontSize: 14,
                          fontWeight: "bold"
                        }}>
                          {score}%
                        </span>
                      ) : (
                        <span style={{ color: "#999", fontSize: 14 }}>Not taken</span>
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && wordData && wordData.phonemes && wordData.phonemes.length > 0 && (
                    <div style={{ padding: 15, background: "#fafafa", borderTop: "1px solid #eee" }}>
                      <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>Sound breakdown:</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {wordData.phonemes.map((p, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "6px 12px",
                              background: getScoreColor(p.score),
                              color: "white",
                              borderRadius: 8,
                              fontSize: 14,
                              fontWeight: "bold"
                            }}
                          >
                            {p.display}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            style={{
              marginTop: 20,
              padding: "12px 30px",
              fontSize: 16,
              background: "#9b59b6",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Render Test Mode
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
      overflowY: "auto"
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: 30,
        maxWidth: 800,
        width: "90%",
        maxHeight: "90%",
        overflowY: "auto",
        textAlign: "center"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Baseline Assessment</h2>
          <div>
            <button
              onClick={() => setShowWordsModal(true)}
              style={{
                padding: "8px 16px",
                fontSize: 14,
                background: "#9b59b6",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginRight: 10
              }}
            >
              Show Words
            </button>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#999"
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 14, color: "#666", marginBottom: 5 }}>
            Word {currentIndex + 1} of {baselineWords.length}
          </div>
          <div style={{
            width: "100%",
            height: 8,
            background: "#eee",
            borderRadius: 4,
            overflow: "hidden"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "#9b59b6",
              transition: "width 0.3s"
            }} />
          </div>
        </div>

        {/* Current Word */}
        <div style={{
          fontSize: 48,
          padding: 30,
          background: "#eee",
          borderRadius: 15,
          display: "inline-block",
          margin: "10px 0"
        }}>
          {currentWord}
        </div>

        {/* Score after attempt */}
        {overallScore > 0 && (
          <div style={{ fontSize: 24, fontWeight: "bold", margin: "10px 0", color: getScoreColor(overallScore) }}>
            Score: {Math.round(overallScore)}%
          </div>
        )}

        {/* Phoneme Breakdown */}
        {phonemeBreakdown.length > 0 && (
          <div style={{
            margin: "15px 0",
            padding: 15,
            background: "#f8f9fa",
            borderRadius: 10,
            textAlign: "left"
          }}>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 8 }}>Sound breakdown:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {phonemeBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "8px 15px",
                    background: getScoreColor(item.score),
                    color: "white",
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {item.display}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: 15, justifyContent: "center", margin: "20px 0", flexWrap: "wrap" }}>
          <button
            onClick={startListening}
            disabled={isListening}
            style={{
              padding: "12px 25px",
              fontSize: 16,
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: isListening ? "not-allowed" : "pointer",
              opacity: isListening ? 0.6 : 1
            }}
          >
            Speak
          </button>
          <button
            onClick={speakWord}
            style={{
              padding: "12px 25px",
              fontSize: 16,
              background: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            Listen
          </button>
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              style={{
                padding: "12px 25px",
                fontSize: 16,
                background: "#7f8c8d",
                color: "white",
                border: "none",
                borderRadius: 10,
                cursor: "pointer"
              }}
            >
              Previous
            </button>
          )}
          {currentIndex + 1 < baselineWords.length && (
            <button
              onClick={goToNext}
              style={{
                padding: "12px 25px",
                fontSize: 16,
                background: "#f39c12",
                color: "white",
                border: "none",
                borderRadius: 10,
                cursor: "pointer"
              }}
            >
              Next Word
            </button>
          )}
        </div>

        {feedback && (
          <div style={{
            marginTop: 15,
            fontSize: 14,
            color: "#555",
            padding: 10,
            background: "#f8f9fa",
            borderRadius: 8
          }}>
            {feedback}
          </div>
        )}

        {/* Words Modal */}
        {showWordsModal && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2100
          }}>
            <div style={{
              background: "white",
              borderRadius: 20,
              padding: 25,
              maxWidth: 500,
              width: "90%",
              maxHeight: "80%",
              overflowY: "auto"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <h3 style={{ margin: 0 }}>All Words</h3>
                <button
                  onClick={() => setShowWordsModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 20,
                    cursor: "pointer"
                  }}
                >
                  ×
                </button>
              </div>
              {baselineWords.map((word, idx) => {
                const completed = isWordCompleted(word);
                const score = getWordScore(word);
                return (
                  <div key={word} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    borderBottom: "1px solid #eee"
                  }}>
                    <span>{idx + 1}. {word}</span>
                    {completed ? (
                      <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                        {score}% ✓
                      </span>
                    ) : (
                      <span style={{ color: "#999" }}>Pending</span>
                    )}
                  </div>
                );
              })}
              <button
                onClick={() => setShowWordsModal(false)}
                style={{
                  marginTop: 15,
                  padding: "8px 20px",
                  background: "#9b59b6",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BaselineAssessment;
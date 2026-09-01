
// // // import React, { useEffect, useState } from "react";
// // // import * as sdk from "microsoft-cognitiveservices-speech-sdk";
// // // import practiceDataset from "../data/practiceDataset";
// // // import ProgressPage from "./ProgressPage";
// // // import wordBreakdown from "./wordBreakdown"



// // // function PracticeMode({ onBack }) {

// // // // Make sure your ipaMap covers all common sounds
// // // const ipaMap = {
// // //   "w": "w",
// // //   "ɔ": "aw",
// // //   "t": "t",
// // //   "ə": "uh",
// // //   "r": "r",
// // //   "ɑ": "ah",
// // //   "i": "ee",
// // //   "u": "oo",
// // //   "ɛ": "eh",
// // //   "ʌ": "uh",
// // //   "θ": "th (soft)",
// // //   "ð": "th (hard)",
// // //   "ʃ": "sh",
// // //   "ʒ": "zh",
// // //   "tʃ": "ch",
// // //   "dʒ": "j",
// // //   "ŋ": "ng",
// // //   "ɪ": "ih",
// // //   "ʊ": "uu",
// // //   "æ": "a",
// // //   "ɜ": "er",
// // //   "eɪ": "ay",
// // //   "aɪ": "eye",
// // //   "oʊ": "oh",
// // //   "aʊ": "ow",
// // //   "ɔɪ": "oy",
// // //   "ju": "you"
// // // };



// // // // Enhanced phoneme hints
// // // const phonemeHints = {
// // //   "w": "Round your lips like you're blowing a bubble!",
// // //   "ɔ": "Open your mouth wide like a surprised puppy!",
// // //   "t": "Tap your tongue quickly behind your top teeth!",
// // //   "ə": "Relax your mouth like you're thinking 'uh...'",
// // //   "r": "Curl your tongue up like a roaring lion!",
// // //   "s": "Smile and let air hiss out like a snake!",
// // //   "z": "Buzz like a happy bee!",
// // //   "p": "Pop your lips like a tiny bubble!",
// // //   "b": "Pop your lips with your voice turned on!",
// // //   "k": "Say it from the back of your mouth like a cough!",
// // //   "g": "Say it from your throat like a gulping sound!",
// // //   "f": "Bite your bottom lip gently and blow!",
// // //   "v": "Bite your bottom lip and buzz!",
// // //   "l": "Lift your tongue to the roof of your mouth!",
// // //   "m": "Close your lips and hum like you're thinking!",
// // //   "n": "Put your tongue up and let air out your nose!",
// // //   "θ": "Stick your tongue out just a little and blow!",
// // //   "ð": "Stick your tongue out and buzz!",
// // //   "ʃ": "Round your lips and say 'shhh' like quiet!",
// // //   "ʒ": "Make a buzzing sound like a gentle bee!",
// // //   "tʃ": "Say it quick like a choo-choo train!",
// // //   "dʒ": "Bounce it like in 'jump'!",
// // //   "ŋ": "Let the sound come out your nose like 'sing'!",
// // //   "ɪ": "Quick short sound like in 'sit'!",
// // //   "i": "Smile wide and say 'ee' like in 'see'!",
// // //   "u": "Pucker your lips like a monkey!",
// // //   "ʊ": "Short sound like in 'book'!",
// // //   "æ": "Open wide like a cat saying 'meow'!",
// // //   "ɜ": "Thinking sound like 'er...'!",
// // //   "eɪ": "Smile and slide into 'ay' like in 'play'!",
// // //   "aɪ": "Open wide and say 'eye' like in 'my'!",
// // //   "oʊ": "Round your lips and say 'oh' like in 'go'!",
// // //   "aʊ": "Say 'ow' like you just bumped your toe!",
// // //   "ɔɪ": "Say 'oy' like in 'toy'!",
// // //   "ju": "Say 'you' like you're pointing at someone!"
// // // };


// // //   useEffect(() => {
// // //     window.speechSynthesis.getVoices();
// // //   }, []);

// // //   const [mode, setMode] = useState("words");
// // //   const [words, setWords] = useState([]);
// // //   const [index, setIndex] = useState(0);
// // //   const [feedback, setFeedback] = useState("");
// // //   const [stars, setStars] = useState(0);
// // //   const [difficulty, setDifficulty] = useState("easy");
// // //   const [showProgress, setShowProgress] = useState(false);
// // //   const [practiceHistory, setPracticeHistory] = useState([]);
// // //  const [showSidebar, setShowSidebar] = useState(false);
// // // const [wordProgress, setWordProgress] = useState({}); // Track scores for each word
// // // const [phonemeBreakdown, setPhonemeBreakdown] = useState([]);
// // //   useEffect(() => {
// // //     const list = practiceDataset?.[mode]?.[difficulty] || [];
// // //     setWords(list);
// // //     setIndex(0);
// // //   }, [mode, difficulty]);

// // //   const currentWord = words[index];

// // //   // Add this function to update word progress
// // // const updateWordProgress = (word, score) => {
// // //   setWordProgress(prev => ({
// // //     ...prev,
// // //     [word]: {
// // //       score: score,
// // //       lastPracticed: new Date().toLocaleString(),
// // //       stars: calculateStars(score)
// // //     }
// // //   }));
// // // };

// // //   const calculateStars = (score) => {
// // //     if (score === 100) return 3;
// // //     if (score >= 70) return 2;
// // //     if (score >= 40) return 1;
// // //     return 0;
// // //   };

// // //   const nextWord = () => {
// // //     if (index < words.length - 1) {
// // //       setIndex(index + 1);
// // //       setFeedback("");
// // //       setStars(0);
// // //     }
// // //   };

// // //   const prevWord = () => {
// // //     if (index > 0) {
// // //       setIndex(index - 1);
// // //       setFeedback("");
// // //       setStars(0);
// // //     }
// // //   };

// // //   const saveToHistory = (word, score, stars, phonemeDetails, recognizedText) => {
// // //   const newEntry = {
// // //     id: Date.now(), // unique ID
// // //     word: word,
// // //     score: score,
// // //     stars: stars,
// // //     phonemes: phonemeDetails,
// // //     heard: recognizedText,
// // //     timestamp: new Date().toLocaleString(),
// // //     date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
// // //   };
  
// // //   setPracticeHistory(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50 entries
// // // };

// // // //deepseek 2
// // //   const startListening = async () => {
// // //   if (!currentWord) return;

// // //   setFeedback(" Listening...");

// // //   try {
// // //     const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
// // //     const { key, region } = await tokenResponse.json();

// // //     const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
// // //     speechConfig.speechRecognitionLanguage = "en-US"; // Try US English first for better support

// // //     // Create pronunciation assessment config
// // //     const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
// // //       currentWord.text,
// // //       sdk.PronunciationAssessmentGradingSystem.HundredMark,
// // //       sdk.PronunciationAssessmentGranularity.Phoneme, // This should enable phoneme-level
// // //       true // Enable miscue
// // //     );
    
// // //     // Important: Set the pronunciation assessment parameters
// // //     pronunciationConfig.enableProsodyAssessment = true; // Add this for better assessment
// // //     pronunciationConfig.enableMiscue = true; // Add this for mispronunciation detection
    
// // //     const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
// // //     const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    
// // //     // Apply pronunciation config to recognizer
// // //     pronunciationConfig.applyTo(recognizer);

// // //     recognizer.recognizeOnceAsync(
// // //       (result) => {
// // //         console.log("Full result:", result); // Log to see what's coming back

// // //         if (result.reason === sdk.ResultReason.RecognizedSpeech) {
// // //           // Get the detailed JSON result
// // //           const json = result.properties.getProperty(
// // //             sdk.PropertyId.SpeechServiceResponse_JsonResult
// // //           );
          
// // //           console.log("Pronunciation JSON:", json); // Log to see the structure
          
// // //           try {
// // //             const data = JSON.parse(json);
            
// // //             // The pronunciation assessment data is usually in NBest[0]
// // //             const nBest = data?.NBest?.[0];
            
// // //             if (nBest) {
// // //               // Get overall score
// // //               const overallScore = nBest?.PronunciationAssessment?.AccuracyScore || 0;
// // //               setStars(calculateStars(overallScore));
              
// // //               // Check if we have phoneme-level data
// // //               if (nBest?.Words && nBest.Words.length > 0) {
// // //                 let detailedFeedback = `Score: ${overallScore}%\n\n`;

// // //                 // ADD THIS LINE HERE 👇
// // //   let allPhonemes = [];  // <-- ADD THIS
                
// // //                 nBest.Words.forEach((word) => {
// // //                   if (word?.Phonemes && word.Phonemes.length > 0) {
// // //                     word.Phonemes.forEach((phoneme) => {
// // //                       const phonemeText = phoneme?.Phoneme;
// // //                       const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
// // //                       const errorType = phoneme?.PronunciationAssessment?.ErrorType;
                      
// // //                       // Skip if no valid phoneme
// // //                       if (!phonemeText || phonemeText.trim() === "") return;

// // //                         // ADD THIS CODE HERE 👇 (inside the phoneme loop)
// // //         // Save phoneme data for history
// // //         allPhonemes.push({
// // //           sound: phonemeText,
// // //           score: phonemeScore,
// // //           errorType: errorType,
// // //           hint: phonemeHints[phonemeText] || "Keep practicing!"
// // //         });
                      
// // //                       // Check for pronunciation issues
// // //                       if (errorType !== "None" || phonemeScore < 70) {
// // //                         const readablePhoneme = ipaMap[phonemeText] || phonemeText;
                       
// // //                         detailedFeedback += ` pronunciation: ${readablePhoneme} (${Math.round(phonemeScore)}%)\n`;
                        
// // //                         // Provide hint if available
// // //                         if (phonemeHints[phonemeText]) {
// // //                           detailedFeedback += ` Tip: ${phonemeHints[phonemeText]}\n`;
// // //                         }
                        
// // //                         // Add specific error type info
// // //                         if (errorType && errorType !== "None") {
// // //                           detailedFeedback += `   Error: ${errorType}\n`;
// // //                         }
                        
// // //                         detailedFeedback += "\n";
// // //                       }
// // //                     });
// // //                   }
// // //                 });
                
// // //               // Create breakdown data for display
// // // let breakdown = [];
// // // nBest.Words.forEach((word) => {
// // //   if (word?.Phonemes && word.Phonemes.length > 0) {
// // //     word.Phonemes.forEach((phoneme) => {
// // //       const phonemeText = phoneme?.Phoneme;
// // //       const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
      
// // //       if (phonemeText && phonemeText.trim() !== "") {
// // //         breakdown.push({
// // //           phoneme: phonemeText,
// // //           score: phonemeScore,
// // //           display: ipaMap[phonemeText] || phonemeText
// // //         });
// // //       }
// // //     });
// // //   }
// // // });
// // // setPhonemeBreakdown(breakdown);
// // // updateWordProgress(currentWord.text, overallScore);

// // // // Build the feedback message with phoneme details
// // // let mainFeedback = `Score: ${overallScore}%\n\n`;

// // // // Count how many weak sounds we found
// // // let weakCount = 0;
// // // nBest.Words.forEach((word) => {
// // //   if (word?.Phonemes && word.Phonemes.length > 0) {
// // //     word.Phonemes.forEach((phoneme) => {
// // //       const phonemeText = phoneme?.Phoneme;
// // //       const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
// // //       const errorType = phoneme?.PronunciationAssessment?.ErrorType;
      
// // //       if (!phonemeText || phonemeText.trim() === "") return;
      
  
// // // if (phonemeScore < 70 || (errorType && errorType !== "None")) {
// // //   const readablePhoneme = ipaMap[phonemeText] || phonemeText;
  
// // //   detailedFeedback += `pronunciation: ${readablePhoneme} (${Math.round(phonemeScore)}%)\n`;
  
// // //   // Provide hint if available
// // //   if (phonemeHints[phonemeText]) {
// // //     detailedFeedback += ` Tip: ${phonemeHints[phonemeText]}\n`;
// // //   }
  
// // //   detailedFeedback += "\n";
// // // }
// // // // Don't show anything for good pronunciations (score >= 70 and errorType is "None")
// // //     });
// // //   }
// // // });

// // // // If no weak sounds, show perfect message
// // // if (weakCount === 0) {
// // //   if (overallScore >= 80) {
// // //     mainFeedback = `Score: ${overallScore}%\n🌟 Perfect pronunciation! All sounds were great!`;
// // //   } else {
// // //     mainFeedback = `Score: ${overallScore}%\n👍 Good job! Keep practicing!`;
// // //   }
// // // }

// // // setFeedback(mainFeedback);
// // //                 // ADD THESE LINES HERE 👇 (right before setFeedback)
// // // // Save to history
// // // const recognizedText = nBest.Display || currentWord.text;
// // // saveToHistory(
// // //   currentWord.text,
// // //   overallScore,
// // //   calculateStars(overallScore),
// // //   allPhonemes,
// // //   recognizedText
// // // );
// // //                 setFeedback(detailedFeedback);
// // //               } else {
// // //                 // No phoneme data available
// // //                 setFeedback(`Score: ${overallScore}%\n\nPhoneme details not available. Try speaking more clearly.`);
// // //               }
// // //             } else {
// // //               setFeedback("Couldn't analyze pronunciation. Try again.");
// // //             }
// // //           } catch (parseError) {
// // //             console.error("JSON parse error:", parseError);
// // //             setFeedback("Error analyzing pronunciation data.");
// // //           }
// // //         } else if (result.reason === sdk.ResultReason.NoMatch) {
// // //           setFeedback("No speech detected. Speak clearly and try again.");
// // //         } else {
// // //           setFeedback("Recognition error. Try again.");
// // //         }
        
// // //         recognizer.close();
// // //       },
// // //       (err) => {
// // //         console.error("Recognition error:", err);
// // //         setFeedback("Mic error occurred. Check microphone permissions.");
// // //         recognizer.close();
// // //       }
// // //     );

// // //   } catch (err) {
// // //     console.error("Azure setup error:", err);
// // //     setFeedback("Failed to initialize speech recognition.");
// // //   }
// // // };

// // //   const speakWord = (word) => {
// // //     const utter = new SpeechSynthesisUtterance(word);
// // //     utter.lang = "en-IN";
// // //     utter.rate = 0.6;
// // //     utter.pitch = 1;

// // //     const voices = window.speechSynthesis.getVoices();
// // //     const indianVoice = voices.find(v => v.lang === "en-IN");

// // //     if (indianVoice) {
// // //       utter.voice = indianVoice;
// // //     }

// // //     window.speechSynthesis.cancel();
// // //     window.speechSynthesis.speak(utter);
// // //   };

// // //   return (
// // //     <div style={{ textAlign: "center", marginTop: 80 }}>
// // //       <h1>Practice Speech</h1>

// // //       <div style={{ marginBottom: 30 }}>
// // //         <button
// // //           onClick={() => setMode("words")}
// // //           style={{
// // //             padding: "10px 25px",
// // //             marginRight: 10,
// // //             background: mode === "words" ? "#3498db" : "#ccc",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: 8
// // //           }}
// // //         >
// // //           Words
// // //         </button>

// // //         <button
// // //           onClick={() => setMode("sentences")}
// // //           style={{
// // //             padding: "10px 25px",
// // //             background: mode === "sentences" ? "#3498db" : "#ccc",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: 8
// // //           }}
// // //         >
// // //           Sentences
// // //         </button>
// // //       </div>

      

// // //       <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
// // //   <select
// // //     value={difficulty}
// // //     onChange={(e) => setDifficulty(e.target.value)}
// // //     style={{
// // //       padding: "10px 20px",
// // //       fontSize: 16,
// // //       borderRadius: 8
// // //     }}
// // //   >
// // //     <option value="easy">Easy</option>
// // //     <option value="medium">Medium</option>
// // //     <option value="hard">Hard</option>
// // //   </select>
  
// // //   <button
// // //     onClick={() => setShowSidebar(!showSidebar)}
// // //     style={{
// // //       padding: "10px 20px",
// // //       fontSize: 16,
// // //       background: showSidebar ? "#e74c3c" : "#3498db",
// // //       color: "white",
// // //       border: "none",
// // //       borderRadius: 8,
// // //       cursor: "pointer",
// // //       display: 'flex',
// // //       alignItems: 'center',
// // //       gap: '5px'
// // //     }}
// // //   >
// // //     {showSidebar ? "✖️ Close List" : "📋 Show Word List"}
// // //   </button>
// // // </div>

// // //       <div
// // //         style={{
// // //           fontSize: 40,
// // //           padding: 30,
// // //           background: "#eee",
// // //           borderRadius: 15,
// // //           display: "inline-block"
// // //         }}
// // //       >
// // //         {currentWord ? currentWord.text : "Loading..."}

// // //         <div style={{ fontSize: 30, marginTop: 10 }}>
// // //           {"⭐".repeat(stars)}
// // //         </div>
// // //       </div>

// // //       <br />{/* Sidebar for word list */}
// // // {showSidebar && (
// // //   <div style={{
// // //     position: 'fixed',
// // //     top: 0,
// // //     left: 0,
// // //     width: '300px',
// // //     height: '100vh',
// // //     background: 'white',
// // //     boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
// // //     padding: '20px',
// // //     overflowY: 'auto',
// // //     zIndex: 1000,
// // //     textAlign: 'left'
// // //   }}>
// // //     <div style={{
// // //       display: 'flex',
// // //       justifyContent: 'space-between',
// // //       alignItems: 'center',
// // //       marginBottom: '20px',
// // //       borderBottom: '2px solid #eee',
// // //       paddingBottom: '10px'
// // //     }}>
// // //       <h3 style={{ margin: 0, color: '#333' }}>
// // //         {mode === 'words' ? '📝 Word List' : '📚 Sentence List'}
// // //         <span style={{ fontSize: '14px', marginLeft: '10px', color: '#666' }}>
// // //           ({words.length} items)
// // //         </span>
// // //       </h3>
// // //       <button
// // //         onClick={() => setShowSidebar(false)}
// // //         style={{
// // //           background: 'none',
// // //           border: 'none',
// // //           fontSize: '20px',
// // //           cursor: 'pointer',
// // //           color: '#666'
// // //         }}
// // //       >
// // //         ✖️
// // //       </button>
// // //     </div>
    
// // //     {/* Filter by difficulty inside sidebar */}
// // //     <div style={{ marginBottom: '15px' }}>
// // //       <label style={{ fontSize: '14px', color: '#666' }}>Filter:</label>
// // //       <select
// // //         value={difficulty}
// // //         onChange={(e) => {
// // //           setDifficulty(e.target.value);
// // //           setIndex(0);
// // //         }}
// // //         style={{
// // //           width: '100%',
// // //           padding: '8px',
// // //           marginTop: '5px',
// // //           borderRadius: '5px',
// // //           border: '1px solid #ddd'
// // //         }}
// // //       >
// // //         <option value="easy">Easy</option>
// // //         <option value="medium">Medium</option>
// // //         <option value="hard">Hard</option>
// // //       </select>
// // //     </div>
    
// // //     {/* Word/Sentence List */}
// // //     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
// // //       {words.map((item, idx) => {
// // //         const wordText = item.text;
// // //         const progress = wordProgress[wordText];
        
// // //         return (
// // //           <div
// // //             key={idx}
// // //             onClick={() => {
// // //               setIndex(idx);
// // //               setShowSidebar(false); // Close sidebar after selection
// // //             }}
// // //             style={{
// // //               padding: '12px',
// // //               borderRadius: '8px',
// // //               cursor: 'pointer',
// // //               backgroundColor: idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white',
// // //               border: idx === index ? '2px solid #2196f3' : '1px solid #ddd',
// // //               transition: 'all 0.2s',
// // //               display: 'flex',
// // //               justifyContent: 'space-between',
// // //               alignItems: 'center'
// // //             }}
// // //             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f4fd'}
// // //             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white'}
// // //           >
// // //             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
// // //               <span style={{ color: '#666', fontSize: '14px' }}>{idx + 1}.</span>
// // //               <span style={{ fontWeight: idx === index ? 'bold' : 'normal' }}>
// // //                 {wordText}
// // //               </span>
// // //             </div>
            
// // //             {/* Progress indicator */}
// // //             {progress && (
// // //               <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
// // //                 <span style={{ fontSize: '14px', color: '#666' }}>
// // //                   {progress.score}%
// // //                 </span>
// // //                 <span style={{ color: '#f1c40f' }}>
// // //                   {"⭐".repeat(progress.stars)}
// // //                 </span>
// // //               </div>
// // //             )}
            
// // //             {/* New indicator */}
// // //             {!progress && (
// // //               <span style={{
// // //                 fontSize: '12px',
// // //                 padding: '2px 6px',
// // //                 background: '#4caf50',
// // //                 color: 'white',
// // //                 borderRadius: '3px'
// // //               }}>
// // //                 New
// // //               </span>
// // //             )}
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
    
// // //     {/* Stats summary */}
// // //     <div style={{
// // //       marginTop: '20px',
// // //       padding: '15px',
// // //       background: '#f8f9fa',
// // //       borderRadius: '8px',
// // //       borderTop: '2px solid #eee'
// // //     }}>
// // //       <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📊 Progress Summary</h4>
// // //       <div style={{ fontSize: '14px' }}>
// // //         <div>Total words: {words.length}</div>
// // //         <div>Practiced: {Object.keys(wordProgress).filter(w => 
// // //           words.some(item => item.text === w)
// // //         ).length}</div>
// // //         <div>New: {words.length - Object.keys(wordProgress).filter(w => 
// // //           words.some(item => item.text === w)
// // //         ).length}</div>
// // //       </div>
      
// // //       {/* Progress bar */}
// // //       <div style={{
// // //         marginTop: '10px',
// // //         height: '8px',
// // //         background: '#e0e0e0',
// // //         borderRadius: '4px',
// // //         overflow: 'hidden'
// // //       }}>
// // //         <div style={{
// // //           width: `${(Object.keys(wordProgress).filter(w => 
// // //             words.some(item => item.text === w)
// // //           ).length / words.length) * 100}%`,
// // //           height: '100%',
// // //           background: '#4caf50',
// // //           transition: 'width 0.3s'
// // //         }} />
// // //       </div>
// // //     </div>
// // //   </div>
// // // )}
// // // {/* Overlay when sidebar is open */}
// // // {showSidebar && (
// // //   <div
// // //     onClick={() => setShowSidebar(false)}
// // //     style={{
// // //       position: 'fixed',
// // //       top: 0,
// // //       left: 0,
// // //       right: 0,
// // //       bottom: 0,
// // //       background: 'rgba(0,0,0,0.5)',
// // //       zIndex: 999
// // //     }}
// // //   />
// // // )}


// // //       <button
// // //         onClick={startListening}
// // //         style={{
// // //           marginTop: 20,
// // //           padding: "15px 35px",
// // //           fontSize: 20,
// // //           background: "#3498db",
// // //           color: "white",
// // //           border: "none",
// // //           borderRadius: 10
// // //         }}
// // //       >
// // //         Speak
// // //       </button>

// // //       <button
// // //         onClick={() => currentWord && speakWord(currentWord.text)}
// // //         style={{
// // //           marginTop: 20,
// // //           padding: "15px 35px",
// // //           fontSize: 20,
// // //           background: "#2ecc71",
// // //           color: "white",
// // //           border: "none",
// // //           borderRadius: 10
// // //         }}
// // //       >
// // //         🔊 Listen
// // //       </button>

// // //    {/* Feedback Text - Your existing feedback */}
// // // {/* Feedback Text */}
// // // <div
// // //   style={{
// // //     marginTop: 20,
// // //     fontSize: 18,
// // //     whiteSpace: "pre-wrap",
// // //     textAlign: "left",
// // //     maxWidth: 800,
// // //     marginInline: "auto"
// // //   }}
// // // >
// // //   {feedback}
// // // </div>

// // // {/* ADD THIS - Color-coded breakdown */}
// // // <wordBreakdown 
// // //   word={currentWord?.text} 
// // //   phonemeData={phonemeBreakdown} 
// // // />

// // //       <div style={{ marginTop: 20 }}>
// // //         <button
// // //           onClick={prevWord}
// // //           style={{
// // //             marginRight: 15,
// // //             padding: "12px 30px",
// // //             fontSize: 18,
// // //             background: "#7f8c8d",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: 10
// // //           }}
// // //         >
// // //           Previous
// // //         </button>


// // //         <button onClick={async () => {
// // //   const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
// // //   console.log("Token response:", tokenResponse);
// // //   const { key, region } = await tokenResponse.json();
// // //   console.log("Azure config:", { key: key?.substring(0,5) + "...", region });
// // // }}>
// // //   Test Azure Connection
// // // </button>

// // //         <button
// // //           onClick={nextWord}
// // //           style={{
// // //             padding: "12px 30px",
// // //             fontSize: 18,
// // //             background: "#f39c12",
// // //             color: "white",
// // //             border: "none",
// // //             borderRadius: 10
// // //           }}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>

// //       <br /><br />

// //        <button 
// //   onClick={() => setShowProgress(!showProgress)}  // Changed this line
// //   style={{
// //     marginLeft: 15,
// //     padding: "12px 30px",
// //     fontSize: 18,
// //     background: "#9b59b6",
// //     color: "white",
// //     border: "none",
// //     borderRadius: 25,
// //     cursor: "pointer"
// //   }}
// // >
// //   {showProgress ? "Close Progress" : "📊 My Progress"}  {/* Changed this line */}
// // </button>

// //       <button onClick={onBack}>Back</button>

// //           {/* STEP 6: Add this conditional rendering */}
// //       {showProgress && (
// //         <ProgressPage 
// //           onBack={() => setShowProgress(false)} 
// //           historyData={practiceHistory}
// //         />
// //       )}


// //     </div>



// //   );
// // }

// // export default PracticeMode;





//phonem+static images(BEST)

import React, { useEffect, useState } from "react";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import practiceDataset from "../data/practiceDataset";
import ProgressPage from "./ProgressPage";


function PracticeMode({ onBack ,childId}) {





  

// Make sure your ipaMap covers all common sounds
const ipaMap = {
  // Consonants (24)
  "p": "p",
  "b": "b",
  "m": "m",
  "w": "w",
  "f": "f",
  "v": "v",
  "θ": "th (soft)",
  "ð": "th (hard)",
  "t": "t",
  "d": "d",
  "s": "s",
  "z": "z",
  "n": "n",
  "l": "l",
  "r": "r",
  "ʃ": "sh",
  "ʒ": "zh",
  "tʃ": "ch",
  "dʒ": "j",
  "k": "k",
  "g": "g",
  "ŋ": "ng",
  "h": "h",
  "j": "y",
  
  // Vowels (12)
  "i": "ee",
  "ɪ": "ih",
  "eɪ": "ay",
  "ɛ": "eh",
  "æ": "a",
  "ɑ": "ah",
  "ɔ": "aw",
  "oʊ": "oh",
  "ʊ": "uu",
  "u": "oo",
  "ʌ": "uh",
  "ə": "uh",
  
  // R-colored vowels (2)
  "ɜ": "er",
  "ɝ": "er",
  
  // Diphthongs (6)
  "aɪ": "eye",
  "aʊ": "ow",
  "ɔɪ": "oy",
  "ju": "you"
};

// Enhanced phoneme hints
const phonemeHints = {
  // Consonants
  "p": "Pop your lips like a tiny bubble!",
  "b": "Pop your lips with your voice turned on!",
  "m": "Close your lips and hum like you're thinking!",
  "w": "Round your lips like you're blowing a bubble!",
  "f": "Bite your bottom lip gently and blow!",
  "v": "Bite your bottom lip and buzz!",
  "θ": "Stick your tongue out just a little and blow!",
  "ð": "Stick your tongue out and buzz!",
  "t": "Tap your tongue quickly behind your top teeth!",
  "d": "Tap your tongue with your voice turned on!",
  "s": "Smile and let air hiss out like a snake!",
  "z": "Buzz like a happy bee!",
  "n": "Put your tongue up and let air out your nose!",
  "l": "Lift your tongue to the roof of your mouth!",
  "r": "Curl your tongue up like a roaring lion!",
  "ʃ": "Round your lips and say 'shhh' like quiet!",
  "ʒ": "Make a buzzing sound like a gentle bee!",
  "tʃ": "Say it quick like a choo-choo train!",
  "dʒ": "Bounce it like in 'jump'!",
  "k": "Say it from the back of your mouth like a cough!",
  "g": "Say it from your throat like a gulping sound!",
  "ŋ": "Let the sound come out your nose like 'sing'!",
  "h": "Breathe out like you're fogging a window!",
  "j": "Smile and say 'y' like in 'yes'!",
  
  // Vowels
  "i": "Smile wide and say 'ee' like in 'see'!",
  "ɪ": "Quick short sound like in 'sit'!",
  "eɪ": "Smile and slide into 'ay' like in 'play'!",
  "ɛ": "Open your mouth like in 'bed'!",
  "æ": "Open wide like a cat saying 'meow'!",
  "ɑ": "Open your mouth wide like at the doctor!",
  "ɔ": "Round your lips like in 'law'!",
  "oʊ": "Round your lips and say 'oh' like in 'go'!",
  "ʊ": "Short sound like in 'book'!",
  "u": "Pucker your lips like a monkey!",
  "ʌ": "Relaxed sound like in 'cup'!",
  "ə": "Relax your mouth like you're thinking 'uh...'",
  
  // R-colored vowels
  "ɜ": "Thinking sound like 'er...'!",
  "ɝ": "Thinking sound like 'er...'!",
  
  // Diphthongs
  "aɪ": "Open wide and say 'eye' like in 'my'!",
  "aʊ": "Say 'ow' like you just bumped your toe!",
  "ɔɪ": "Say 'oy' like in 'toy'!",
  "ju": "Say 'you' like you're pointing at someone!"
};


// Mouth images mapping - using local files from public folder
const mouthImages = {
  // Consonants
  "p": "/mouth-shapes/p.png",
  "b": "/mouth-shapes/b.png",
  "m": "/mouth-shapes/m.png",
  "w": "/mouth-shapes/w.png",
  "f": "/mouth-shapes/f.png",
  "v": "/mouth-shapes/v.png",
  "th": "/mouth-shapes/th-soft.png",
  "ð": "/mouth-shapes/th-hard.png",
  "t": "/mouth-shapes/t.png",
  "d": "/mouth-shapes/d.png",
  "s": "/mouth-shapes/s.png",
  "z": "/mouth-shapes/z.png",
  "n": "/mouth-shapes/n.png",
  "l": "/mouth-shapes/l.png",
  "r": "/mouth-shapes/r.png",
  "er": "/mouth-shapes/r.png",
  "sh": "/mouth-shapes/sh.png",
  "ʒ": "/mouth-shapes/zh.png",
  "tʃ": "/mouth-shapes/ch.png",
  "jh": "/mouth-shapes/j.png",
  "k": "/mouth-shapes/k.png",
  "g": "/mouth-shapes/g.png",
  "ŋ": "/mouth-shapes/ng.png",
  "h": "/mouth-shapes/h.png",
  "j": "/mouth-shapes/j.png",
  "ae": "/mouth-shapes/ah.png",
  "ax": "/mouth-shapes/ah.png",
  "ih": "/mouth-shapes/eye.png",
  // Vowels
  "i": "/mouth-shapes/ee.png",
  "ɪ": "/mouth-shapes/ih.png",
  "eɪ": "/mouth-shapes/ay.png",
  "ɛ": "/mouth-shapes/eh.png",
  "ey": "/mouth-shapes/eh.png",
  "aa": "/mouth-shapes/a.png",
  "ah": "/mouth-shapes/ah.png",
  "ao": "/mouth-shapes/ah.png",
  "ɔ": "/mouth-shapes/aw.png",
  "oʊ": "/mouth-shapes/oh.png",
  "ʊ": "/mouth-shapes/uu.png",
  "u": "/mouth-shapes/oo.png",
  "ow": "/mouth-shapes/oh.png",
  "ʌ": "/mouth-shapes/uh.png",
  "ə": "/mouth-shapes/uh.png",
  "iy":"/mouth-shapes/eye.png",
    "eh":"/mouth-shapes/eh.png",
    "ng":"/mouth-shapes/ng.png",
  
  
  // R-colored vowels
  "ɜ": "/mouth-shapes/er.png",
  "ɝ": "/mouth-shapes/er.png",
  
  // Diphthongs
  "aɪ": "/mouth-shapes/eye.png",
  "aʊ": "/mouth-shapes/ow.png",
  "ɔɪ": "/mouth-shapes/oi.png",
  "ju": "/mouth-shapes/you.png"
};
// Default image for missing ones
const defaultMouthImage = "/mouth-shapes/default.png";


const mouthVideos = {
  // Consonants
  "p": "/video-mouths/p.mp4",
  "b": "/video-mouths/b.mp4",
  "m": "/video-mouths/m.mp4",
  "w": "/video-mouths/w.mp4",
  "f": "/video-mouths/f.mp4",
  "v": "/video-mouths/v.mp4",
  "θ": "/video-mouths/th.mp4",
  "ð": "/video-mouths/th.mp4",
  "t": "/video-mouths/t.mp4",
  "d": "/video-mouths/d.mp4",
  "s": "/video-mouths/s.mp4",
  "z": "/video-mouths/z.mp4",
  "n": "/video-mouths/n.mp4",
  "l": "/video-mouths/l.mp4",
  "r": "/video-mouths/r.mp4",
  "sh": "/video-mouths/sh.mp4",
  "ʒ": "/video-mouths/zh.mp4",
  "tʃ": "/video-mouths/ch.mp4",
  "jh": "/video-mouths/jh.mp4",
  "k": "/video-mouths/k.mp4",
  "g": "/video-mouths/g.mp4",
  "ng": "/video-mouths/ng.mp4",
  "h": "/video-mouths/h.mp4",
  "j": "/video-mouths/y.mp4",
  
  // Vowels
  "iy": "/video-mouths/iy.mp4",
  "ih": "/video-mouths/ih.mp4",
  "ey": "/video-mouths/ey.mp4",
  "eh": "/video-mouths/eh.mp4",
  "ae": "/video-mouths/ae.mp4",
  "aa": "/video-mouths/aa.mp4",
  "ao": "/video-mouths/ao.mp4",
  "ow": "/video-mouths/ow.mp4",
  "ʊ": "/video-mouths/uh.mp4",
  "u": "/video-mouths/uw.mp4",
  "ah": "/video-mouths/ah.mp4",
  "ax": "/video-mouths/ax.mp4",
  
  // R-colored vowels
  "ɜ": "/video-mouths/er.mp4",
  "ɝ": "/video-mouths/er.mp4",
  
  // Diphthongs
  "aɪ": "/video-mouths/ay.mp4",
  "aʊ": "/video-mouths/aw.mp4",
  "ɔɪ": "/video-mouths/oy.mp4",
  "ju": "/video-mouths/uw.mp4"
};

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const [mode, setMode] = useState("words");
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [stars, setStars] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [showProgress, setShowProgress] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [wordProgress, setWordProgress] = useState({});
  const [phonemeBreakdown, setPhonemeBreakdown] = useState([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const list = practiceDataset?.[mode]?.[difficulty] || [];
    setWords(list);
    setIndex(0);
  }, [mode, difficulty]);

  // Load history from database when component mounts or childId changes
useEffect(() => {
  const loadHistory = async () => {
    if (!childId) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/get-history/${childId}`);
      const history = await response.json();
      
      if (Array.isArray(history) && history.length > 0) {
        // Convert MongoDB format to match your existing state format
        const formattedHistory = history.map(entry => ({
          id: entry._id,
          word: entry.word,
          score: entry.score,
          stars: entry.stars,
          phonemes: entry.phonemes,
          heard: entry.heard,
          timestamp: new Date(entry.timestamp).toLocaleString(),
          date: entry.date
        }));
        setPracticeHistory(formattedHistory);
      }
    } catch (error) {
      console.error("Failed to load history from database:", error);
    }
  };
  
  loadHistory();
}, [childId]);

  const currentWord = words[index];

  const updateWordProgress = (word, score) => {
    setWordProgress(prev => ({
      ...prev,
      [word]: {
        score: score,
        lastPracticed: new Date().toLocaleString(),
        stars: calculateStars(score)
      }
    }));
  };

  const calculateStars = (score) => {
    if (score === 100) return 3;
    if (score >= 70) return 2;
    if (score >= 40) return 1;
    return 0;
  };

  const nextWord = () => {
    if (index < words.length - 1) {
      setIndex(index + 1);
      setFeedback("");
      setStars(0);
      setPhonemeBreakdown([]);
    }
  };

  const prevWord = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFeedback("");
      setStars(0);
      setPhonemeBreakdown([]);
    }
  };

  // const saveToHistory = (word, score, stars, phonemeDetails, recognizedText) => {
  //   const newEntry = {
  //     id: Date.now(),
  //     word: word,
  //     score: score,
  //     stars: stars,
  //     phonemes: phonemeDetails,
  //     heard: recognizedText,
  //     timestamp: new Date().toLocaleString(),
  //     date: new Date().toISOString().split('T')[0]
  //   };
    
  //   setPracticeHistory(prev => [newEntry, ...prev].slice(0, 50));
  // };

  const saveToHistory = async (word, score, stars, phonemeDetails, recognizedText) => {
  // Save to MongoDB
  if (childId) {
    try {
      await fetch("http://localhost:5000/api/save-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId: childId,
          word: word,
          score: score,
          stars: stars,
          phonemes: phonemeDetails,
          heard: recognizedText
        })
      });
    } catch (error) {
      console.error("Failed to save history to database:", error);
    }
  }
  
  // Also update local state for immediate display
  const newEntry = {
    id: Date.now(),
    word: word,
    score: score,
    stars: stars,
    phonemes: phonemeDetails,
    heard: recognizedText,
    timestamp: new Date().toLocaleString(),
    date: new Date().toISOString().split('T')[0]
  };
  
  setPracticeHistory(prev => [newEntry, ...prev]);
};

  const startListening = async () => {
    if (!currentWord) return;

    setFeedback(" Listening...");

    try {
      const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
      const { key, region } = await tokenResponse.json();

      const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
      speechConfig.speechRecognitionLanguage = "en-US";

      const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
        currentWord.text,
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
        (result) => {
          console.log("Full result:", result);

          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            const json = result.properties.getProperty(
              sdk.PropertyId.SpeechServiceResponse_JsonResult
            );
            
            console.log("Pronunciation JSON:", json);
            
            try {
              const data = JSON.parse(json);
              const nBest = data?.NBest?.[0];


              const assessment = nBest?.PronunciationAssessment;

console.log("Full Pronunciation Assessment:", assessment);

if (assessment) {
  console.log("Accuracy:", assessment.AccuracyScore);
  console.log("Fluency:", assessment.FluencyScore);
  console.log("Prosody:", assessment.ProsodyScore);
  console.log("Completeness:", assessment.CompletenessScore);
  console.log("Overall (PronScore):", assessment.PronScore);
}
              
              if (nBest) {
                const score = nBest?.PronunciationAssessment?.PronScore || 0;
                setOverallScore(score);
                setStars(calculateStars(score));
                
                if (nBest?.Words && nBest.Words.length > 0) {
                  let detailedFeedback = `Score: ${score}%\n\n`;
                  let allPhonemes = [];
                  let breakdown = [];
                  
                  nBest.Words.forEach((word) => {
                    if (word?.Phonemes && word.Phonemes.length > 0) {
                      word.Phonemes.forEach((phoneme) => {
                        const phonemeText = phoneme?.Phoneme;
                        const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
                        const errorType = phoneme?.PronunciationAssessment?.ErrorType;
                        
                        if (!phonemeText || phonemeText.trim() === "") return;

                        allPhonemes.push({
                          sound: phonemeText,
                          score: phonemeScore,
                          errorType: errorType,
                          hint: phonemeHints[phonemeText] || "Keep practicing!"
                        });

                        breakdown.push({
                          phoneme: phonemeText,
                          score: phonemeScore,
                          display: ipaMap[phonemeText] || phonemeText
                        });
                        
                        if ( phonemeScore < 70) {
                          const readablePhoneme = ipaMap[phonemeText] || phonemeText;
                          
                          detailedFeedback += ` pronunciation: ${readablePhoneme} (${Math.round(phonemeScore)}%)\n`;
                          
                          if (phonemeHints[phonemeText]) {
                            detailedFeedback += ` Tip: ${phonemeHints[phonemeText]}\n`;
                          }
                          
                          if (errorType && errorType !== "None") {
                            detailedFeedback += `   Error: ${errorType}\n`;
                          }
                          
                          detailedFeedback += "\n";
                        }
                      });
                    }
                  });
                  
                  setPhonemeBreakdown(breakdown);
                  updateWordProgress(currentWord.text, score);
                  
                  const recognizedText = nBest.Display || currentWord.text;
                  saveToHistory(
                    currentWord.text,
                    score,
                    calculateStars(score),
                    allPhonemes,
                    recognizedText
                  );
                  
                  setFeedback(detailedFeedback);
                } else {
                  setFeedback(`Score: ${score}%\n\nPhoneme details not available. Try speaking more clearly.`);
                }
              } else {
                setFeedback("Couldn't analyze pronunciation. Try again.");
              }
            } catch (parseError) {
              console.error("JSON parse error:", parseError);
              setFeedback("Error analyzing pronunciation data.");
            }
          } else if (result.reason === sdk.ResultReason.NoMatch) {
            setFeedback("No speech detected. Speak clearly and try again.");
          } else {
            setFeedback("Recognition error. Try again.");
          }
          
          recognizer.close();
        },
        (err) => {
          console.error("Recognition error:", err);
          setFeedback("Mic error occurred. Check microphone permissions.");
          recognizer.close();
        }
      );

    } catch (err) {
      console.error("Azure setup error:", err);
      setFeedback("Failed to initialize speech recognition.");
    }
  };

  const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-IN";
    utter.rate = 0.6;
    utter.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang === "en-IN");

    if (indianVoice) {
      utter.voice = indianVoice;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "#4caf50";
    if (score >= 45) return "#ff9800";
    return "#f44336";
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>Practice Speech</h1>

      <div style={{ marginBottom: 30 }}>
        <button
          onClick={() => setMode("words")}
          style={{
            padding: "10px 25px",
            marginRight: 10,
            background: mode === "words" ? "#3498db" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: 8
          }}
        >
          Words
        </button>

        <button
          onClick={() => setMode("sentences")}
          style={{
            padding: "10px 25px",
            background: mode === "sentences" ? "#3498db" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: 8
          }}
        >
          Sentences
        </button>
      </div>

      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 8
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          style={{
            padding: "10px 20px",
            fontSize: 16,
            background: showSidebar ? "#e74c3c" : "#3498db",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          {showSidebar ? " Close List" : " Show Word List"}
        </button>
      </div>

      <div
        style={{
          fontSize: 40,
          padding: 30,
          background: "#eee",
          borderRadius: 15,
          display: "inline-block"
        }}
      >
        {currentWord ? currentWord.text : "Loading..."}

        <div style={{ fontSize: 30, marginTop: 10 }}>
          {"⭐".repeat(stars)}
        </div>
      </div>

      <br />

      {/* Sidebar for word list */}
      {showSidebar && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '300px',
            height: '100vh',
            background: 'white',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
            padding: '20px',
            overflowY: 'auto',
            zIndex: 1000,
            textAlign: 'left'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '2px solid #eee',
              paddingBottom: '10px'
            }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {mode === 'words' ? '📝 Word List' : '📚 Sentence List'}
                <span style={{ fontSize: '14px', marginLeft: '10px', color: '#666' }}>
                  ({words.length} items)
                </span>
              </h3>
              <button
                onClick={() => setShowSidebar(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ✖️
              </button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '14px', color: '#666' }}>Filter:</label>
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                  setIndex(0);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '5px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {words.map((item, idx) => {
                const wordText = item.text;
                const progress = wordProgress[wordText];
                
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setIndex(idx);
                      setShowSidebar(false);
                    }}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white',
                      border: idx === index ? '2px solid #2196f3' : '1px solid #ddd',
                      transition: 'all 0.2s',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f4fd'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#666', fontSize: '14px' }}>{idx + 1}.</span>
                      <span style={{ fontWeight: idx === index ? 'bold' : 'normal' }}>
                        {wordText}
                      </span>
                    </div>
                    
                    {progress && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>
                          {progress.score}%
                        </span>
                        {/* <span style={{ color: '#f1c40f' }}>
                          {"⭐".repeat(progress.stars)}
                        </span> */}
                      </div>
                    )}
                    
                    {!progress && (
                      <span style={{
                        fontSize: '12px',
                        padding: '2px 6px',
                        background: '#4caf50',
                        color: 'white',
                        borderRadius: '3px'
                      }}>
                        New
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '8px',
              borderTop: '2px solid #eee'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📊 Progress Summary</h4>
              <div style={{ fontSize: '14px' }}>
                <div>Total words: {words.length}</div>
                <div>Practiced: {Object.keys(wordProgress).filter(w => 
                  words.some(item => item.text === w)
                ).length}</div>
                <div>New: {words.length - Object.keys(wordProgress).filter(w => 
                  words.some(item => item.text === w)
                ).length}</div>
              </div>
              
              <div style={{
                marginTop: '10px',
                height: '8px',
                background: '#e0e0e0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(Object.keys(wordProgress).filter(w => 
                    words.some(item => item.text === w)
                  ).length / words.length) * 100}%`,
                  height: '100%',
                  background: '#4caf50',
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowSidebar(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
          />
        </>
      )}

      <button
        onClick={startListening}
        style={{
          marginTop: 20,
          padding: "15px 35px",
          fontSize: 20,
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: 10
        }}
      >
        Speak
      </button>

      <button
        onClick={() => currentWord && speakWord(currentWord.text)}
        style={{
          marginTop: 20,
          padding: "15px 35px",
          fontSize: 20,
          background: "#2ecc71",
          color: "white",
          border: "none",
          borderRadius: 10
        }}
      >
        🔊 Listen
      </button>
        <button
          onClick={nextWord}
          style={{
            padding: "12px 30px",
            fontSize: 18,
            background: "#f39c12",
            color: "white",
            border: "none",
            borderRadius: 10
          }}
        >
          Next
        </button>

      {/* MODERN DISPLAY SECTION - REPLACES YOUR OLD FEEDBACK DISPLAY */}
      <div style={{
        maxWidth: "100%",
        marginInline: "auto",
        marginTop: 30
      }}>



        {/* LISTENING/STATUS MESSAGES - ADD THIS RIGHT HERE */}
  {feedback === " Listening..." && (
    <div style={{
      padding: 30,
      background: "#e3f2fd",
      borderRadius: 15,
      border: "2px solid #2196f3",
      marginBottom: 20,
      textAlign: "center"
    }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>🎤</div>
      <div style={{ fontSize: 24, color: "#1976d2", fontWeight: "bold" }}>
        Listening...
      </div>
      <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
        Speak clearly into your microphone
      </div>
    </div>
  )}

  {feedback === "No speech detected. Speak clearly and try again." && (
    <div style={{
      padding: 30,
      background: "#ffebee",
      borderRadius: 15,
      border: "2px solid #f44336",
      marginBottom: 20,
      textAlign: "center"
    }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}></div>
      <div style={{ fontSize: 24, color: "#c62828", fontWeight: "bold" }}>
        No speech detected
      </div>
      <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
        Please speak louder and closer to the microphone
      </div>
      <button 
        onClick={startListening}
        style={{
          marginTop: 20,
          padding: "12px 30px",
          background: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: 30,
          fontSize: 18,
          cursor: "pointer"
        }}
      >
        Try Again
      </button>
    </div>
  )}

  {feedback === "Mic error occurred. Check microphone permissions." && (
    <div style={{
      padding: 30,
      background: "#fff3e0",
      borderRadius: 15,
      border: "2px solid #ff9800",
      marginBottom: 20,
      textAlign: "center"
    }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>🎤</div>
      <div style={{ fontSize: 24, color: "#e65100", fontWeight: "bold" }}>
        Microphone Error
      </div>
      <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
        Please allow microphone access in your browser
      </div>
    </div>
  )}

        {/* Score Card with Color Breakdown */}
        {overallScore > 0 && (
          <div style={{
            background: "white",
            borderRadius: 15,
            padding: 25,
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            marginBottom: 20
          }}>
            {/* Overall Score */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              paddingBottom: 15,
              borderBottom: "2px solid #f0f0f0"
            }}>
              <span style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>
                Score: {Math.round(overallScore)}%
              </span>
              <span style={{ fontSize: 32, color: "#f1c40f" }}>
                {"⭐".repeat(stars)}{"☆".repeat(3-stars)}
              </span>
            </div>

            {/* Color-coded Sound Breakdown */}
            {phonemeBreakdown.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 16, color: "#666", marginBottom: 15, fontWeight: "bold" }}>
                  Sound by sound breakdown:
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  flexWrap: "wrap"
                }}>
                  {phonemeBreakdown.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "12px 20px",
                        background: getScoreColor(item.score),
                        color: "white",
                        borderRadius: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        minWidth: 60,
                        textAlign: "center",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
                      }}
                      title={`Score: ${Math.round(item.score)}%`}
                    >
                      {item.display}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/*} Tips Section - Only for sounds below 70%*}
{/* Practice these sounds section */}

{phonemeBreakdown.filter(p => p.score < 70).length > 0 && (
  <div style={{
    marginTop: 20,
    padding: 20,
    background: "#fff8e7",
    borderRadius: 12,
    border: "1px solid #ffd280"
  }}>
    <div style={{
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#e65100",
      display: "flex",
      alignItems: "center",
      gap: 8
    }}>
      <span>🔍</span> Practice these sounds:
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
      {phonemeBreakdown
        .filter(p => p.score < 70)
        .map((item, index) => {
          const bgColor = item.score < 45 ? "#f44336" : "#ff9800";
          
          return (
            <div key={index} style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: "20px",
              background: "white",
              borderRadius: 12,
              border: "1px solid #eee",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
            }}>
              {/* Row 1: Video + Image side by side */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 25,
                flexWrap: "wrap"
              }}>
                {/* Video with play button - BIGGER SIZE */}
                <div style={{
                  position: "relative",
                  width: 700,
                  height: 200,
                  background: "#1a1a2e",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `3px solid ${bgColor}`,
                  flexShrink: 0
                }}>
                  <video
                    id={`video-${item.phoneme}`}
                    src={mouthVideos?.[item.phoneme] || ""}
                    loop={false}
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "#000"
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <button
                    onClick={() => {
                      const video = document.getElementById(`video-${item.phoneme}`);
                      if (video) {
                        video.currentTime = 0;
                        video.play();
                      }
                    }}
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      background: "rgba(0,0,0,0.7)",
                      border: "none",
                      color: "white",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ▶
                  </button>
                </div>

                {/* Static Image - BIGGER SIZE */}
                <div style={{
                  width: 500,
                  height: 200,
                  background: "#f0f0f0",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: `3px solid ${bgColor}`,
                  flexShrink: 0
                }}>
                  <img 
                    src={mouthImages[item.phoneme] || defaultMouthImage}
                    alt={`Mouth shape for ${item.display}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "white"
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultMouthImage;
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Sound name and score */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 15,
                flexWrap: "wrap"
              }}>
                <span style={{ fontSize: 28, fontWeight: "bold", color: bgColor }}>
                  {item.display}
                </span>
                <span style={{
                  fontSize: 18,
                  padding: "5px 15px",
                  background: bgColor,
                  color: "white",
                  borderRadius: 25,
                  fontWeight: "bold"
                }}>
                  {Math.round(item.score)}%
                </span>
              </div>

              {/* Row 3: Hint text */}
              <div style={{ fontSize: 16, color: "#444", lineHeight: "1.5" }}>
                💡 {phonemeHints[item.phoneme] || "Keep practicing!"}
              </div>
            </div>
          );
        })}
    </div>
  </div>
)}
           

            {/* Perfect Score Message */}
            {phonemeBreakdown.filter(p => p.score < 70).length === 0 && phonemeBreakdown.length > 0 && (
              <div style={{
                marginTop: 20,
                padding: 20,
                background: "#e8f5e9",
                borderRadius: 12,
                color: "#2e7d32",
                fontSize: 18,
                textAlign: "center",
                border: "1px solid #a5d6a7"
              }}>
                🌟 All sounds perfect! Great job!
              </div>
            )}
          </div>
        )}

        
      </div>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={prevWord}
          style={{
            marginRight: 15,
            padding: "12px 30px",
            fontSize: 18,
            background: "#7f8c8d",
            color: "white",
            border: "none",
            borderRadius: 10
          }}
        >
          Previous
        </button>

        <button onClick={async () => {
          const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
          console.log("Token response:", tokenResponse);
          const { key, region } = await tokenResponse.json();
          console.log("Azure config:", { key: key?.substring(0,5) + "...", region });
        }}>
          Test Azure Connection
        </button>

      
      </div>

      <br /><br />

      <button 
        onClick={() => setShowProgress(!showProgress)}
        style={{
          marginLeft: 15,
          padding: "12px 30px",
          fontSize: 18,
          background: "#9b59b6",
          color: "white",
          border: "none",
          borderRadius: 25,
          cursor: "pointer"
        }}
      >
        {showProgress ? "Close Progress" : "📊 My Progress"}
      </button>

      <button onClick={onBack}>Back</button>

      {showProgress && (
        <ProgressPage 
          onBack={() => setShowProgress(false)} 
          historyData={practiceHistory}
        />
      )}
    </div>
  );
}

export default PracticeMode;
//THIS STORES POSITION ALOS
// import React, { useEffect, useState } from "react";
// import * as sdk from "microsoft-cognitiveservices-speech-sdk";
// import practiceDataset from "../data/practiceDataset";
// import ProgressPage from "./ProgressPage";


// function PracticeMode({ onBack ,childId}) {





  

// // Make sure your ipaMap covers all common sounds
// const ipaMap = {
//   // Consonants (24)
//   "p": "p",
//   "b": "b",
//   "m": "m",
//   "w": "w",
//   "f": "f",
//   "v": "v",
//   "θ": "th (soft)",
//   "ð": "th (hard)",
//   "t": "t",
//   "d": "d",
//   "s": "s",
//   "z": "z",
//   "n": "n",
//   "l": "l",
//   "r": "r",
//   "ʃ": "sh",
//   "ʒ": "zh",
//   "tʃ": "ch",
//   "dʒ": "j",
//   "k": "k",
//   "g": "g",
//   "ŋ": "ng",
//   "h": "h",
//   "j": "y",
  
//   // Vowels (12)
//   "i": "ee",
//   "ɪ": "ih",
//   "eɪ": "ay",
//   "ɛ": "eh",
//   "æ": "a",
//   "ɑ": "ah",
//   "ɔ": "aw",
//   "oʊ": "oh",
//   "ʊ": "uu",
//   "u": "oo",
//   "ʌ": "uh",
//   "ə": "uh",
  
//   // R-colored vowels (2)
//   "ɜ": "er",
//   "ɝ": "er",
  
//   // Diphthongs (6)
//   "aɪ": "eye",
//   "aʊ": "ow",
//   "ɔɪ": "oy",
//   "ju": "you"
// };

// // Enhanced phoneme hints
// const phonemeHints = {
//   // Consonants
//   "p": "Pop your lips like a tiny bubble!",
//   "b": "Pop your lips with your voice turned on!",
//   "m": "Close your lips and hum like you're thinking!",
//   "w": "Round your lips like you're blowing a bubble!",
//   "f": "Bite your bottom lip gently and blow!",
//   "v": "Bite your bottom lip and buzz!",
//   "θ": "Stick your tongue out just a little and blow!",
//   "ð": "Stick your tongue out and buzz!",
//   "t": "Tap your tongue quickly behind your top teeth!",
//   "d": "Tap your tongue with your voice turned on!",
//   "s": "Smile and let air hiss out like a snake!",
//   "z": "Buzz like a happy bee!",
//   "n": "Put your tongue up and let air out your nose!",
//   "l": "Lift your tongue to the roof of your mouth!",
//   "r": "Curl your tongue up like a roaring lion!",
//   "ʃ": "Round your lips and say 'shhh' like quiet!",
//   "ʒ": "Make a buzzing sound like a gentle bee!",
//   "tʃ": "Say it quick like a choo-choo train!",
//   "dʒ": "Bounce it like in 'jump'!",
//   "k": "Say it from the back of your mouth like a cough!",
//   "g": "Say it from your throat like a gulping sound!",
//   "ŋ": "Let the sound come out your nose like 'sing'!",
//   "h": "Breathe out like you're fogging a window!",
//   "j": "Smile and say 'y' like in 'yes'!",
  
//   // Vowels
//   "i": "Smile wide and say 'ee' like in 'see'!",
//   "ɪ": "Quick short sound like in 'sit'!",
//   "eɪ": "Smile and slide into 'ay' like in 'play'!",
//   "ɛ": "Open your mouth like in 'bed'!",
//   "æ": "Open wide like a cat saying 'meow'!",
//   "ɑ": "Open your mouth wide like at the doctor!",
//   "ɔ": "Round your lips like in 'law'!",
//   "oʊ": "Round your lips and say 'oh' like in 'go'!",
//   "ʊ": "Short sound like in 'book'!",
//   "u": "Pucker your lips like a monkey!",
//   "ʌ": "Relaxed sound like in 'cup'!",
//   "ə": "Relax your mouth like you're thinking 'uh...'",
  
//   // R-colored vowels
//   "ɜ": "Thinking sound like 'er...'!",
//   "ɝ": "Thinking sound like 'er...'!",
  
//   // Diphthongs
//   "aɪ": "Open wide and say 'eye' like in 'my'!",
//   "aʊ": "Say 'ow' like you just bumped your toe!",
//   "ɔɪ": "Say 'oy' like in 'toy'!",
//   "ju": "Say 'you' like you're pointing at someone!"
// };


// // Mouth images mapping - using local files from public folder
// const mouthImages = {
//   // Consonants
//   "p": "/mouth-shapes/p.png",
//   "b": "/mouth-shapes/b.png",
//   "m": "/mouth-shapes/m.png",
//   "w": "/mouth-shapes/w.png",
//   "f": "/mouth-shapes/f.png",
//   "v": "/mouth-shapes/v.png",
//   "th": "/mouth-shapes/th-soft.png",
//   "ð": "/mouth-shapes/th-hard.png",
//   "t": "/mouth-shapes/t.png",
//   "d": "/mouth-shapes/d.png",
//   "s": "/mouth-shapes/s.png",
//   "z": "/mouth-shapes/z.png",
//   "n": "/mouth-shapes/n.png",
//   "l": "/mouth-shapes/l.png",
//   "r": "/mouth-shapes/r.png",
//   "er": "/mouth-shapes/r.png",
//   "sh": "/mouth-shapes/sh.png",
//   "ʒ": "/mouth-shapes/zh.png",
//   "tʃ": "/mouth-shapes/ch.png",
//   "jh": "/mouth-shapes/j.png",
//   "k": "/mouth-shapes/k.png",
//   "g": "/mouth-shapes/g.png",
//   "ŋ": "/mouth-shapes/ng.png",
//   "h": "/mouth-shapes/h.png",
//   "j": "/mouth-shapes/j.png",
//   "ae": "/mouth-shapes/ah.png",
//   "ax": "/mouth-shapes/ah.png",
//   "ih": "/mouth-shapes/eye.png",
//   // Vowels
//   "i": "/mouth-shapes/ee.png",
//   "ɪ": "/mouth-shapes/ih.png",
//   "eɪ": "/mouth-shapes/ay.png",
//   "ɛ": "/mouth-shapes/eh.png",
//   "ey": "/mouth-shapes/eh.png",
//   "aa": "/mouth-shapes/a.png",
//   "ah": "/mouth-shapes/ah.png",
//   "ao": "/mouth-shapes/ah.png",
//   "ɔ": "/mouth-shapes/aw.png",
//   "oʊ": "/mouth-shapes/oh.png",
//   "ʊ": "/mouth-shapes/uu.png",
//   "u": "/mouth-shapes/oo.png",
//   "ow": "/mouth-shapes/oh.png",
//   "ʌ": "/mouth-shapes/uh.png",
//   "ə": "/mouth-shapes/uh.png",
//   "iy":"/mouth-shapes/eye.png",
//     "eh":"/mouth-shapes/eh.png",
//     "ng":"/mouth-shapes/ng.png",
  
  
//   // R-colored vowels
//   "ɜ": "/mouth-shapes/er.png",
//   "ɝ": "/mouth-shapes/er.png",
  
//   // Diphthongs
//   "aɪ": "/mouth-shapes/eye.png",
//   "aʊ": "/mouth-shapes/ow.png",
//   "ɔɪ": "/mouth-shapes/oi.png",
//   "ju": "/mouth-shapes/you.png"
// };
// // Default image for missing ones
// const defaultMouthImage = "/mouth-shapes/default.png";


// const mouthVideos = {
//   // Consonants
//   "p": "/video-mouths/p.mp4",
//   "b": "/video-mouths/b.mp4",
//   "m": "/video-mouths/m.mp4",
//   "w": "/video-mouths/w.mp4",
//   "f": "/video-mouths/f.mp4",
//   "v": "/video-mouths/v.mp4",
//   "θ": "/video-mouths/th.mp4",
//   "ð": "/video-mouths/th.mp4",
//   "t": "/video-mouths/t.mp4",
//   "d": "/video-mouths/d.mp4",
//   "s": "/video-mouths/s.mp4",
//   "z": "/video-mouths/z.mp4",
//   "n": "/video-mouths/n.mp4",
//   "l": "/video-mouths/l.mp4",
//   "r": "/video-mouths/r.mp4",
//   "sh": "/video-mouths/sh.mp4",
//   "ʒ": "/video-mouths/zh.mp4",
//   "tʃ": "/video-mouths/ch.mp4",
//   "jh": "/video-mouths/jh.mp4",
//   "k": "/video-mouths/k.mp4",
//   "g": "/video-mouths/g.mp4",
//   "ng": "/video-mouths/ng.mp4",
//   "h": "/video-mouths/h.mp4",
//   "j": "/video-mouths/y.mp4",
  
//   // Vowels
//   "iy": "/video-mouths/iy.mp4",
//   "ih": "/video-mouths/ih.mp4",
//   "ey": "/video-mouths/ey.mp4",
//   "eh": "/video-mouths/eh.mp4",
//   "ae": "/video-mouths/ae.mp4",
//   "aa": "/video-mouths/aa.mp4",
//   "ao": "/video-mouths/ao.mp4",
//   "ow": "/video-mouths/ow.mp4",
//   "ʊ": "/video-mouths/uh.mp4",
//   "u": "/video-mouths/uw.mp4",
//   "ah": "/video-mouths/ah.mp4",
//   "ax": "/video-mouths/ax.mp4",
  
//   // R-colored vowels
//   "ɜ": "/video-mouths/er.mp4",
//   "ɝ": "/video-mouths/er.mp4",
  
//   // Diphthongs
//   "aɪ": "/video-mouths/ay.mp4",
//   "aʊ": "/video-mouths/aw.mp4",
//   "ɔɪ": "/video-mouths/oy.mp4",
//   "ju": "/video-mouths/uw.mp4"
// };

//   useEffect(() => {
//     window.speechSynthesis.getVoices();
//   }, []);

//   const [mode, setMode] = useState("words");
//   const [words, setWords] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const [stars, setStars] = useState(0);
//   const [difficulty, setDifficulty] = useState("easy");
//   const [showProgress, setShowProgress] = useState(false);
//   const [practiceHistory, setPracticeHistory] = useState([]);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [wordProgress, setWordProgress] = useState({});
//   const [phonemeBreakdown, setPhonemeBreakdown] = useState([]);
//   const [overallScore, setOverallScore] = useState(0);

//   useEffect(() => {
//     const list = practiceDataset?.[mode]?.[difficulty] || [];
//     setWords(list);
//     setIndex(0);
//   }, [mode, difficulty]);

//   // Load history from database when component mounts or childId changes
// useEffect(() => {
//   const loadHistory = async () => {
//     if (!childId) return;
    
//     try {
//       const response = await fetch(`http://localhost:5000/api/get-history/${childId}`);
//       const history = await response.json();
      
//       if (Array.isArray(history) && history.length > 0) {
//         // Convert MongoDB format to match your existing state format
//         const formattedHistory = history.map(entry => ({
//           id: entry._id,
//           word: entry.word,
//           score: entry.score,
//           stars: entry.stars,
//           phonemes: entry.phonemes,
//           heard: entry.heard,
//           timestamp: new Date(entry.timestamp).toLocaleString(),
//           date: entry.date
//         }));
//         setPracticeHistory(formattedHistory);
//       }
//     } catch (error) {
//       console.error("Failed to load history from database:", error);
//     }
//   };
  
//   loadHistory();
// }, [childId]);

//   const currentWord = words[index];

//   const updateWordProgress = (word, score) => {
//     setWordProgress(prev => ({
//       ...prev,
//       [word]: {
//         score: score,
//         lastPracticed: new Date().toLocaleString(),
//         stars: calculateStars(score)
//       }
//     }));
//   };

//   const calculateStars = (score) => {
//     if (score === 100) return 3;
//     if (score >= 70) return 2;
//     if (score >= 40) return 1;
//     return 0;
//   };

//   const nextWord = () => {
//     if (index < words.length - 1) {
//       setIndex(index + 1);
//       setFeedback("");
//       setStars(0);
//       setPhonemeBreakdown([]);
//     }
//   };

//   const prevWord = () => {
//     if (index > 0) {
//       setIndex(index - 1);
//       setFeedback("");
//       setStars(0);
//       setPhonemeBreakdown([]);
//     }
//   };

//   // const saveToHistory = (word, score, stars, phonemeDetails, recognizedText) => {
//   //   const newEntry = {
//   //     id: Date.now(),
//   //     word: word,
//   //     score: score,
//   //     stars: stars,
//   //     phonemes: phonemeDetails,
//   //     heard: recognizedText,
//   //     timestamp: new Date().toLocaleString(),
//   //     date: new Date().toISOString().split('T')[0]
//   //   };
    
//   //   setPracticeHistory(prev => [newEntry, ...prev].slice(0, 50));
//   // };

//   const saveToHistory = async (word, score, stars, phonemeDetails, recognizedText) => {
//   // Save to MongoDB
//   if (childId) {
//     try {
//       await fetch("http://localhost:5000/api/save-history", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           childId: childId,
//           word: word,
//           score: score,
//           stars: stars,
//           phonemes: phonemeDetails,
//           heard: recognizedText
//         })
//       });
//     } catch (error) {
//       console.error("Failed to save history to database:", error);
//     }
//   }
  
//   // Also update local state for immediate display
//   const newEntry = {
//     id: Date.now(),
//     word: word,
//     score: score,
//     stars: stars,
//     phonemes: phonemeDetails,
//     heard: recognizedText,
//     timestamp: new Date().toLocaleString(),
//     date: new Date().toISOString().split('T')[0]
//   };
  
//   setPracticeHistory(prev => [newEntry, ...prev]);
// };

//   const startListening = async () => {
//     if (!currentWord) return;

//     setFeedback(" Listening...");

//     try {
//       const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
//       const { key, region } = await tokenResponse.json();

//       const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
//       speechConfig.speechRecognitionLanguage = "en-US";

//       const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
//         currentWord.text,
//         sdk.PronunciationAssessmentGradingSystem.HundredMark,
//         sdk.PronunciationAssessmentGranularity.Phoneme,
//         true
//       );
      
//       pronunciationConfig.enableProsodyAssessment = true;
//       pronunciationConfig.enableMiscue = true;
      
//       const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
//       const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      
//       pronunciationConfig.applyTo(recognizer);

//       recognizer.recognizeOnceAsync(
//         (result) => {
//           console.log("Full result:", result);

//           if (result.reason === sdk.ResultReason.RecognizedSpeech) {
//             const json = result.properties.getProperty(
//               sdk.PropertyId.SpeechServiceResponse_JsonResult
//             );
            
//             console.log("Pronunciation JSON:", json);
            
//             try {
//               const data = JSON.parse(json);
//               const nBest = data?.NBest?.[0];


//               const assessment = nBest?.PronunciationAssessment;

// console.log("Full Pronunciation Assessment:", assessment);

// if (assessment) {
//   console.log("Accuracy:", assessment.AccuracyScore);
//   console.log("Fluency:", assessment.FluencyScore);
//   console.log("Prosody:", assessment.ProsodyScore);
//   console.log("Completeness:", assessment.CompletenessScore);
//   console.log("Overall (PronScore):", assessment.PronScore);
// }
              
//               if (nBest) {
//                 const score = nBest?.PronunciationAssessment?.PronScore || 0;
//                 setOverallScore(score);
//                 setStars(calculateStars(score));
                
//                 if (nBest?.Words && nBest.Words.length > 0) {
//                   let detailedFeedback = `Score: ${score}%\n\n`;
//                   let allPhonemes = [];
//                   let breakdown = [];
                  
//                   nBest.Words.forEach((word) => {
//   if (word?.Phonemes && word.Phonemes.length > 0) {
//     // Get the total number of phonemes for this word (for position calculation)
//     const totalPhonemes = word.Phonemes.length;
    
//     word.Phonemes.forEach((phoneme, phonemeIndex) => {
//       const phonemeText = phoneme?.Phoneme;
//       const phonemeScore = phoneme?.PronunciationAssessment?.AccuracyScore || 0;
//       const errorType = phoneme?.PronunciationAssessment?.ErrorType;
      
//       if (!phonemeText || phonemeText.trim() === "") return;
      
//       // Calculate position based on index within the word
//       let position = "middle";
//       if (totalPhonemes === 1) {
//         position = "single";
//       } else if (phonemeIndex === 0) {
//         position = "beginning";
//       } else if (phonemeIndex === totalPhonemes - 1) {
//         position = "end";
//       }
      
//       allPhonemes.push({
//         sound: phonemeText,
//         score: phonemeScore,
//         position: position,        // ← ADD THIS LINE
//         errorType: errorType,
//         hint: phonemeHints[phonemeText] || "Keep practicing!"
//       });
      
//       // Rest of your existing code continues...
//       breakdown.push({
//         phoneme: phonemeText,
//         score: phonemeScore,
//         display: ipaMap[phonemeText] || phonemeText
//       });
      
//       if (phonemeScore < 70) {
//         const readablePhoneme = ipaMap[phonemeText] || phonemeText;
//         detailedFeedback += ` pronunciation: ${readablePhoneme} (${Math.round(phonemeScore)}%)\n`;
//         if (phonemeHints[phonemeText]) {
//           detailedFeedback += ` Tip: ${phonemeHints[phonemeText]}\n`;
//         }
//         if (errorType && errorType !== "None") {
//           detailedFeedback += `   Error: ${errorType}\n`;
//         }
//         detailedFeedback += "\n";
//       }
//     });
//   }
// });
//                   setPhonemeBreakdown(breakdown);
//                   updateWordProgress(currentWord.text, score);
                  
//                   const recognizedText = nBest.Display || currentWord.text;
//                   saveToHistory(
//                     currentWord.text,
//                     score,
//                     calculateStars(score),
//                     allPhonemes,
//                     recognizedText
//                   );
                  
//                   setFeedback(detailedFeedback);
//                 } else {
//                   setFeedback(`Score: ${score}%\n\nPhoneme details not available. Try speaking more clearly.`);
//                 }
//               } else {
//                 setFeedback("Couldn't analyze pronunciation. Try again.");
//               }
//             } catch (parseError) {
//               console.error("JSON parse error:", parseError);
//               setFeedback("Error analyzing pronunciation data.");
//             }
//           } else if (result.reason === sdk.ResultReason.NoMatch) {
//             setFeedback("No speech detected. Speak clearly and try again.");
//           } else {
//             setFeedback("Recognition error. Try again.");
//           }
          
//           recognizer.close();
//         },
//         (err) => {
//           console.error("Recognition error:", err);
//           setFeedback("Mic error occurred. Check microphone permissions.");
//           recognizer.close();
//         }
//       );

//     } catch (err) {
//       console.error("Azure setup error:", err);
//       setFeedback("Failed to initialize speech recognition.");
//     }
//   };

//   const speakWord = (word) => {
//     const utter = new SpeechSynthesisUtterance(word);
//     utter.lang = "en-IN";
//     utter.rate = 0.6;
//     utter.pitch = 1;

//     const voices = window.speechSynthesis.getVoices();
//     const indianVoice = voices.find(v => v.lang === "en-IN");

//     if (indianVoice) {
//       utter.voice = indianVoice;
//     }

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   const getScoreColor = (score) => {
//     if (score >= 70) return "#4caf50";
//     if (score >= 45) return "#ff9800";
//     return "#f44336";
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: 80 }}>
//       <h1>Practice Speech</h1>

//       <div style={{ marginBottom: 30 }}>
//         <button
//           onClick={() => setMode("words")}
//           style={{
//             padding: "10px 25px",
//             marginRight: 10,
//             background: mode === "words" ? "#3498db" : "#ccc",
//             color: "white",
//             border: "none",
//             borderRadius: 8
//           }}
//         >
//           Words
//         </button>

//         <button
//           onClick={() => setMode("sentences")}
//           style={{
//             padding: "10px 25px",
//             background: mode === "sentences" ? "#3498db" : "#ccc",
//             color: "white",
//             border: "none",
//             borderRadius: 8
//           }}
//         >
//           Sentences
//         </button>
//       </div>

//       <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
//         <select
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//           style={{
//             padding: "10px 20px",
//             fontSize: 16,
//             borderRadius: 8
//           }}
//         >
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>
        
//         <button
//           onClick={() => setShowSidebar(!showSidebar)}
//           style={{
//             padding: "10px 20px",
//             fontSize: 16,
//             background: showSidebar ? "#e74c3c" : "#3498db",
//             color: "white",
//             border: "none",
//             borderRadius: 8,
//             cursor: "pointer",
//             display: 'flex',
//             alignItems: 'center',
//             gap: '5px'
//           }}
//         >
//           {showSidebar ? " Close List" : " Show Word List"}
//         </button>
//       </div>

//       <div
//         style={{
//           fontSize: 40,
//           padding: 30,
//           background: "#eee",
//           borderRadius: 15,
//           display: "inline-block"
//         }}
//       >
//         {currentWord ? currentWord.text : "Loading..."}

//         <div style={{ fontSize: 30, marginTop: 10 }}>
//           {"⭐".repeat(stars)}
//         </div>
//       </div>

//       <br />

//       {/* Sidebar for word list */}
//       {showSidebar && (
//         <>
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '300px',
//             height: '100vh',
//             background: 'white',
//             boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
//             padding: '20px',
//             overflowY: 'auto',
//             zIndex: 1000,
//             textAlign: 'left'
//           }}>
//             <div style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '20px',
//               borderBottom: '2px solid #eee',
//               paddingBottom: '10px'
//             }}>
//               <h3 style={{ margin: 0, color: '#333' }}>
//                 {mode === 'words' ? '📝 Word List' : '📚 Sentence List'}
//                 <span style={{ fontSize: '14px', marginLeft: '10px', color: '#666' }}>
//                   ({words.length} items)
//                 </span>
//               </h3>
//               <button
//                 onClick={() => setShowSidebar(false)}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   fontSize: '20px',
//                   cursor: 'pointer',
//                   color: '#666'
//                 }}
//               >
//                 ✖️
//               </button>
//             </div>
            
//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontSize: '14px', color: '#666' }}>Filter:</label>
//               <select
//                 value={difficulty}
//                 onChange={(e) => {
//                   setDifficulty(e.target.value);
//                   setIndex(0);
//                 }}
//                 style={{
//                   width: '100%',
//                   padding: '8px',
//                   marginTop: '5px',
//                   borderRadius: '5px',
//                   border: '1px solid #ddd'
//                 }}
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </select>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               {words.map((item, idx) => {
//                 const wordText = item.text;
//                 const progress = wordProgress[wordText];
                
//                 return (
//                   <div
//                     key={idx}
//                     onClick={() => {
//                       setIndex(idx);
//                       setShowSidebar(false);
//                     }}
//                     style={{
//                       padding: '12px',
//                       borderRadius: '8px',
//                       cursor: 'pointer',
//                       backgroundColor: idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white',
//                       border: idx === index ? '2px solid #2196f3' : '1px solid #ddd',
//                       transition: 'all 0.2s',
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center'
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f4fd'}
//                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = idx === index ? '#e3f2fd' : progress ? '#f5f5f5' : 'white'}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                       <span style={{ color: '#666', fontSize: '14px' }}>{idx + 1}.</span>
//                       <span style={{ fontWeight: idx === index ? 'bold' : 'normal' }}>
//                         {wordText}
//                       </span>
//                     </div>
                    
//                     {progress && (
//                       <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
//                         <span style={{ fontSize: '14px', color: '#666' }}>
//                           {progress.score}%
//                         </span>
//                         {/* <span style={{ color: '#f1c40f' }}>
//                           {"⭐".repeat(progress.stars)}
//                         </span> */}
//                       </div>
//                     )}
                    
//                     {!progress && (
//                       <span style={{
//                         fontSize: '12px',
//                         padding: '2px 6px',
//                         background: '#4caf50',
//                         color: 'white',
//                         borderRadius: '3px'
//                       }}>
//                         New
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
            
//             <div style={{
//               marginTop: '20px',
//               padding: '15px',
//               background: '#f8f9fa',
//               borderRadius: '8px',
//               borderTop: '2px solid #eee'
//             }}>
//               <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📊 Progress Summary</h4>
//               <div style={{ fontSize: '14px' }}>
//                 <div>Total words: {words.length}</div>
//                 <div>Practiced: {Object.keys(wordProgress).filter(w => 
//                   words.some(item => item.text === w)
//                 ).length}</div>
//                 <div>New: {words.length - Object.keys(wordProgress).filter(w => 
//                   words.some(item => item.text === w)
//                 ).length}</div>
//               </div>
              
//               <div style={{
//                 marginTop: '10px',
//                 height: '8px',
//                 background: '#e0e0e0',
//                 borderRadius: '4px',
//                 overflow: 'hidden'
//               }}>
//                 <div style={{
//                   width: `${(Object.keys(wordProgress).filter(w => 
//                     words.some(item => item.text === w)
//                   ).length / words.length) * 100}%`,
//                   height: '100%',
//                   background: '#4caf50',
//                   transition: 'width 0.3s'
//                 }} />
//               </div>
//             </div>
//           </div>
//           <div
//             onClick={() => setShowSidebar(false)}
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'rgba(0,0,0,0.5)',
//               zIndex: 999
//             }}
//           />
//         </>
//       )}

//       <button
//         onClick={startListening}
//         style={{
//           marginTop: 20,
//           padding: "15px 35px",
//           fontSize: 20,
//           background: "#3498db",
//           color: "white",
//           border: "none",
//           borderRadius: 10
//         }}
//       >
//         Speak
//       </button>

//       <button
//         onClick={() => currentWord && speakWord(currentWord.text)}
//         style={{
//           marginTop: 20,
//           padding: "15px 35px",
//           fontSize: 20,
//           background: "#2ecc71",
//           color: "white",
//           border: "none",
//           borderRadius: 10
//         }}
//       >
//         🔊 Listen
//       </button>
//         <button
//           onClick={nextWord}
//           style={{
//             padding: "12px 30px",
//             fontSize: 18,
//             background: "#f39c12",
//             color: "white",
//             border: "none",
//             borderRadius: 10
//           }}
//         >
//           Next
//         </button>

//       {/* MODERN DISPLAY SECTION - REPLACES YOUR OLD FEEDBACK DISPLAY */}
//       <div style={{
//         maxWidth: "100%",
//         marginInline: "auto",
//         marginTop: 30
//       }}>



//         {/* LISTENING/STATUS MESSAGES - ADD THIS RIGHT HERE */}
//   {feedback === " Listening..." && (
//     <div style={{
//       padding: 30,
//       background: "#e3f2fd",
//       borderRadius: 15,
//       border: "2px solid #2196f3",
//       marginBottom: 20,
//       textAlign: "center"
//     }}>
//       <div style={{ fontSize: 40, marginBottom: 10 }}>🎤</div>
//       <div style={{ fontSize: 24, color: "#1976d2", fontWeight: "bold" }}>
//         Listening...
//       </div>
//       <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
//         Speak clearly into your microphone
//       </div>
//     </div>
//   )}

//   {feedback === "No speech detected. Speak clearly and try again." && (
//     <div style={{
//       padding: 30,
//       background: "#ffebee",
//       borderRadius: 15,
//       border: "2px solid #f44336",
//       marginBottom: 20,
//       textAlign: "center"
//     }}>
//       <div style={{ fontSize: 40, marginBottom: 10 }}></div>
//       <div style={{ fontSize: 24, color: "#c62828", fontWeight: "bold" }}>
//         No speech detected
//       </div>
//       <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
//         Please speak louder and closer to the microphone
//       </div>
//       <button 
//         onClick={startListening}
//         style={{
//           marginTop: 20,
//           padding: "12px 30px",
//           background: "#2196f3",
//           color: "white",
//           border: "none",
//           borderRadius: 30,
//           fontSize: 18,
//           cursor: "pointer"
//         }}
//       >
//         Try Again
//       </button>
//     </div>
//   )}

//   {feedback === "Mic error occurred. Check microphone permissions." && (
//     <div style={{
//       padding: 30,
//       background: "#fff3e0",
//       borderRadius: 15,
//       border: "2px solid #ff9800",
//       marginBottom: 20,
//       textAlign: "center"
//     }}>
//       <div style={{ fontSize: 40, marginBottom: 10 }}>🎤</div>
//       <div style={{ fontSize: 24, color: "#e65100", fontWeight: "bold" }}>
//         Microphone Error
//       </div>
//       <div style={{ fontSize: 18, color: "#555", marginTop: 10 }}>
//         Please allow microphone access in your browser
//       </div>
//     </div>
//   )}

//         {/* Score Card with Color Breakdown */}
//         {overallScore > 0 && (
//           <div style={{
//             background: "white",
//             borderRadius: 15,
//             padding: 25,
//             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//             marginBottom: 20
//           }}>
//             {/* Overall Score */}
//             <div style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 20,
//               paddingBottom: 15,
//               borderBottom: "2px solid #f0f0f0"
//             }}>
//               <span style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>
//                 Score: {Math.round(overallScore)}%
//               </span>
//               <span style={{ fontSize: 32, color: "#f1c40f" }}>
//                 {"⭐".repeat(stars)}{"☆".repeat(3-stars)}
//               </span>
//             </div>

//             {/* Color-coded Sound Breakdown */}
//             {phonemeBreakdown.length > 0 && (
//               <div style={{ marginBottom: 20 }}>
//                 <div style={{ fontSize: 16, color: "#666", marginBottom: 15, fontWeight: "bold" }}>
//                   Sound by sound breakdown:
//                 </div>
//                 <div style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   gap: 12,
//                   flexWrap: "wrap"
//                 }}>
//                   {phonemeBreakdown.map((item, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         padding: "12px 20px",
//                         background: getScoreColor(item.score),
//                         color: "white",
//                         borderRadius: 10,
//                         fontSize: 20,
//                         fontWeight: "bold",
//                         minWidth: 60,
//                         textAlign: "center",
//                         boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
//                       }}
//                       title={`Score: ${Math.round(item.score)}%`}
//                     >
//                       {item.display}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           {/*} Tips Section - Only for sounds below 70%*}
// {/* Practice these sounds section */}

// {phonemeBreakdown.filter(p => p.score < 70).length > 0 && (
//   <div style={{
//     marginTop: 20,
//     padding: 20,
//     background: "#fff8e7",
//     borderRadius: 12,
//     border: "1px solid #ffd280"
//   }}>
//     <div style={{
//       fontSize: 18,
//       fontWeight: "bold",
//       marginBottom: 15,
//       color: "#e65100",
//       display: "flex",
//       alignItems: "center",
//       gap: 8
//     }}>
//       <span>🔍</span> Practice these sounds:
//     </div>
//     <div style={{ display: "flex", flexDirection: "column", gap: 25 }}>
//       {phonemeBreakdown
//         .filter(p => p.score < 70)
//         .map((item, index) => {
//           const bgColor = item.score < 45 ? "#f44336" : "#ff9800";
          
//           return (
//             <div key={index} style={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 12,
//               padding: "20px",
//               background: "white",
//               borderRadius: 12,
//               border: "1px solid #eee",
//               boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
//             }}>
//               {/* Row 1: Video + Image side by side */}
//               <div style={{
//                 display: "flex",
//                 alignItems: "flex-start",
//                 gap: 25,
//                 flexWrap: "wrap"
//               }}>
//                 {/* Video with play button - BIGGER SIZE */}
//                 <div style={{
//                   position: "relative",
//                   width: 700,
//                   height: 200,
//                   background: "#1a1a2e",
//                   borderRadius: 10,
//                   overflow: "hidden",
//                   border: `3px solid ${bgColor}`,
//                   flexShrink: 0
//                 }}>
//                   <video
//                     id={`video-${item.phoneme}`}
//                     src={mouthVideos?.[item.phoneme] || ""}
//                     loop={false}
//                     muted
//                     playsInline
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       backgroundColor: "#000"
//                     }}
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />
//                   <button
//                     onClick={() => {
//                       const video = document.getElementById(`video-${item.phoneme}`);
//                       if (video) {
//                         video.currentTime = 0;
//                         video.play();
//                       }
//                     }}
//                     style={{
//                       position: "absolute",
//                       bottom: 10,
//                       right: 10,
//                       background: "rgba(0,0,0,0.7)",
//                       border: "none",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: 40,
//                       height: 40,
//                       cursor: "pointer",
//                       fontSize: 18,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center"
//                     }}
//                   >
//                     ▶
//                   </button>
//                 </div>

//                 {/* Static Image - BIGGER SIZE */}
//                 <div style={{
//                   width: 500,
//                   height: 200,
//                   background: "#f0f0f0",
//                   borderRadius: 10,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   overflow: "hidden",
//                   border: `3px solid ${bgColor}`,
//                   flexShrink: 0
//                 }}>
//                   <img 
//                     src={mouthImages[item.phoneme] || defaultMouthImage}
//                     alt={`Mouth shape for ${item.display}`}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "contain",
//                       backgroundColor: "white"
//                     }}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = defaultMouthImage;
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Row 2: Sound name and score */}
//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 15,
//                 flexWrap: "wrap"
//               }}>
//                 <span style={{ fontSize: 28, fontWeight: "bold", color: bgColor }}>
//                   {item.display}
//                 </span>
//                 <span style={{
//                   fontSize: 18,
//                   padding: "5px 15px",
//                   background: bgColor,
//                   color: "white",
//                   borderRadius: 25,
//                   fontWeight: "bold"
//                 }}>
//                   {Math.round(item.score)}%
//                 </span>
//               </div>

//               {/* Row 3: Hint text */}
//               <div style={{ fontSize: 16, color: "#444", lineHeight: "1.5" }}>
//                 💡 {phonemeHints[item.phoneme] || "Keep practicing!"}
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   </div>
// )}
           

//             {/* Perfect Score Message */}
//             {phonemeBreakdown.filter(p => p.score < 70).length === 0 && phonemeBreakdown.length > 0 && (
//               <div style={{
//                 marginTop: 20,
//                 padding: 20,
//                 background: "#e8f5e9",
//                 borderRadius: 12,
//                 color: "#2e7d32",
//                 fontSize: 18,
//                 textAlign: "center",
//                 border: "1px solid #a5d6a7"
//               }}>
//                 🌟 All sounds perfect! Great job!
//               </div>
//             )}
//           </div>
//         )}

        
//       </div>

//       <div style={{ marginTop: 20 }}>
//         <button
//           onClick={prevWord}
//           style={{
//             marginRight: 15,
//             padding: "12px 30px",
//             fontSize: 18,
//             background: "#7f8c8d",
//             color: "white",
//             border: "none",
//             borderRadius: 10
//           }}
//         >
//           Previous
//         </button>

//         <button onClick={async () => {
//           const tokenResponse = await fetch("http://localhost:5000/api/azure-token");
//           console.log("Token response:", tokenResponse);
//           const { key, region } = await tokenResponse.json();
//           console.log("Azure config:", { key: key?.substring(0,5) + "...", region });
//         }}>
//           Test Azure Connection
//         </button>

      
//       </div>

//       <br /><br />

//       <button 
//         onClick={() => setShowProgress(!showProgress)}
//         style={{
//           marginLeft: 15,
//           padding: "12px 30px",
//           fontSize: 18,
//           background: "#9b59b6",
//           color: "white",
//           border: "none",
//           borderRadius: 25,
//           cursor: "pointer"
//         }}
//       >
//         {showProgress ? "Close Progress" : "📊 My Progress"}
//       </button>

//       <button onClick={onBack}>Back</button>

//       {showProgress && (
//         <ProgressPage 
//           onBack={() => setShowProgress(false)} 
//           historyData={practiceHistory}
//         />
//       )}
//     </div>
//   );
// }

// export default PracticeMode;

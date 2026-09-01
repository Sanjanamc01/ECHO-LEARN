

// import React, { useState } from 'react';
// import practiceDataset from "../data/practiceDataset";

// function ProgressPage({ onBack, historyData }) {
//   const [expandedWord, setExpandedWord] = useState(null);
//   const [expandedAttempt, setExpandedAttempt] = useState(null);
  
//   // Group history by word
//   const groupedHistory = historyData.reduce((groups, entry) => {
//     const word = entry.word;
//     if (!groups[word]) {
//       groups[word] = [];
//     }
//     groups[word].push(entry);
//     return groups;
//   }, {});
  
//   // Sort words alphabetically
//   const sortedWords = Object.keys(groupedHistory).sort();
  
//   // Calculate stats
//   const totalPracticed = historyData.length;
//   const uniqueWords = Object.keys(groupedHistory).length;
  
//   // Count practices per difficulty (easy, medium, hard)
//   let easyCount = 0;
//   let mediumCount = 0;
//   let hardCount = 0;

//   // Helper function to get difficulty of a word/sentence
//   const getDifficulty = (text) => {
//     // Check in words dataset
//     for (let level of ["easy", "medium", "hard"]) {
//       const wordsList = practiceDataset?.words?.[level];
//       if (wordsList && wordsList.some(item => item.text === text)) {
//         return level;
//       }
//     }
//     // Check in sentences dataset
//     for (let level of ["easy", "medium", "hard"]) {
//       const sentencesList = practiceDataset?.sentences?.[level];
//       if (sentencesList && sentencesList.some(item => item.text === text)) {
//         return level;
//       }
//     }
//     return null;
//   };

//   // Loop through all history entries and count
//   historyData.forEach(entry => {
//     const difficulty = getDifficulty(entry.word);
//     if (difficulty === "easy") easyCount++;
//     else if (difficulty === "medium") mediumCount++;
//     else if (difficulty === "hard") hardCount++;
//   });
  
//   // Calculate best score for each word
//   const getBestScore = (attempts) => {
//     return Math.max(...attempts.map(a => a.score));
//   };
  
//   // Calculate improvement trend
//   const getTrend = (attempts) => {
//     if (attempts.length < 2) return '🔸 New';
//     const sorted = [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
//     const first = sorted[0].score;
//     const last = sorted[sorted.length - 1].score;
//     if (last > first) return '📈 Improving';
//     if (last < first) return '📉 Needs practice';
//     return '➡️ Steady';
//   };
  
//   return (
//     <div style={{ 
//       textAlign: "center", 
//       marginTop: 40,
//       padding: "0 20px",
//       fontFamily: "'Comic Sans MS', cursive, sans-serif"
//     }}>
//       <h1 style={{ color: "#9b59b6" }}>📊 My Progress</h1>
      
//       {historyData.length === 0 ? (
//         <div style={{
//           padding: 40,
//           background: "#f8f9fa",
//           borderRadius: 20,
//           margin: "20px auto",
//           maxWidth: 500
//         }}>
//           <p style={{ fontSize: 20 }}>No practice history yet.</p>
//           <p>Go practice some words! 🌟</p>
//         </div>
//       ) : (
//         <>
//           {/* Stats Cards */}
//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 20,
//             flexWrap: "wrap",
//             marginBottom: 30
//           }}>
//             <div style={statCardStyle}>
//               <div style={{ fontSize: 32 }}>📝</div>
//               <div style={{ fontSize: 24, fontWeight: "bold" }}>{totalPracticed}</div>
//               <div>Total Practices</div>
//             </div>
            
//             <div style={statCardStyle}>
//               <div style={{ fontSize: 32 }}>📚</div>
//               <div style={{ fontSize: 24, fontWeight: "bold" }}>{uniqueWords}</div>
//               <div>Unique Words</div>
//             </div>
//           </div>

//           {/* Difficulty Stats Row - NEW */}
//           <div style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 20,
//             flexWrap: "wrap",
//             marginBottom: 30
//           }}>
//             <div style={difficultyCardStyle}>
//               <div style={{ fontSize: 28, color: "#4caf50" }}>📘</div>
//               <div style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{easyCount}</div>
//               <div style={{ fontSize: 14, color: "#666" }}>EASY</div>
//             </div>

//             <div style={difficultyCardStyle}>
//               <div style={{ fontSize: 28, color: "#ff9800" }}>📙</div>
//               <div style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{mediumCount}</div>
//               <div style={{ fontSize: 14, color: "#666" }}>MEDIUM</div>
//             </div>

//             <div style={difficultyCardStyle}>
//               <div style={{ fontSize: 28, color: "#f44336" }}>📕</div>
//               <div style={{ fontSize: 28, fontWeight: "bold", color: "#333" }}>{hardCount}</div>
//               <div style={{ fontSize: 14, color: "#666" }}>HARD</div>
//             </div>
//           </div>
          
//           {/* Grouped History List */}
//           <h2 style={{ color: "#2c3e50", marginTop: 30 }}>📜 Practice History</h2>
          
//           <div style={{
//             maxWidth: 700,
//             margin: "0 auto",
//             textAlign: "left"
//           }}>
//             {sortedWords.map((word) => {
//               const attempts = groupedHistory[word];
//               const bestScore = getBestScore(attempts);
//               const trend = getTrend(attempts);
//               const latestAttempt = attempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
              
//               return (
//                 <div key={word} style={{
//                   background: "white",
//                   border: "2px solid #9b59b6",
//                   borderRadius: 15,
//                   margin: "15px 0",
//                   overflow: "hidden"
//                 }}>
//                   {/* Word Header - Always Visible */}
//                   <div 
//                     onClick={() => setExpandedWord(expandedWord === word ? null : word)}
//                     style={{
//                       padding: "15px 20px",
//                       background: "#f3e5f5",
//                       cursor: "pointer",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       borderBottom: expandedWord === word ? "2px solid #9b59b6" : "none"
//                     }}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
//                       <span style={{ fontSize: 24, fontWeight: "bold", color: "#9b59b6" }}>
//                         {word}
//                       </span>
//                       <span style={{ 
//                         background: bestScore >= 70 ? "#4caf50" : bestScore >= 50 ? "#ff9800" : "#f44336",
//                         color: "white",
//                         padding: "5px 10px",
//                         borderRadius: 20,
//                         fontSize: 14
//                       }}>
//                         Best: {bestScore}%
//                       </span>
//                       <span style={{ fontSize: 14, color: "#666" }}>
//                         {trend}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                       <span style={{ fontSize: 14, color: "#666" }}>
//                         {attempts.length} attempt{attempts.length > 1 ? 's' : ''}
//                       </span>
//                       <span style={{ fontSize: 20 }}>
//                         {expandedWord === word ? '▼' : '▶'}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Expanded Word Section - Shows all attempts */}
//                   {expandedWord === word && (
//                     <div style={{ padding: "15px" }}>
//                       {/* Latest Attempt Summary */}
//                       <div style={{
//                         background: "#f8f9fa",
//                         borderRadius: 10,
//                         padding: "12px",
//                         marginBottom: "15px",
//                         border: "1px solid #ddd"
//                       }}>
//                         <div style={{ fontSize: 14, color: "#666", marginBottom: 5 }}>
//                           Latest practice:
//                         </div>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <div>
//                             <span style={{ fontSize: 18, fontWeight: 'bold' }}>
//                               {latestAttempt.score}%
//                             </span>
//                             <span style={{ marginLeft: 10, color: "#f1c40f" }}>
//                               {"⭐".repeat(latestAttempt.stars)}
//                             </span>
//                           </div>
//                           <div style={{ fontSize: 14, color: "#666" }}>
//                             {latestAttempt.timestamp}
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* All Attempts */}
//                       <h4 style={{ margin: "10px 0", color: "#666" }}>All attempts:</h4>
//                       {attempts
//                         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
//                         .map((entry, idx) => (
//                           <div key={entry.id} style={{
//                             border: "1px solid #e0e0e0",
//                             borderRadius: 10,
//                             margin: "10px 0",
//                             padding: "12px",
//                             background: "#ffffff"
//                           }}>
//                             <div style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               alignItems: "center",
//                               flexWrap: "wrap",
//                               cursor: "pointer"
//                             }}
//                             onClick={() => setExpandedAttempt(expandedAttempt === entry.id ? null : entry.id)}
//                             >
//                               <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                                 <span style={{ fontSize: 16, fontWeight: "bold" }}>
//                                   {entry.score}%
//                                 </span>
//                                 <span style={{ color: "#f1c40f" }}>
//                                   {"⭐".repeat(entry.stars)}
//                                 </span>
//                               </div>
//                               <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//                                 <span style={{ fontSize: 14, color: "#7f8c8d" }}>
//                                   {entry.timestamp}
//                                 </span>
//                                 <span>{expandedAttempt === entry.id ? '▲' : '▼'}</span>
//                               </div>
//                             </div>
                            
//                             {/* Expanded Phoneme Details */}
//                             {expandedAttempt === entry.id && entry.phonemes?.length > 0 && (
//                               <div style={{
//                                 marginTop: 15,
//                                 padding: 15,
//                                 background: "#f8f9fa",
//                                 borderRadius: 10
//                               }}>
//                                 <h5 style={{ margin: "0 0 10px 0", color: "#9b59b6" }}>
//                                   Sound Breakdown:
//                                 </h5>
//                                 <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                                   {entry.phonemes.map((p, idx) => {
//                                     const isGood = p.score >= 70;
//                                     const isOk = p.score >= 50;
//                                     return (
//                                       <div
//                                         key={idx}
//                                         style={{
//                                           padding: "8px 12px",
//                                           background: isGood ? "#d4edda" : isOk ? "#fff3cd" : "#f8d7da",
//                                           borderRadius: 15,
//                                           fontSize: 14,
//                                           border: `1px solid ${
//                                             isGood ? "#c3e6cb" : isOk ? "#ffeeba" : "#f5c6cb"
//                                           }`,
//                                           display: 'flex',
//                                           flexDirection: 'column',
//                                           alignItems: 'center'
//                                         }}
//                                       >
//                                         <strong>{p.sound}</strong>
//                                         <span>{Math.round(p.score)}%</span>
//                                       </div>
//                                     );
//                                   })}
//                                 </div>
                                
//                                 {entry.phonemes.filter(p => p.score < 50).length > 0 && (
//                                   <div style={{ marginTop: 15 }}>
//                                     <h6 style={{ margin: "0 0 5px 0", color: "#e74c3c" }}>
//                                       Practice tips:
//                                     </h6>
//                                     {entry.phonemes
//                                       .filter(p => p.score < 50)
//                                       .map((p, idx) => (
//                                         <div key={idx} style={{ 
//                                           fontSize: 14, 
//                                           margin: "5px 0",
//                                           padding: "5px 10px",
//                                           background: "white",
//                                           borderRadius: 5
//                                         }}>
//                                           • <strong>'{p.sound}'</strong> - {p.hint}
//                                         </div>
//                                       ))}
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
      
//       <button 
//         onClick={onBack}
//         style={{
//           marginTop: 30,
//           padding: "12px 30px",
//           fontSize: 18,
//           background: "#e74c3c",
//           color: "white",
//           border: "none",
//           borderRadius: 25,
//           cursor: "pointer",
//           marginBottom: 40
//         }}
//       >
//         ← Back to Practice
//       </button>
//     </div>
//   );
// }

// const statCardStyle = {
//   background: "white",
//   padding: "15px 25px",
//   borderRadius: 15,
//   border: "2px solid #9b59b6",
//   minWidth: 120,
//   boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
// };

// const difficultyCardStyle = {
//   background: "white",
//   padding: "15px 30px",
//   borderRadius: 15,
//   border: "1px solid #ddd",
//   minWidth: 100,
//   textAlign: "center",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
// };

// export default ProgressPage;
//BEST VERSION 

import React, { useState } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import practiceDataset from "../data/practiceDataset";

function ProgressPage({ onBack, historyData }) {
  const [expandedWord, setExpandedWord] = useState(null);
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Group history by word
  const groupedHistory = historyData.reduce((groups, entry) => {
    const word = entry.word;
    if (!groups[word]) {
      groups[word] = [];
    }
    groups[word].push(entry);
    return groups;
  }, {});

  // Filter words by search term
  const filteredWords = Object.keys(groupedHistory).filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered words alphabetically
  const sortedFilteredWords = [...filteredWords].sort();

  // Pagination logic
  const totalPages = Math.ceil(sortedFilteredWords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWords = sortedFilteredWords.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats
  const totalPracticed = historyData.length;
  const uniqueWords = Object.keys(groupedHistory).length;

  // Count practices per difficulty
  let easyCount = 0;
  let mediumCount = 0;
  let hardCount = 0;

  const getDifficulty = (text) => {
    for (let level of ["easy", "medium", "hard"]) {
      const wordsList = practiceDataset?.words?.[level];
      if (wordsList && wordsList.some(item => item.text === text)) {
        return level;
      }
    }
    for (let level of ["easy", "medium", "hard"]) {
      const sentencesList = practiceDataset?.sentences?.[level];
      if (sentencesList && sentencesList.some(item => item.text === text)) {
        return level;
      }
    }
    return null;
  };

  historyData.forEach(entry => {
    const difficulty = getDifficulty(entry.word);
    if (difficulty === "easy") easyCount++;
    else if (difficulty === "medium") mediumCount++;
    else if (difficulty === "hard") hardCount++;
  });

  // Pie chart data
  const pieData = [
    { name: "EASY", value: easyCount, color: "#4caf50" },
    { name: "MEDIUM", value: mediumCount, color: "#ff9800" },
    { name: "HARD", value: hardCount, color: "#f44336" }
  ].filter(item => item.value > 0);

  // Calculate best score for each word
  const getBestScore = (attempts) => {
    return Math.max(...attempts.map(a => a.score));
  };

  // Calculate improvement trend
  const getTrend = (attempts) => {
    if (attempts.length < 2) return '🔸 New';
    const sorted = [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const first = sorted[0].score;
    const last = sorted[sorted.length - 1].score;
    if (last > first) return '📈 Improving';
    if (last < first) return '📉 Needs practice';
    return '➡️ Steady';
  };

  // Prepare chart data for a word
  const getChartData = (attempts) => {
    const sorted = [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return sorted.map((attempt, index) => ({
      attempt: index + 1,
      score: attempt.score
    }));
  };

  // Handle page change
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div style={{
      textAlign: "center",
      marginTop: 40,
      padding: "0 20px",
      fontFamily: "'Comic Sans MS', cursive, sans-serif"
    }}>
      <h1 style={{ color: "#9b59b6" }}>📊 My Progress</h1>

      {historyData.length === 0 ? (
        <div style={{
          padding: 40,
          background: "#f8f9fa",
          borderRadius: 20,
          margin: "20px auto",
          maxWidth: 500
        }}>
          <p style={{ fontSize: 20 }}>No practice history yet.</p>
          <p>Go practice some words! 🌟</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 30
          }}>
            <div style={statCardStyle}>
              <div style={{ fontSize: 32 }}>📝</div>
              <div style={{ fontSize: 24, fontWeight: "bold" }}>{totalPracticed}</div>
              <div>Total Practices</div>
            </div>

            <div style={statCardStyle}>
              <div style={{ fontSize: 32 }}>📚</div>
              <div style={{ fontSize: 24, fontWeight: "bold" }}>{uniqueWords}</div>
              <div>Unique Words</div>
            </div>
          </div>

          {/* Pie Chart */}
          {pieData.length > 0 && (
            <div style={{
              background: "white",
              borderRadius: 15,
              padding: 20,
              marginBottom: 30,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#555" }}>Practice by Difficulty</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                marginTop: 10,
                fontSize: 14
              }}>
                {pieData.map(item => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 12, height: 12, background: item.color, borderRadius: 2 }}></div>
                    <span>{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div style={{
            maxWidth: 400,
            margin: "0 auto 20px auto",
            textAlign: "left"
          }}>
            <input
              type="text"
              placeholder=" Search words..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 16,
                borderRadius: 25,
                border: "2px solid #9b59b6",
                outline: "none",
                fontFamily: "inherit"
              }}
            />
          </div>

          {/* History List */}
          <h2 style={{ color: "#2c3e50", marginTop: 20 }}>📜 Practice History</h2>

          {paginatedWords.length === 0 ? (
            <div style={{
              padding: 40,
              background: "#f8f9fa",
              borderRadius: 20,
              margin: "20px auto",
              maxWidth: 500
            }}>
              <p style={{ fontSize: 18 }}>No words match "{searchTerm}"</p>
            </div>
          ) : (
            <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "left" }}>
              {paginatedWords.map((word) => {
                const attempts = groupedHistory[word];
                const bestScore = getBestScore(attempts);
                const trend = getTrend(attempts);
                const chartData = getChartData(attempts);
                const hasMultipleAttempts = attempts.length >= 2;

                return (
                  <div key={word} style={{
                    background: "white",
                    border: "2px solid #9b59b6",
                    borderRadius: 15,
                    margin: "15px 0",
                    overflow: "hidden"
                  }}>
                    {/* Word Header */}
                    <div
                      onClick={() => setExpandedWord(expandedWord === word ? null : word)}
                      style={{
                        padding: "15px 20px",
                        background: "#f3e5f5",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 10,
                        borderBottom: expandedWord === word ? "2px solid #9b59b6" : "none"
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 15, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 22, fontWeight: "bold", color: "#9b59b6" }}>
                          {word}
                        </span>
                        <span style={{
                          background: bestScore >= 70 ? "#4caf50" : bestScore >= 50 ? "#ff9800" : "#f44336",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 13
                        }}>
                          Best: {bestScore}%
                        </span>
                        <span style={{ fontSize: 13, color: "#666" }}>
                          {trend}
                        </span>
                        <span style={{ fontSize: 13, color: "#666" }}>
                          {attempts.length} attempt{attempts.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <span style={{ fontSize: 20 }}>
                        {expandedWord === word ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Expanded Content */}
                    {expandedWord === word && (
                      <div style={{ padding: "15px" }}>
                        {/* Mini Line Chart */}
                        {hasMultipleAttempts && (
                          <div style={{
                            background: "#f8f9fa",
                            borderRadius: 10,
                            padding: "12px",
                            marginBottom: "15px",
                            border: "1px solid #ddd"
                          }}>
                            <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>
                              Score Progress:
                            </div>
                        <ResponsiveContainer width="100%" height={120}>
  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis 
      dataKey="attempt" 
      label={{ value: 'Attempt', position: 'insideBottom', offset: -5 }}
      tick={{ fontSize: 12 }}
    />
    <YAxis 
      domain={[0, 100]} 
      label={{ value: 'Score', angle: -90, position: 'insideLeft' }}
      tick={{ fontSize: 12 }}
    />
    <Tooltip />
    <Line 
      type="linear" 
      dataKey="score" 
      stroke="#4caf50" 
      strokeWidth={3} 
      dot={{ r: 5, fill: "#4caf50" }}
    />
  </LineChart>
</ResponsiveContainer>
                            <div style={{
                              fontSize: 12,
                              color: "#888",
                              textAlign: "center",
                              marginTop: 5
                            }}>
                              {attempts.length} attempts • Last: {Math.round(attempts[attempts.length - 1].score)}%
                            </div>
                          </div>
                        )}

                        {!hasMultipleAttempts && (
                          <div style={{
                            background: "#f8f9fa",
                            borderRadius: 10,
                            padding: "12px",
                            marginBottom: "15px",
                            border: "1px solid #ddd",
                            textAlign: "center",
                            color: "#666"
                          }}>
                            📊 Only 1 attempt so far. Practice more to see progress chart!
                          </div>
                        )}

                        {/* All Attempts Section */}
                        <h4 style={{ margin: "10px 0", color: "#666", fontSize: 14 }}>All attempts:</h4>
                        {attempts
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map((entry, idx) => (
                            <div key={entry.id} style={{
                              border: "1px solid #e0e0e0",
                              borderRadius: 10,
                              margin: "8px 0",
                              padding: "10px",
                              background: "#ffffff"
                            }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  flexWrap: "wrap",
                                  cursor: "pointer"
                                }}
                                onClick={() => setExpandedAttempt(expandedAttempt === entry.id ? null : entry.id)}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <span style={{ fontSize: 16, fontWeight: "bold" }}>
                                    {entry.score}%
                                  </span>
                                  <span style={{ color: "#f1c40f" }}>
                                    {"⭐".repeat(entry.stars)}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                  <span style={{ fontSize: 12, color: "#7f8c8d" }}>
                                    {entry.timestamp}
                                  </span>
                                  <span>{expandedAttempt === entry.id ? '▲' : '▼'}</span>
                                </div>
                              </div>

                              {expandedAttempt === entry.id && entry.phonemes?.length > 0 && (
                                <div style={{
                                  marginTop: 12,
                                  padding: 12,
                                  background: "#f8f9fa",
                                  borderRadius: 8
                                }}>
                                  <h5 style={{ margin: "0 0 8px 0", color: "#9b59b6", fontSize: 13 }}>
                                    Sound Breakdown:
                                  </h5>
                                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {entry.phonemes.map((p, idx) => {
                                      const isGood = p.score >= 70;
                                      const isOk = p.score >= 50;
                                      return (
                                        <div
                                          key={idx}
                                          style={{
                                            padding: "6px 10px",
                                            background: isGood ? "#d4edda" : isOk ? "#fff3cd" : "#f8d7da",
                                            borderRadius: 12,
                                            fontSize: 12,
                                            border: `1px solid ${isGood ? "#c3e6cb" : isOk ? "#ffeeba" : "#f5c6cb"}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                          }}
                                        >
                                          <strong>{p.sound}</strong>
                                          <span>{Math.round(p.score)}%</span>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {entry.phonemes.filter(p => p.score < 50).length > 0 && (
                                    <div style={{ marginTop: 12 }}>
                                      <h6 style={{ margin: "0 0 5px 0", color: "#e74c3c", fontSize: 12 }}>
                                        Practice tips:
                                      </h6>
                                      {entry.phonemes
                                        .filter(p => p.score < 50)
                                        .map((p, idx) => (
                                          <div key={idx} style={{
                                            fontSize: 12,
                                            margin: "4px 0",
                                            padding: "4px 8px",
                                            background: "white",
                                            borderRadius: 4
                                          }}>
                                            • <strong>'{p.sound}'</strong> - {p.hint}
                                          </div>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
              marginTop: 30,
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 20px",
                  fontSize: 14,
                  background: currentPage === 1 ? "#ccc" : "#9b59b6",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer"
                }}
              >
                ◀ Previous
              </button>
              <span style={{ fontSize: 14, color: "#555" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 20px",
                  fontSize: 14,
                  background: currentPage === totalPages ? "#ccc" : "#9b59b6",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                }}
              >
                Next ▶
              </button>
            </div>
          )}

          {/* Showing info */}
          <div style={{
            fontSize: 12,
            color: "#888",
            marginTop: 15,
            textAlign: "center"
          }}>
            Showing {paginatedWords.length} of {filteredWords.length} words
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </>
      )}

      <button
        onClick={onBack}
        style={{
          marginTop: 30,
          padding: "12px 30px",
          fontSize: 18,
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: 25,
          cursor: "pointer",
          marginBottom: 40
        }}
      >
        ← Back to Practice
      </button>
    </div>
  );
}

const statCardStyle = {
  background: "white",
  padding: "15px 25px",
  borderRadius: 15,
  border: "2px solid #9b59b6",
  minWidth: 120,
  textAlign: "center",
  boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
};

export default ProgressPage;

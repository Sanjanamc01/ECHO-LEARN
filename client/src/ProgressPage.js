/*Modified progress page */                                                                                                                                                                                       import React, { useState, useEffect } from "react";
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
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import practiceDataset from "../data/practiceDataset";

function ProgressPage({ onBack, historyData, childId }) {
  const [expandedWord, setExpandedWord] = useState(null);
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoneme, setSelectedPhoneme] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null); // "baseline" or "current"
  const [baselineData, setBaselineData] = useState([]);
  const [isLoadingBaseline, setIsLoadingBaseline] = useState(true);
  const itemsPerPage = 10;

  // Load baseline data from server
  useEffect(() => {
    const loadBaselineData = async () => {
      if (!childId) {
        setIsLoadingBaseline(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/get-baseline/${childId}`);
        const data = await res.json();
        setBaselineData(data);
      } catch (err) {
        console.error("Failed to load baseline data:", err);
      } finally {
        setIsLoadingBaseline(false);
      }
    };
    loadBaselineData();
  }, [childId]);

  // Group history by word
  const groupedHistory = historyData.reduce((groups, entry) => {
    const word = entry.word;
    if (!groups[word]) groups[word] = [];
    groups[word].push(entry);
    return groups;
  }, {});

  const filteredWords = Object.keys(groupedHistory).filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedFilteredWords = [...filteredWords].sort();
  const totalPages = Math.ceil(sortedFilteredWords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWords = sortedFilteredWords.slice(startIndex, startIndex + itemsPerPage);

  // Basic stats
  const totalPracticed = historyData.length;
  const uniqueWords = Object.keys(groupedHistory).length;

  // Difficulty counts
  let easyCount = 0, mediumCount = 0, hardCount = 0;

  const getDifficulty = (text) => {
    for (let level of ["easy", "medium", "hard"]) {
      if (practiceDataset?.words?.[level]?.some(i => i.text === text)) return level;
    }
    for (let level of ["easy", "medium", "hard"]) {
      if (practiceDataset?.sentences?.[level]?.some(i => i.text === text)) return level;
    }
    return null;
  };

  historyData.forEach(entry => {
    const d = entry.difficulty || getDifficulty(entry.word);
    if (d === "easy") easyCount++;
    else if (d === "medium") mediumCount++;
    else if (d === "hard") hardCount++;
  });

  const pieData = [
    { name: "EASY", value: easyCount, color: "#4caf50" },
    { name: "MEDIUM", value: mediumCount, color: "#ff9800" },
    { name: "HARD", value: hardCount, color: "#f44336" }
  ].filter(item => item.value > 0);

  // Overall improvement
  const sortedByTime = [...historyData].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );
  const firstFive = sortedByTime.slice(0, 5);
  const lastFive = sortedByTime.slice(-5);
  const firstAvg = firstFive.length
    ? Math.round(firstFive.reduce((s, e) => s + e.score, 0) / firstFive.length)
    : 0;
  const lastAvg = lastFive.length
    ? Math.round(lastFive.reduce((s, e) => s + e.score, 0) / lastFive.length)
    : 0;
  const improvement = lastAvg - firstAvg;

  // Session data
  const getSessionData = () => {
    if (historyData.length === 0) return [];
    const sorted = [...historyData].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const sessions = [];
    let currentSession = { attempts: [], startTime: new Date(sorted[0].timestamp), endTime: new Date(sorted[0].timestamp) };

    for (let i = 0; i < sorted.length; i++) {
      const currentTime = new Date(sorted[i].timestamp);
      const timeSinceLast = currentTime - currentSession.endTime;
      const oneHourInMs = 60 * 60 * 1000;

      if (timeSinceLast > oneHourInMs && currentSession.attempts.length > 0) {
        sessions.push({ ...currentSession });
        currentSession = { attempts: [], startTime: currentTime, endTime: currentTime };
      }
      currentSession.attempts.push(sorted[i]);
      currentSession.endTime = currentTime;
    }
    if (currentSession.attempts.length > 0) sessions.push(currentSession);

    const last7Sessions = sessions.slice(-7).reverse();
    return last7Sessions.map((session, index) => ({
      sessionNumber: index + 1,
      attempts: session.attempts.length,
      date: session.startTime.toLocaleDateString(),
      time: session.startTime.toLocaleTimeString(),
      fullDate: session.startTime.toLocaleString()
    }));
  };

  const sessionData = getSessionData();

  const SessionTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: "white", padding: "8px 12px", borderRadius: 8,
          border: "1px solid #9b59b6", boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 4 }}>Session {data.sessionNumber}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{data.date} at {data.time}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{data.attempts} attempt(s)</div>
        </div>
      );
    }
    return null;
  };

  // Mastered words
  const masteredWords = Object.entries(groupedHistory).filter(([word, attempts]) => {
    if (attempts.length < 3) return false;
    const sorted = [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const lastThree = sorted.slice(-3);
    return lastThree.every(a => a.score >= 70);
  }).map(([word]) => word);

  // Calculate phoneme averages from a given dataset
  const calculatePhonemeAverages = (data, datasetName) => {
    const phonemeMap = {};

    data.forEach(entry => {
      if (entry.phonemes && Array.isArray(entry.phonemes)) {
        entry.phonemes.forEach(p => {
          if (!p.sound) return;
          if (!phonemeMap[p.sound]) {
            phonemeMap[p.sound] = {
              scores: [],
              beginning: [],
              middle: [],
              end: [],
              words: new Set()
            };
          }
          phonemeMap[p.sound].scores.push(p.score);
          if (p.position === "beginning") phonemeMap[p.sound].beginning.push(p.score);
          else if (p.position === "middle") phonemeMap[p.sound].middle.push(p.score);
          else if (p.position === "end") phonemeMap[p.sound].end.push(p.score);
          if (p.wordContext) phonemeMap[p.sound].words.add(p.wordContext);
        });
      }
    });

    const avg = arr => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : null;

    return Object.entries(phonemeMap).map(([sound, data]) => ({
      sound: sound,
      avg: avg(data.scores),
      beginning: avg(data.beginning),
      middle: avg(data.middle),
      end: avg(data.end),
      words: [...data.words]
    })).sort((a, b) => (a.avg || 0) - (b.avg || 0));
  };

  // Current phoneme averages (from regular practice, not baseline)
  const currentPhonemes = calculatePhonemeAverages(historyData, "current");

  // Baseline phoneme averages (only from baseline marked entries)
  const baselinePhonemes = calculatePhonemeAverages(baselineData, "baseline");

  const getPhonemeColor = (score) => {
    if (score === null) return { bg: "#f5f5f5", border: "#ddd", text: "#999" };
    if (score >= 70) return { bg: "#d4edda", border: "#4caf50", text: "#2e7d32" };
    if (score >= 50) return { bg: "#fff3cd", border: "#ff9800", text: "#e65100" };
    return { bg: "#f8d7da", border: "#f44336", text: "#c62828" };
  };

  const renderPhonemeGrid = (phonemes, title, datasetType) => {
    if (phonemes.length === 0) {
      return (
        <div style={{
          background: "#f8f9fa", borderRadius: 15, padding: 20,
          textAlign: "center", color: "#999", height: "100%"
        }}>
          No data available
        </div>
      );
    }

    return (
      <div>
        <h4 style={{ margin: "0 0 15px 0", textAlign: "center", color: datasetType === "baseline" ? "#9b59b6" : "#2196f3" }}>
          {title}
        </h4>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "8px",
          maxHeight: "400px",
          overflowY: "auto",
          padding: "5px"
        }}>
          {phonemes.map(p => {
            const c = getPhonemeColor(p.avg);
            const isSelected = selectedPhoneme === p.sound && selectedDataset === datasetType;
            return (
              <div
                key={p.sound}
                onClick={() => {
                  setSelectedPhoneme(isSelected ? null : p.sound);
                  setSelectedDataset(isSelected ? null : datasetType);
                }}
                style={{
                  background: c.bg,
                  border: `2px solid ${isSelected ? "#9b59b6" : c.border}`,
                  borderRadius: 10,
                  padding: "8px 4px",
                  cursor: "pointer",
                  textAlign: "center",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.2s",
                  boxShadow: isSelected ? "0 4px 12px rgba(155,89,182,0.4)" : "none"
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "bold", color: c.text }}>
                  {p.sound}
                </div>
                <div style={{ fontSize: "12px", color: c.text }}>{p.avg !== null ? `${p.avg}%` : "—"}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Get the selected phoneme data from either baseline or current
  const getSelectedPhonemeData = () => {
    if (!selectedPhoneme) return null;
    if (selectedDataset === "baseline") {
      return baselinePhonemes.find(p => p.sound === selectedPhoneme);
    }
    return currentPhonemes.find(p => p.sound === selectedPhoneme);
  };

  const selectedPhonemeData = getSelectedPhonemeData();

  // Adaptive recommendations (from current practice)
  const weakPhonemes = currentPhonemes.slice(0, 5);
  const recommendations = weakPhonemes.map(p => ({
    sound: p.sound,
    avg: p.avg,
    suggestedWords: p.words.slice(0, 3)
  }));

  // Word card helpers
  const getBestScore = attempts => Math.max(...attempts.map(a => a.score));
  const getTrend = attempts => {
    if (attempts.length < 2) return "New";
    const sorted = [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const first = sorted[0].score;
    const last = sorted[sorted.length - 1].score;
    if (last > first) return "Improving";
    if (last < first) return "Needs practice";
    return "Steady";
  };
  const getChartData = attempts => {
    return [...attempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map((attempt, index) => ({ attempt: index + 1, score: attempt.score }));
  };
  const goToPage = page => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const hasBaseline = baselineData.length >= 21;

  return (
    <div style={{
      textAlign: "center",
      marginTop: 40,
      padding: "0 20px",
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      background: "#e8f4fd",
      minHeight: "100vh"
    }}>
      <h1 style={{ color: "#9b59b6" }}>My Progress</h1>

      {historyData.length === 0 ? (
        <div style={{ padding: 40, background: "#f8f9fa", borderRadius: 20, margin: "20px auto", maxWidth: 500 }}>
          <p style={{ fontSize: 20 }}>No practice history yet.</p>
          <p>Go practice some words!</p>
        </div>
      ) : (
        <>
          {/* Overall Improvement Card */}
          {historyData.length >= 2 && (
            <div style={{
              background: "white", borderRadius: 20, padding: 25,
              maxWidth: 600, margin: "0 auto 25px auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #9b59b6"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#9b59b6" }}>Overall Improvement</h3>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                <div style={{ background: "#f8d7da", borderRadius: 12, padding: "12px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>First attempts avg</div>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: "#c62828" }}>{firstAvg}%</div>
                </div>
                <div style={{ fontSize: 36 }}>→</div>
                <div style={{ background: "#d4edda", borderRadius: 12, padding: "12px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Recent attempts avg</div>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: "#2e7d32" }}>{lastAvg}%</div>
                </div>
                <div style={{
                  background: improvement >= 0 ? "#e8f5e9" : "#fce4ec",
                  borderRadius: 12, padding: "12px 24px", textAlign: "center",
                  border: `2px solid ${improvement >= 0 ? "#4caf50" : "#f44336"}`
                }}>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Change</div>
                  <div style={{ fontSize: 28, fontWeight: "bold", color: improvement >= 0 ? "#2e7d32" : "#c62828" }}>
                    {improvement >= 0 ? "+" : ""}{improvement}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Practice Sessions Chart */}
          {sessionData.length > 0 && (
            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              maxWidth: 700, margin: "0 auto 25px auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #9b59b6"
            }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#9b59b6" }}>Practice Sessions (Last 7)</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sessionData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sessionNumber" tick={{ fontSize: 12 }} label={{ value: "Session", position: "insideBottom", offset: -5 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} label={{ value: "Attempts", angle: -90, position: "insideLeft" }} />
                  <Tooltip content={<SessionTooltip />} />
                  <Bar dataKey="attempts" fill="#9b59b6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Mastered Words */}
          {masteredWords.length > 0 && (
            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              maxWidth: 700, margin: "0 auto 25px auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #4caf50"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#2e7d32" }}>Mastered Words ({masteredWords.length})</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {masteredWords.map(word => (
                  <div key={word} style={{
                    background: "#d4edda", border: "1px solid #4caf50",
                    borderRadius: 20, padding: "6px 16px", fontSize: 14, color: "#2e7d32", fontWeight: "bold"
                  }}>
                    {word}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stat Cards */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 25 }}>
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
            {masteredWords.length > 0 && (
              <div style={{ ...statCardStyle, border: "2px solid #4caf50" }}>
                <div style={{ fontSize: 32 }}>🏆</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#2e7d32" }}>{masteredWords.length}</div>
                <div>Mastered</div>
              </div>
            )}
          </div>

          {/* Pie Chart */}
          {pieData.length > 0 && (
            <div style={{
              background: "white", borderRadius: 15, padding: 20, marginBottom: 25,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: 400, marginLeft: "auto", marginRight: "auto"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#555" }}>Practice by Difficulty</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RePieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                    paddingAngle={5} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}>
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* BEFORE vs AFTER Phoneme Grids */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 25,
            justifyContent: "center"
          }}>
            {/* Baseline Grid */}
            <div style={{
              flex: 1,
              minWidth: 300,
              background: "white",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #9b59b6"
            }}>
              {isLoadingBaseline ? (
                <div style={{ textAlign: "center", padding: 40 }}>Loading baseline data...</div>
              ) : hasBaseline ? (
                renderPhonemeGrid(baselinePhonemes, "Before (Baseline)", "baseline")
              ) : (
                <div style={{ textAlign: "center", padding: 40, color: "#999" }}>
                  No baseline data found.<br />
                  Take the Baseline Test first.
                </div>
              )}
            </div>

            {/* Current Grid */}
            <div style={{
              flex: 1,
              minWidth: 300,
              background: "white",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #2196f3"
            }}>
              {renderPhonemeGrid(currentPhonemes, "After (Current)", "current")}
            </div>
          </div>

          {/* Position Breakdown Panel (when a phoneme is clicked in either grid) */}
          {selectedPhoneme && selectedPhonemeData && (
            <div style={{
              margin: "-15px auto 25px auto",
              padding: 20,
              background: "#f3e5f5",
              borderRadius: 15,
              border: "2px solid #9b59b6",
              maxWidth: 700,
              textAlign: "left"
            }}>
              <h4 style={{ margin: "0 0 15px 0", color: "#9b59b6" }}>
                {selectedDataset === "baseline" ? "Before" : "After"} – /{selectedPhoneme}/ Sound
              </h4>

              {[
                { label: "Beginning", value: selectedPhonemeData.beginning, emoji: "🔵" },
                { label: "Middle", value: selectedPhonemeData.middle, emoji: "🟡" },
                { label: "End", value: selectedPhonemeData.end, emoji: "🔴" }
              ].map(({ label, value, emoji }) => (
                value !== null && (
                  <div key={label} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 14 }}>
                      <span>{emoji} {label}</span>
                      <span style={{ fontWeight: "bold" }}>{value}%</span>
                    </div>
                    <div style={{ background: "#e0e0e0", borderRadius: 10, height: 14, overflow: "hidden" }}>
                      <div style={{
                        width: `${value}%`, height: "100%",
                        background: value >= 70 ? "#4caf50" : value >= 50 ? "#ff9800" : "#f44336",
                        borderRadius: 10, transition: "width 0.5s"
                      }} />
                    </div>
                  </div>
                )
              ))}

              {selectedPhonemeData.words.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>Words practiced:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selectedPhonemeData.words.slice(0, 5).map(w => (
                      <span key={w} style={{
                        background: "white", border: "1px solid #9b59b6",
                        borderRadius: 12, padding: "3px 10px", fontSize: 12, color: "#9b59b6"
                      }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Adaptive Recommendations */}
          {recommendations.length > 0 && (
            <div style={{
              background: "white", borderRadius: 20, padding: 20,
              maxWidth: 700, margin: "0 auto 25px auto",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "2px solid #ff9800"
            }}>
              <h3 style={{ margin: "0 0 8px 0", color: "#e65100" }}>Recommended Practice Today</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {recommendations.map(r => (
                  <div key={r.sound} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: 8, padding: "12px 16px",
                    background: "#fff8e7", borderRadius: 12, border: "1px solid #ffd280"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        background: "#f8d7da", borderRadius: 8, padding: "6px 12px",
                        fontWeight: "bold", color: "#c62828", fontSize: 16
                      }}>
                        {r.sound}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: "#888" }}>Average score</div>
                        <div style={{ fontWeight: "bold", color: "#e65100" }}>{r.avg}%</div>
                      </div>
                    </div>
                    {r.suggestedWords.length > 0 && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: "#888", alignSelf: "center" }}>Practice:</span>
                        {r.suggestedWords.map(w => (
                          <span key={w} style={{
                            background: "#ff9800", color: "white",
                            borderRadius: 12, padding: "4px 12px", fontSize: 13
                          }}>
                            {w}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div style={{ maxWidth: 400, margin: "0 auto 20px auto", textAlign: "left" }}>
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                width: "100%", padding: "12px 16px", fontSize: 16,
                borderRadius: 25, border: "2px solid #9b59b6", outline: "none", fontFamily: "inherit"
              }}
            />
          </div>

          {/* Practice History */}
          <h2 style={{ color: "#2c3e50", marginTop: 20 }}>Practice History</h2>

          {paginatedWords.length === 0 ? (
            <div style={{ padding: 40, background: "#f8f9fa", borderRadius: 20, margin: "20px auto", maxWidth: 500 }}>
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
                    background: "white", border: "2px solid #9b59b6",
                    borderRadius: 15, margin: "15px 0", overflow: "hidden"
                  }}>
                    <div
                      onClick={() => setExpandedWord(expandedWord === word ? null : word)}
                      style={{
                        padding: "15px 20px", background: "#f3e5f5", cursor: "pointer",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        flexWrap: "wrap", gap: 10,
                        borderBottom: expandedWord === word ? "2px solid #9b59b6" : "none"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 22, fontWeight: "bold", color: "#9b59b6" }}>{word}</span>
                        <span style={{
                          background: bestScore >= 70 ? "#4caf50" : bestScore >= 50 ? "#ff9800" : "#f44336",
                          color: "white", padding: "4px 10px", borderRadius: 20, fontSize: 13
                        }}>
                          Best: {bestScore}%
                        </span>
                        <span style={{ fontSize: 13, color: "#666" }}>{trend}</span>
                        <span style={{ fontSize: 13, color: "#666" }}>{attempts.length} attempt(s)</span>
                      </div>
                      <span style={{ fontSize: 20 }}>{expandedWord === word ? "▲" : "▼"}</span>
                    </div>

                    {expandedWord === word && (
                      <div style={{ padding: "15px" }}>
                        {hasMultipleAttempts && (
                          <div style={{
                            background: "#f8f9fa", borderRadius: 10, padding: "12px",
                            marginBottom: "15px", border: "1px solid #ddd"
                          }}>
                            <div style={{ fontSize: 13, color: "#666", marginBottom: 8 }}>Score Progress:</div>
                            <ResponsiveContainer width="100%" height={120}>
                              <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="attempt" label={{ value: "Attempt", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
                                <YAxis domain={[0, 100]} label={{ value: "Score", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                                <Tooltip />
                                <Line type="linear" dataKey="score" stroke="#4caf50" strokeWidth={3} dot={{ r: 5, fill: "#4caf50" }} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        <h4 style={{ margin: "10px 0", color: "#666", fontSize: 14 }}>All attempts:</h4>
                        {attempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((entry) => (
                          <div key={entry.id} style={{ border: "1px solid #e0e0e0", borderRadius: 10, margin: "8px 0", padding: "10px", background: "#ffffff" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", cursor: "pointer" }}
                              onClick={() => setExpandedAttempt(expandedAttempt === entry.id ? null : entry.id)}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: 16, fontWeight: "bold" }}>{entry.score}%</span>
                                <span style={{ color: "#f1c40f" }}>{"⭐".repeat(entry.stars)}</span>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: 12, color: "#7f8c8d" }}>{entry.timestamp}</span>
                                <span>{expandedAttempt === entry.id ? "▲" : "▼"}</span>
                              </div>
                            </div>

                            {expandedAttempt === entry.id && entry.phonemes?.length > 0 && (
                              <div style={{ marginTop: 12, padding: 12, background: "#f8f9fa", borderRadius: 8 }}>
                                <h5 style={{ margin: "0 0 8px 0", color: "#9b59b6", fontSize: 13 }}>Sound Breakdown:</h5>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                  {entry.phonemes.map((p, idx) => {
                                    const isGood = p.score >= 70;
                                    const isOk = p.score >= 50;
                                    return (
                                      <div key={idx} style={{
                                        padding: "6px 10px",
                                        background: isGood ? "#d4edda" : isOk ? "#fff3cd" : "#f8d7da",
                                        borderRadius: 12, fontSize: 12,
                                        border: `1px solid ${isGood ? "#c3e6cb" : isOk ? "#ffeeba" : "#f5c6cb"}`,
                                        display: "flex", flexDirection: "column", alignItems: "center"
                                      }}>
                                        <strong>{p.sound}</strong>
                                        <span>{Math.round(p.score)}%</span>
                                        {p.position && <span style={{ fontSize: 10, color: "#888" }}>({p.position})</span>}
                                      </div>
                                    );
                                  })}
                                </div>
                                {entry.phonemes.filter(p => p.score < 50).length > 0 && (
                                  <div style={{ marginTop: 12 }}>
                                    <h6 style={{ margin: "0 0 5px 0", color: "#e74c3c", fontSize: 12 }}>Practice tips:</h6>
                                    {entry.phonemes.filter(p => p.score < 50).map((p, idx) => (
                                      <div key={idx} style={{ fontSize: 12, margin: "4px 0", padding: "4px 8px", background: "white", borderRadius: 4 }}>
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 15, marginTop: 30 }}>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                style={{ padding: "8px 20px", fontSize: 14, background: currentPage === 1 ? "#ccc" : "#9b59b6", color: "white", border: "none", borderRadius: 20, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
                ◀️ Previous
              </button>
              <span style={{ fontSize: 14, color: "#555" }}>Page {currentPage} of {totalPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                style={{ padding: "8px 20px", fontSize: 14, background: currentPage === totalPages ? "#ccc" : "#9b59b6", color: "white", border: "none", borderRadius: 20, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
                Next ▶️
              </button>
            </div>
          )}
        </>
      )}

      <button onClick={onBack} style={{
        marginTop: 30, padding: "12px 30px", fontSize: 18,
        background: "#e74c3c", color: "white", border: "none",
        borderRadius: 25, cursor: "pointer", marginBottom: 40
      }}>
        ← Back to Practice
      </button>
    </div>
  );
}

const statCardStyle = {
  background: "white", padding: "15px 25px", borderRadius: 15,
  border: "2px solid #9b59b6", minWidth: 120, textAlign: "center",
  boxShadow: "0 5px 10px rgba(0,0,0,0.1)"
};

export default ProgressPage;
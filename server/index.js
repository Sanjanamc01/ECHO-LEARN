// 1) IMPORTS
require("dotenv").config();
//console.log("KEY:", process.env.AZURE_SPEECH_KEY);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 2) CREATE APP
const app = express();
const PORT = 5000;




// 3) MIDDLEWARE
// VERY IMPORTANT — allow frontend origin
// Allow frontend explicitly
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());
//app.use(cors());

const speechRoutes = require("./speech");
app.use("/api", speechRoutes);




// 4) MONGO CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/nudi")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));

// 5) SCHEMA + MODEL
const userSchema = new mongoose.Schema({
  parentName: String,
  parentPassword: String,
  childName: String,
  childPassword: String,
});

// History Schema for storing practice attempts
const historySchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, required: true },
  word: { type: String, required: true },
  score: { type: Number, required: true },
  stars: { type: Number, required: true },
  phonemes: { type: Array, required: true },
  heard: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  date: { type: String, required: true }
});

const History = mongoose.model("History", historySchema);

const User = mongoose.model("User", userSchema);
const tileSchema = new mongoose.Schema({
  category: String,
  tileName: String,
  imageUrl: String
});

const Tile = mongoose.model("Tile", tileSchema);



// 6) CREATE ACCOUNT ROUTE
app.post("/api/create-account", async (req, res) => {
  const { parentName, parentPassword, childName, childPassword } = req.body;

  try {
    const newUser = new User({ parentName, parentPassword, childName, childPassword });
    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating account" });
  }
});

// 7) PARENT LOGIN ROUTE
app.post("/api/login-parent", async (req, res) => {
  const { parentName, parentPassword } = req.body;

  const user = await User.findOne({ parentName, parentPassword });
  if (!user) return res.status(401).json({ message: "Invalid parent credentials" });

  res.status(200).json({ message: "Parent login successful" });
});



// 8) CHILD LOGIN ROUTE
// app.post("/api/login-child", async (req, res) => {
//   const { childName, childPassword } = req.body;

//   const user = await User.findOne({ childName, childPassword });
//   if (!user) return res.status(401).json({ message: "Invalid child credentials" });

//   res.status(200).json({ message: "Child login successful" });
// });

// 8) CHILD LOGIN ROUTE
app.post("/api/login-child", async (req, res) => {
  const { childName, childPassword } = req.body;

  const user = await User.findOne({ childName, childPassword });
  if (!user) return res.status(401).json({ message: "Invalid child credentials" });

  res.status(200).json({ 
    message: "Child login successful",
    childId: user._id
  });
});

// ADD AAC TILE (with URL only for now)
app.post("/api/add-tile", async (req, res) => {
  const { category, tileName, imageUrl } = req.body;

  if (!category || !tileName || !imageUrl) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const tile = new Tile({ category, tileName, imageUrl });
    await tile.save();
    res.status(201).json({ message: "Tile saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "DB Error", error: err });
  }
});
app.get("/api/tiles", async (req, res) => {
  const tiles = await Tile.find();
  res.json(tiles);
});
app.get("/api/azure-token", (req, res) => {
  res.json({
    key: process.env.AZURE_SPEECH_KEY,
    region: process.env.AZURE_SPEECH_REGION
  });
});

// Save practice history
app.post("/api/save-history", async (req, res) => {
  const { childId, word, score, stars, phonemes, heard } = req.body;

  try {
    const newEntry = new History({
      childId,
      word,
      score,
      stars,
      phonemes,
      heard,
      date: new Date().toISOString().split('T')[0]
    });
    await newEntry.save();
    res.status(200).json({ message: "History saved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error saving history", error: err });
  }
});

// Get practice history for a child
app.get("/api/get-history/:childId", async (req, res) => {
  try {
    const history = await History.find({ childId: req.params.childId })
      .sort({ timestamp: -1 });
      
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: "Error fetching history", error: err });
  }
});


// 9) START SERVER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

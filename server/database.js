const mongoose = require("mongoose");                                   // 1

const URI = "mongodb://127.0.0.1:27017/nudi";                           // 2

async function connectDB() {                                            // 3
  try {                                                                 // 4
    await mongoose.connect(URI);                                        // 5
    console.log("MongoDB Connected Successfully");                      // 6
  } catch (err) {                                                       // 7
    console.log("MongoDB Connection Failed:", err.message);             // 8
  }
}

connectDB();                                                            // 9

module.exports = mongoose;                                              // 10

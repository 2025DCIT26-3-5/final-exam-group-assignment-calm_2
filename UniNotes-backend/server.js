require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://UniNotesUser:202301070@uninotes.5wsqju5.mongodb.net/?appName=UniNotes"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Basic route
app.get("/", (req, res) => {
  res.send("UniNotes API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

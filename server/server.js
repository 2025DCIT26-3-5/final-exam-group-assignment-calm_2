// server/server.js (ESM)
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Routes
import userRoutes from "./routes/users.js";
import notesRoutes from "./routes/notes.js";


const app = express();
const PORT = 3000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Atlas Connection */
mongoose
  .connect("mongodb+srv://uninotesUser:uninotesUser123@uninotes.aaus7yd.mongodb.net/uninotes?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));


/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("UniNotes API is running");
});

/* Start server */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

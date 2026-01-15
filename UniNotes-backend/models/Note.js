import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  ratings: { type: [Number], default: [] },
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);

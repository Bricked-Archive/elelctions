import { Schema, model } from "mongoose";

export const candidate = new Schema({
  electionId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Candidate = model("Candidate", candidate);

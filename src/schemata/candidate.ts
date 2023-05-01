import { Document, Model, Schema, model, models } from "mongoose";

export const candidate = new Schema<CandidateDocument>({
  electionId: {
    type: String,
    required: true,
  },
  candidateId: {
    type: String,
    required: true,
  },
});

export interface Candidate {
  electionId: string;
  candidateId: string;
}

interface CandidateBaseDocument extends Candidate, Document {}

export interface CandidateDocument extends CandidateBaseDocument {}

export interface CandidatePopulatedDocument extends CandidateBaseDocument {}

export interface CandidateModel extends Model<CandidateDocument> {}

export default model<CandidateDocument, CandidateModel>(
  "Candidate",
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  models.Candidate ? undefined : candidate
);

import { Document, Model, Schema, model, models } from "mongoose";

export const vote = new Schema<VoteDocument, VoteModel>({
  guildId: {
    type: String,
    required: true,
  },
  election: {
    type: String,
    required: true,
  },
  candidateId: {
    type: String,
    required: true,
  },
  voterId: {
    type: String,
    required: true,
  },
});

export interface Vote {
  guildId: string;
  election: string;
  candidateId: string;
  voterId: string;
}

interface VoteBaseDocument extends Vote, Document {}

export interface VoteDocument extends VoteBaseDocument {}

export interface VotePopulatedDocument extends VoteBaseDocument {}

export interface VoteModel extends Model<VoteDocument> {}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export default model<VoteDocument, VoteModel>("Vote", models.Vote ? undefined : vote);

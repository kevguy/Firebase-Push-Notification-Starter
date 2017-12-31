import * as mongoose from 'mongoose';

export type Token = mongoose.Document & {
  userId: string,
  token: string,
  lang: string,
  type: string
};

const tokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
  lang: String,
  type: String
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);
export default Token;

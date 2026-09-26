import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  gradient: { type: String, default: 'linear-gradient(160deg,#e8b4bc,#c98b93)' }
}, { timestamps: true });

export default mongoose.model('Collection', collectionSchema);

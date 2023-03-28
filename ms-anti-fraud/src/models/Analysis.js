import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId },
    transactionId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

const Analysis = mongoose.model('analysis', analysisSchema);

export default Analysis;

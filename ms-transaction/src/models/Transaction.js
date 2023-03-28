import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    value: { type: Number, require: 'true' },
    clientId: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, enum: ['Approved', 'Analysis', 'Rejected'], require: 'true' },
  },
  {
    versionKey: false,
  },
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

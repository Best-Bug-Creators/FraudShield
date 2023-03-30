import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  customerId: { type: mongoose.Types.ObjectId },
}, { versionKey: false });

const User = mongoose.model('users', userSchema);

export default User;

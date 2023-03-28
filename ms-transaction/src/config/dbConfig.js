import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://admin:secret@mongodb:27017/FraudShield-anti-fraud?authSource=admin');

const db = mongoose.connection;

export default db;

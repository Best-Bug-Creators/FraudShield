import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://root:secret@mongodb-anti-fraud:27017/ms-anti-fraud?authSource=admin');

const db = mongoose.connection;

export default db;

import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://admin:secret@mongodb-anti-fraud:27018/ms-anti-fraud?authSource=admin');

const db = mongoose.connection;

export default db;

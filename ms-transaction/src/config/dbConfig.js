import mongoose from 'mongoose';
import {} from 'dotenv/config';

mongoose.set('strictQuery', true);

mongoose.connect(`mongodb://admin:secret@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`);

const db = mongoose.connection;

export default db;

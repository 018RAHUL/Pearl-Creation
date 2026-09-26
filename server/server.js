import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import collectionsRouter from './routes/collections.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'pearl-creations-api' }));
app.use('/api/collections', collectionsRouter);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
    } else {
      console.log('MONGO_URI not set — API is running with frontend fallback data.');
    }
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Startup error:', error.message);
    process.exit(1);
  }
}
start();

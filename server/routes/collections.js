import express from 'express';
import Collection from '../models/Collection.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const collections = await Collection.find().sort({ createdAt: 1 });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: 'Unable to load collections' });
  }
});

router.post('/', async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;

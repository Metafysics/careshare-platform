import express from 'express';
import CMS from '../models/CMS.js';

const router = express.Router();

// GET all CMS content
router.get('/', async (req, res) => {
  const all = await CMS.find();
  res.json(all);
});

// GET content by slug
router.get('/:slug', async (req, res) => {
  const doc = await CMS.findOne({ slug: req.params.slug });
  if (!doc) return res.status(404).json({ error: 'Niet gevonden' });
  res.json(doc);
});

// PUT update content by slug
router.put('/:slug', async (req, res) => {
  const { content } = req.body;
  const updated = await CMS.findOneAndUpdate(
    { slug: req.params.slug },
    { content, updatedAt: new Date() },
    { new: true, upsert: true }
  );
  res.json(updated);
});

export default router;

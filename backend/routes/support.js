import express from 'express';
import Support from '../models/Support.js';

const router = express.Router();

// POST nieuwe supportvraag
router.post('/', async (req, res) => {
  try {
    const { name, email, role, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Verplichte velden ontbreken' });
    }
    const nieuwBericht = await Support.create({ name, email, role, subject, message });
    res.status(201).json(nieuwBericht);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij opslaan supportbericht' });
  }
});

// GET alle supportvragen (voor admin)
router.get('/', async (req, res) => {
  try {
    const berichten = await Support.find().sort({ createdAt: -1 });
    res.json(berichten);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij ophalen supportberichten' });
  }
});

// PATCH update status en response
router.patch('/:id', async (req, res) => {
  try {
    const { status, response } = req.body;
    const bericht = await Support.findByIdAndUpdate(req.params.id, { status, response, respondedAt: new Date() }, { new: true });
    res.json(bericht);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij bijwerken supportstatus' });
  }
});

export default router;

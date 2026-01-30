const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* ------------------ API ROUTES ------------------ */

// GET all messages
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY timestamp DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// POST a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { text } = req.body;

    const result = await pool.query(
      'INSERT INTO messages(text) VALUES($1) RETURNING *',
      [text]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error posting message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

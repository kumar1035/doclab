const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

/* ---------------- USERS ---------------- */

// Create user
app.post('/api/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------------- MESSAGES ---------------- */

// Get all messages with user name
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                messages.id,
                messages.text,
                messages.timestamp,
                users.name
            FROM messages
            JOIN users ON messages.user_id = users.id
            ORDER BY messages.timestamp DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post message with user
app.post('/api/messages', async (req, res) => {
    try {
        const { text, user_id } = req.body;
        const result = await pool.query(
            'INSERT INTO messages (text, user_id) VALUES ($1, $2) RETURNING *',
            [text, user_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log('Backend running on port 5000');
});

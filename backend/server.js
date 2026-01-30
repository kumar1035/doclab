

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://database:27017/doclab';

// --- MongoDB Connection ---
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// --- Mongoose Schema and Model ---
const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// --- API Routes ---
// Get all messages
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Post a new message
app.post('/api/messages', async (req, res) => {
    const newMessage = new Message({ text: req.body.text });
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(400).json({ message: 'Error posting message' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
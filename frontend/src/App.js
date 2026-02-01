import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');

    const API_URL = '/api/messages';
    const USER_API = '/api/users';

    // Fetch messages
    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(() => setError('Failed to fetch messages'));
    }, []);

    // Create user once
    const createUser = async () => {
        const res = await fetch(USER_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: username,
                email: `${username}@doclab.com`
            })
        });
        const data = await res.json();
        setUserId(data.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !username.trim()) return;

        if (!userId) await createUser();

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: newMessage,
                user_id: userId
            })
        });

        const data = await res.json();
        setMessages([data, ...messages]);
        setNewMessage('');
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Message Board</h1>
                <p className="subtitle">
                    Dockerized Full-Stack App 
                </p>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="message-form">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>

                <div className="message-list">
                    {messages.map(msg => (
                        <div key={msg.id} className="message-item">
                            <p>
                                <strong>{msg.name}</strong>: {msg.text}
                            </p>
                            <span>
                                {new Date(msg.timestamp).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;

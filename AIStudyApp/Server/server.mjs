import express from 'express';
import axios from 'axios';
import os from 'os';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const users = [
    { username: 'admin', password: 'admin' }, 
  ];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.json({ success: true, message: 'Authentication successful' });
    } else {
        res.status(401).json({ success: false, message: 'Authentication failed. User not found or wrong password.' });
    }
});

app.post('/generate-question', async (req, res) => {
    const { userInput } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'Generate one Multiple Choice Quiz Question based on the notes provided. The answer should be the first of the answer choices. Be sure there are at least 4 answer choices. Make the questions unique from previous questions' },
                    { role: 'user', content: userInput },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    //FIX HERE
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get a response from OpenAI.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach((interfaceName) => {
        networkInterfaces[interfaceName].forEach((iface) => {
            if ('IPv4' === iface.family && !iface.internal) {
                console.log(`Server is running on http://${iface.address}:${port}`);
            }
        });
    });
});

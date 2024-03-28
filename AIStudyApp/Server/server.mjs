import express from 'express';
import axios from 'axios';
import os from 'os';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
// If on Windows, you might need to adjust __filename like so:
// const __filename = path.resolve(new URL(import.meta.url).pathname.substring(1));
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'credentials.json');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const users = JSON.parse(data);
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            return res.status(400).json({ success: false, message: 'Registration failed. User already exists.' });
        }

        users.push({ username, password });
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), { encoding: 'utf8' });
        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error handling registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.json({ success: true, message: 'Authentication successful' });
        } else {
            res.status(401).json({ success: false, message: 'Authentication failed. User not found or wrong password.' });
        }
    } catch (error) {
        console.error('Error handling login:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
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
                    'Authorization': `Bearer API KEY HERE`, // Use environment variable
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Failed to generate question:', error);
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

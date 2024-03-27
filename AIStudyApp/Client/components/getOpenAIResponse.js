import axios from 'axios';
import shuffleArray from './shuffleArray';

const getOpenAIResponse = async (userInput, setCurrentQuestion, setApiResponse, setChatHistory, chatHistory, setFeedback) => {
    try {
        const response = await axios.post('http://129.82.44.245:3000/generate-question', {
            userInput: userInput,
        });
        const data = response.data;
        const content = data.choices[0].message.content;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const question = lines[0];
        let correctAnswerIndex = 0;
        if (!(lines[1] && lines[1].charAt(0).toUpperCase() === 'A' && lines[1].charAt(1) === ')')) {
            correctAnswerIndex = 1;
        }
        let choices = lines.slice(1).map((line, index) => ({
            label: line.charAt(0),
            text: line.slice(3),
            isCorrect: index === correctAnswerIndex
        }));
        choices = shuffleArray(choices);
        setCurrentQuestion({ question, choices });
        setChatHistory([...chatHistory, { role: 'user', content: userInput }, { role: 'ai', content: question }]);
        setFeedback('');
    } catch (error) {
        console.error(error);
        setApiResponse('Failed to get a response.');
        setFeedback('Failed to get a response.');
    }
};

export default getOpenAIResponse;

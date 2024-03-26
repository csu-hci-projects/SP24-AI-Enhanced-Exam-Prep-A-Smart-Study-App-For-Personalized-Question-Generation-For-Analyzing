import axios from 'axios';
import shuffleArray from './shuffleArray';

const getOpenAIResponse = async (userInput, setCurrentQuestion, setApiResponse, setChatHistory, chatHistory, setFeedback) => {
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
                    'Authorization': 'Bearer DeleteThissk-07gGfvhERvsCWet5NyErT3BlbkFJs2OEvlQlIwFxu7TglyS9',
                }
            }
        );
        const data = response.data;
        const content = data.choices[0].message.content;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const question = lines[0];
        let correctAnswerIndex = 0; 
        if (!(lines[1] && lines[1].charAt(0) === 'A' && lines[1].charAt(1) === ')')) { 
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
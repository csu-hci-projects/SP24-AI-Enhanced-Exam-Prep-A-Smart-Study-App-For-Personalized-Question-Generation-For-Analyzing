import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from './styles';


export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ question: '', choices: [] });
  const [feedback, setFeedback] = useState('');
  const [apiResponse, setApiResponse] = useState('');

  const getOpenAIResponse = async () => {
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
                    'Authorization': 'Bearer deleteThissk-07gGfvhERvsCWet5NyErT3BlbkFJs2OEvlQlIwFxu7TglyS9',
                }
            }
        );
        setApiResponse(JSON.stringify(response.data, null, 2));
        const content = response.data.choices[0].message.content;
        const lines = content.split('\n').filter(line => line.trim() !== '');
        const question = lines[0];
        let correctAnswerIndex = 0; 
        if (lines[1] && lines[1].charAt(0) === 'A' && lines[1].charAt(1) === ')') { 
        } else {
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


  const handleAnswerSelect = (choiceLabel) => {
    const correctChoice = currentQuestion.choices.find(choice => choice.isCorrect); 
    if (choiceLabel === correctChoice.label) {
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong, try again!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Study App</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setUserInput}
        value={userInput}
        placeholder="Enter your notes here"
        multiline={true}
        numberOfLines={4}
      />
      <Button title="Generate A Question" onPress={getOpenAIResponse} />
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.choicesContainer}>
        {currentQuestion.choices.map((choice, index) => (
          <TouchableOpacity key={index} style={styles.choiceButton} onPress={() => handleAnswerSelect(choice.label)}>
            <Text style={styles.choiceText}>{choice.label}. {choice.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.feedback}>{feedback}</Text>
      <ScrollView style={{ ...styles.chatContainer, maxHeight: 200 }}>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{apiResponse}</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}



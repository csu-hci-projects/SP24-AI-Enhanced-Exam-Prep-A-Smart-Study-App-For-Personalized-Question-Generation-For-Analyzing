import React, { useState } from 'react';
import { View, Button, StatusBar, Text } from 'react-native'; 
import getOpenAIResponse from './getOpenAIResponse';
import handleAnswerSelect from './handleAnswerSelect';
import styles from '../styles'; 
import HeaderComponent from './HeaderComponent';
import TextInputComponent from './TextInputComponent';
import ChoicesContainer from './ChoicesContainer';
import ChatHistoryComponent from './ChatHistoryComponent';

const MainContent = ({ navigation }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({ question: '', choices: [] });
    const [feedback, setFeedback] = useState('');
    const [apiResponse, setApiResponse] = useState('');

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <TextInputComponent userInput={userInput} setUserInput={setUserInput} />
            <Button 
                title="Generate A Question" 
                onPress={() => getOpenAIResponse(userInput, setCurrentQuestion, setApiResponse, setChatHistory, chatHistory, setFeedback)} 
            />
            <Text style={styles.question}>{currentQuestion.question}</Text>
            <ChoicesContainer choices={currentQuestion.choices} handleAnswerSelect={(choiceLabel) => handleAnswerSelect(choiceLabel, currentQuestion, setFeedback)} />
            <Text style={styles.feedback}>{feedback}</Text>
            <ChatHistoryComponent apiResponse={apiResponse} />
            <StatusBar style="auto" />
        </View>
    );
};

export default MainContent;

import React, { useState, useEffect } from 'react';
import { View, Button, StatusBar, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'; 
import { Picker } from '@react-native-picker/picker';
import getOpenAIResponse from './getOpenAIResponse';
import handleAnswerSelect from './handleAnswerSelect';
import styles from '../styles'; 
import HeaderComponent from './HeaderComponent';
import ChoicesContainer from './ChoicesContainer';
import ChatHistoryComponent from './ChatHistoryComponent';
import axios from 'axios';

const MainContent = ({ route, navigation }) => {
    const [selectedNoteContent, setSelectedNoteContent] = useState('');
    const [notes, setNotes] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({ question: '', choices: [] });
    const [feedback, setFeedback] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const username = route.params?.username;

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`http://129.82.44.102:3000/notes/${username}`);
            setNotes(response.data.notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.container}>
                <StatusBar style="auto" />
                <HeaderComponent />
                <Picker
                    selectedValue={selectedNoteContent}
                    onValueChange={(itemValue) => {
                        setSelectedNoteContent(itemValue);
                    }}
                    style={{ height: 50, width: '100%' }}
                >
                    {notes.map((note, index) => (
                        <Picker.Item label={note.title} value={note.content} key={index} />
                    ))}
                </Picker>
                <Button 
                    title="Generate A Question" 
                    onPress={() =>  {
                        Keyboard.dismiss();
                        getOpenAIResponse(selectedNoteContent, setCurrentQuestion, setApiResponse, setChatHistory, chatHistory, setFeedback);
                    }} 
                />
                <Button 
                    title="Notes" 
                    onPress={() => {
                        Keyboard.dismiss();
                        navigation.navigate('Notes', { username: username });
                    }}
                />
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <ChoicesContainer choices={currentQuestion.choices} handleAnswerSelect={(choiceLabel) => handleAnswerSelect(choiceLabel, currentQuestion, setFeedback)} />
                <Text style={styles.feedback}>{feedback}</Text>
                <ChatHistoryComponent apiResponse={apiResponse} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default MainContent;

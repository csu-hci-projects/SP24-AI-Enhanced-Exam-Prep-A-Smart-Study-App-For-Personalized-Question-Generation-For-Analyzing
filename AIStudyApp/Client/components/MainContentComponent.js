import React, { useState, useEffect } from 'react';
import { View, Button, StatusBar, Text, KeyboardAvoidingView, Platform, Keyboard, TouchableOpacity } from 'react-native'; 
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

    const getRandomSnippet = (noteContent) => {
        const lines = noteContent.split('\n');
        const start = Math.floor(Math.random() * lines.length);
        const end = Math.min(start + Math.floor(Math.random() * (lines.length - start)), lines.length);
        return lines.slice(start, end).join('\n');
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <View style={styles.container}>
                <StatusBar style="auto" />
                <HeaderComponent username={username} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
                    <Picker
                        selectedValue={selectedNoteContent}
                        onValueChange={(itemValue, itemIndex) => setSelectedNoteContent(itemValue)}
                        style={{ flex: 1, borderColor: 'gray', borderWidth: 0.1, padding: 10, borderRadius: 5}}
                    >
                        <Picker.Item label="Select a note" value="" />
                        {notes.map((note, index) => (
                            <Picker.Item label={note.title} value={note.content} key={index} />
                        ))}
                    </Picker>
                </View>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <ChoicesContainer choices={currentQuestion.choices} handleAnswerSelect={(choiceLabel) => handleAnswerSelect(choiceLabel, currentQuestion, setFeedback)} />
                <Text style={styles.feedback}>{feedback}</Text>
                <Button 
                    title="Generate A Question" 
                    onPress={() => {
                        Keyboard.dismiss();
                        const lines = selectedNoteContent.split('\n').filter(line => line.trim() !== '');

                        if (lines.length >= 5) {
                            const start = Math.floor(Math.random() * (lines.length - 4));
                            const selectedLines = lines.slice(start, start + 5).join('\n');

                            getOpenAIResponse(selectedLines, setCurrentQuestion, setApiResponse, setChatHistory, chatHistory, setFeedback);
                        } else {
                            setFeedback('Selected note does not contain enough content for generating questions.');
                        }
                    }} 
                />
                <ChatHistoryComponent apiResponse={apiResponse} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default MainContent;

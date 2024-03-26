import React, { useState } from 'react';
import { Text, View, Button, TextInput, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import getOpenAIResponse from './components/getOpenAIResponse';
import handleAnswerSelect from './components/handleAnswerSelect';
import styles from './styles';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({ question: '', choices: [] });
  const [feedback, setFeedback] = useState('');
  const [apiResponse, setApiResponse] = useState('');

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
      <Button 
        title="Generate A Question" 
        onPress={() => getOpenAIResponse(
          userInput, 
          setCurrentQuestion, 
          setApiResponse, 
          setChatHistory, 
          chatHistory, 
          setFeedback
        )} 
      />
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.choicesContainer}>
        {currentQuestion.choices.map((choice, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.choiceButton} 
            onPress={() => handleAnswerSelect(choice.label, currentQuestion, setFeedback)}
          >
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

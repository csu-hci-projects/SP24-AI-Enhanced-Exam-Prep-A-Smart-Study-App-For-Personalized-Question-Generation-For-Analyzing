import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';

export default function App() {
  const [responseText, setResponseText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const getOpenAIResponse = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer deleteThissk-07gGfvhERvsCWet5NyErT3BlbkFJs2OEvlQlIwFxu7TglyS9`,
          },
        }
      );
      setChatHistory([...chatHistory, { role: 'user', content: userInput }, { role: 'ai', content: response.data.choices[0].message.content }]);
      setUserInput('');
    } catch (error) {
      console.error(error);
      setResponseText('Failed to get a response.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <Text key={index} style={chat.role === 'user' ? styles.userChat : styles.aiChat}>{chat.content}</Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUserInput}
          value={userInput}
          placeholder="Type your message here"
        />
        <Button title="Send" onPress={getOpenAIResponse} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  userChat: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  aiChat: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import axios from 'axios';

export default function App() {
  const [responseText, setResponseText] = useState('');

  const getOpenAIResponse = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/openai');
      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      setResponseText('Failed to get a response. Error: ' + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Response from OpenAI:</Text>
      <Text>{responseText}</Text>
      <Button title="Get Response from OpenAI" onPress={getOpenAIResponse} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

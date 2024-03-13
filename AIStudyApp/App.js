import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import axios from 'axios';

export default function App() {
  const [responseText, setResponseText] = useState('');

  const getOpenAIResponse = async () => {
    try {
      // In a real app, replace the direct API call with a request to your own backend.
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,

          },
        }
      );
      setResponseText(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResponseText('Failed to get a response.');
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

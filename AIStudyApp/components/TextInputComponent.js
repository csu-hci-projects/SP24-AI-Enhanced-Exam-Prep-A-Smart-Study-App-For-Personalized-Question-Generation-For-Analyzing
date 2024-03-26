import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles'; 

const TextInputComponent = ({ userInput, setUserInput }) => (
    <TextInput
        style={styles.input}
        onChangeText={setUserInput}
        value={userInput}
        placeholder="Enter your notes here"
        multiline={true}
        numberOfLines={4}
    />
);

export default TextInputComponent;

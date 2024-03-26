import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const ChoicesContainer = ({ choices, handleAnswerSelect }) => (
    <View style={styles.choicesContainer}>
        {
            choices.map((choice, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={styles.choiceButton} 
                    onPress={() => handleAnswerSelect(choice.label)}
                >
                    <Text style={styles.choiceText}>
                        {choice.label}. {choice.text}
                    </Text>
                </TouchableOpacity>
            ))
        }
    </View>
);

export default ChoicesContainer;

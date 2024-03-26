
import React from 'react';
import { ScrollView, Text } from 'react-native';
import styles from '../styles';

const ChatHistoryComponent = ({ apiResponse }) => (
    <ScrollView style={{ ...styles.chatContainer, maxHeight: 200 }}>
        <Text style={{ whiteSpace: 'pre-wrap' }}>{apiResponse}</Text>
    </ScrollView>
);

export default ChatHistoryComponent;

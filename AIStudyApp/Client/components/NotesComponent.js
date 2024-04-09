import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
// Assuming your styles are defined in a separate file, import them here
import styles from '../styles';

const NotesComponent = ({ route }) => {
    const [userNotes, setUserNotes] = useState([]);
    const username = route.params?.username;

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`http://129.82.44.102:3000/notes/${username}`);
                setUserNotes(response.data.notes);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [username]);

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Notes</Text>
            </View>
            {userNotes.length ? (
                userNotes.map((note, index) => (
                    <View key={index} style={styles.noteContainer}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                        <Text style={styles.noteContent}>{note.content}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.feedback}>No notes found.</Text>
            )}
        </ScrollView>
    );
};



export default NotesComponent;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import styles from '../styles';

const NotesComponent = ({ route }) => {
    const [userNotes, setUserNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const username = route.params?.username;

    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://129.82.44.102:3000/notes/${username}`);
            setUserNotes(response.data.notes);
            // Initialize expanded states if needed
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotes().then(() => setRefreshing(false));
    }, [fetchNotes]);

    const showNoteDetails = useCallback((note) => {
        setSelectedNote(note);
        setModalVisible(true);
    }, []);

    const hideModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Notes</Text>
            </View>
            {isLoading ? (
                <Text style={styles.feedback}>Loading...</Text>
            ) : userNotes.length ? (
                userNotes.map((note) => (
                    <TouchableOpacity key={note.id} onPress={() => showNoteDetails(note)} style={styles.noteContainer}>
                        <Text style={styles.noteTitle}>{note.title}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.feedback}>No notes found.</Text>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        {selectedNote && (
                            <>
                                <Text style={modalStyles.modalText}>{selectedNote.title}</Text>
                                <Text>{selectedNote.content}</Text>
                                {selectedNote.section && selectedNote.section.map((section, index) => (
                                    <View key={index}>
                                        <Text style={modalStyles.sectionTitle}>{section.title}</Text>
                                        <Text>{section.content}</Text>
                                    </View>
                                ))}
                                <br />
                                <Button onPress={hideModal} title="Close" />
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default NotesComponent;

// You may need to adjust these styles
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    sectionTitle: {
        fontWeight: "bold"
    }
});

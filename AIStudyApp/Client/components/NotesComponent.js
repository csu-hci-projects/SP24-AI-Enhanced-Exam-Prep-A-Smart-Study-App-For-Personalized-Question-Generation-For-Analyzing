import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
import styles from '../styles';

const NotesComponent = ({ route }) => {
    const [userNotes, setUserNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editNote, setEditNote] = useState({ id: '', title: '', content: '' });
    const username = route.params?.username;

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://129.82.44.102:3000/notes/${username}`);
            setUserNotes(response.data.notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotes().then(() => setRefreshing(false));
    }, [fetchNotes]);

    const showNoteDetails = (note) => {
        setSelectedNote(note);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const startEditNote = (note) => {
        setEditNote({ ...note });
        setEditModalVisible(true);
    };

    const hideEditModal = () => {
        setEditModalVisible(false);
    };

    const saveNote = async () => {
        try {
            await axios.patch(`http://129.82.44.102:3000/notes/${username}`, {
                title: editNote.title,
                newNote: editNote
            });
            setEditModalVisible(false);
            fetchNotes();
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const renderNoteItem = (note) => (
        <View key={note.id} style={styles.noteContainer}>
            <TouchableOpacity onPress={() => showNoteDetails(note)}>
                <Text style={styles.noteTitle}>{note.title}</Text>
            </TouchableOpacity>
            <Button title="Edit" onPress={() => startEditNote(note)} />
        </View>
    );

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
                userNotes.map(renderNoteItem)
            ) : (
                <Text style={styles.feedback}>No notes found.</Text>
            )}
            {renderNoteModal()}
            {renderEditNoteModal()}
        </ScrollView>
    );

    function renderNoteModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hideModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {selectedNote && (
                            <>
                                <Text style={styles.modalText}>{selectedNote.title}</Text>
                                <Text>{selectedNote.content}</Text>
                                {selectedNote.section && selectedNote.section.map((section, index) => (
                                    <View key={index}>
                                        <Text style={styles.sectionTitle}>{section.title}</Text>
                                        <Text>{section.content}</Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </View>
                    <Button style={styles.closeButton} onPress={hideModal} title="Close" />
                </View>
            </Modal>
        );
    }

    function renderEditNoteModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={hideEditModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setEditNote(prevState => ({ ...prevState, title: text }))}
                            value={editNote.title}
                            placeholder="Note Title"
                        />
                        <TextInput
                            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                            onChangeText={(text) => setEditNote(prevState => ({ ...prevState, content: text }))}
                            value={editNote.content}
                            placeholder="Note Content"
                            multiline={true}
                        />
                        <Button onPress={saveNote} title="Save" />
                    </View>
                </View>
            </Modal>
        );
    }
};

export default NotesComponent;

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
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    const [showAddNote, setShowAddNote] = useState(false);


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

    const deleteNote = async (noteTitle) => {
        console.log(`Attempting to delete note: ${noteTitle}`);
        try {
            const encodedTitle = encodeURIComponent(noteTitle);
            console.log(`Encoded title: ${encodedTitle}`);
            const response = await axios.delete(`http://129.82.44.102:3000/notes/${username}/${encodedTitle}`);
            console.log('Deletion response:', response.data);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    
    const addNewNote = async () => {
        if (!newNoteTitle || !newNoteContent) {
            alert('Title and content are required');
            return;
        }
    
        try {
            const response = await axios.post(`http://129.82.44.102:3000/notes/${username}/add`, {
                title: newNoteTitle,
                content: newNoteContent
            });
            alert(response.data.message);
            setNewNoteTitle('');
            setNewNoteContent('');
            fetchNotes();
        } catch (error) {
            console.error('Error adding new note:', error);
            alert('Failed to add note');
        }
    };
    

    const renderNoteItem = (note, index) => {
        if (index === 0) {
            return (
                <>
                    <TouchableOpacity
                        key="add-note"
                        onPress={() => setShowAddNote(!showAddNote)}
                        style={{...styles.noteContainer, width: '100%'}}
                    >
                        <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>
                            {showAddNote ? "Hide Add Note" : "Add Note"}
                        </Text>
                    </TouchableOpacity>
                    {showAddNote && (
                        <>
                            <TextInput
                                style={{ ...styles.input, width: '100%' }}
                                value={newNoteTitle}
                                onChangeText={setNewNoteTitle}
                                placeholder="New Note Title"
                            />
                            <TextInput
                                style={[styles.input, { height: 300, textAlignVertical: 'top', width: '100%' }]}
                                value={newNoteContent}
                                onChangeText={setNewNoteContent}
                                placeholder="New Note Content"
                                multiline={true}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    addNewNote();
                                    setShowAddNote(false);
                                }}
                                style={{
                                    width: '100%',
                                    marginTop: 10,
                                    backgroundColor: '#2196F3',
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 5
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Add Note</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            );
        }
    
        return (
            <View key={note.id} style={styles.noteContainer}>
                <TouchableOpacity onPress={() => showNoteDetails(note)}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={() => startEditNote(note)} />
                    <Button title="Delete" color="red" onPress={() => deleteNote(note.title)} />
                </View>
            </View>
        );
    };
    

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Your Notes</Text>
            </View>
            {isLoading ? (
                <Text style={styles.feedback}>Loading...</Text>
            ) : (
                <View style={styles.notesListContainer}>
                    {[{ id: 'add-note', special: true }, ...userNotes].map((note, index) => (
                        <View key={note.id || `note-${index}`} style={styles.noteContainer}>
                            {renderNoteItem(note, index)}
                        </View>
                    ))}
                </View>
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
                        <TextInput
                            style={[styles.input, { color: 'black', height: '50%', textAlignVertical: 'top' }]}
                            value={editNote.content}
                            placeholder={selectedNote.content} 
                            multiline={true}
                            editable={false}
                        />
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
                        <Text>{editNote.title}</Text>
                        <TextInput
                            style={[styles.input, { height: '50%', textAlignVertical: 'top' }]}
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

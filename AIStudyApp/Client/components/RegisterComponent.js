import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles';

const RegisterComponent = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.RegisterContainer}
        >
            <View style={styles.RegisterFormContainer}>
                <Text style={styles.RegisterHeader}>Register</Text>
                <TextInput 
                    placeholder="Username" 
                    value={username}
                    onChangeText={setUsername}
                    style={styles.RegisterInput} 
                />
                <TextInput 
                    placeholder="Password" 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true} 
                    style={styles.RegisterInput} 
                />
                <TouchableOpacity 
                    style={styles.RegisterButton} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.RegisterButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterComponent;

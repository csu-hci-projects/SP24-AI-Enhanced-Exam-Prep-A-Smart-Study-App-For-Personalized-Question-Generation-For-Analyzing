import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import styles from '../styles';

const RegisterComponent = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            const response = await fetch('http://129.82.44.102:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();
            if (data.success) {
                navigation.navigate('Login');
            } else {
                Alert.alert("Registration Failed", data.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert("Error", "Failed to register. Please try again later.");
        }
    };

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
                    onPress={registerUser} 
                >
                    <Text style={styles.RegisterButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default RegisterComponent;

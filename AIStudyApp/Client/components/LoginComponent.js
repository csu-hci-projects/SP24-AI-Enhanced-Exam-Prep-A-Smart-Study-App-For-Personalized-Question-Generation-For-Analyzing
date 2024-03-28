import React, { useState } from 'react';
import { View, TextInput, Alert, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const loginDetails = {
            username,
            password,
        };

        fetch('http://129.82.44.245:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                navigation.navigate('Main');
            } else {
                Alert.alert('Login Failed', data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            Alert.alert('Login Failed', 'Unable to connect to the server.');
        });
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={styles.RegisterContainer}
        >
            <View style={styles.RegisterFormContainer}>
                <Text style={styles.RegisterHeader}>Login</Text>
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
                    secureTextEntry
                    style={styles.RegisterInput}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.RegisterButton}>
                    <Text style={styles.RegisterButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#4a90e2', fontSize: 16 }}>Don't Have An Account? Register here!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginPage;

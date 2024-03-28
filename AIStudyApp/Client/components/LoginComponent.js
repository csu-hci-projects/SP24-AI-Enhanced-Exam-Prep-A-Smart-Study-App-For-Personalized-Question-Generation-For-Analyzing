import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import styles from '../styles';

const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const loginDetails = {
            username,
            password,
        };

        fetch('http:///129.82.44.245:3000/login', {
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
        <View style={styles.LoginContainer}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.LoginInput}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.LoginInput}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginPage;


import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'; 

const HeaderComponent = () => (
    <View style={styles.header}>
        <Text style={styles.headerText}>Study App</Text>
    </View>
);

export default HeaderComponent;

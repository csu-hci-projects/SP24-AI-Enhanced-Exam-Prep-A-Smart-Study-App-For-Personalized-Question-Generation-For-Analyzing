import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const HeaderComponent = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Study App</Text>
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
            {menuVisible && (
                <View style={styles.menuContainer}>
                    <Text style={styles.menuItem}>Item 1</Text>
                    <Text style={styles.menuItem}>Item 2</Text>
                    <Text style={styles.menuItem}>Item 3</Text>
                </View>
            )}
        </View>
    );
};

export default HeaderComponent;

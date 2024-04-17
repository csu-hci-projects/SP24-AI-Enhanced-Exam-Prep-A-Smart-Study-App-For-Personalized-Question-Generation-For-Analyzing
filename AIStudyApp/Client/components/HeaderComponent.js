import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles';

const HeaderComponent = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Intellinote</Text>
        </View>
    );
};

export default HeaderComponent;

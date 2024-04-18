import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';

const HeaderComponent = ({ username }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.logo}>Intellinote</Text>
            </View>
            <View style={[styles.headerSection, { justifyContent: 'center' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('Notes', { username })}>
                    <Text style={styles.headerText}>Notes</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.headerSection, { justifyContent: 'flex-end' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.headerText}>About the Team!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default HeaderComponent;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Mason from '../assets/Mason-Photo.jpg';
import Aaron from '../assets/Aaron-Marti.jpg';
// import Maddie from '../assets/Maddie-Photo.jpg';
// import Karla from '../assets/Karla-Photo.jpg';
// import Carolyn from '../assets/Carolyn-Photo.jpg';
// import Olivia from '../assets/Olivia-Photo.jpg';
// import Caven from '../assets/Caven-Photo.jpg';

const AboutUs = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>About Us</Text>
            <Text>We are a team of dedicated individuals working on the AI Enhanced Exam Prep project. Our goal is to provide personalized question generation for effective studying.</Text>
            <View style={styles.teamContainer}>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Aaron Marti</Text>
                    <Image source={Aaron} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Mason Coco</Text>
                    <Image source={Mason} style={styles.teamMemberImage} />
                </View>
                {/* <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Maddie Kerl</Text>
                    <Image source={Maddie} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Karla</Text>
                    <Image source={Karla} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Carolyn Kelley</Text>
                    <Image source={Carolyn} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Olivia Kelley</Text>
                    <Image source={Olivia} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Caven Konkey</Text>
                    <Image source={Caven} style={styles.teamMemberImage} />
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    teamContainer: {
        marginTop: 20,
    },
    teamMember: {
        alignItems: 'center',
        marginBottom: 20,
    },
    memberName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    teamMemberImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default AboutUs;

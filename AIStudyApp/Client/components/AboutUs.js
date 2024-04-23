import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Mason from '../assets/Mason-Photo.jpg';
import Aaron from '../assets/Aaron-Marti.jpg';
import Maddie from '../assets/Maddie.png';
import Caven from '../assets/Caven.png';
import Karla from '../assets/Karla.png';
import Carolyn from '../assets/Carolyn.png';
import Olivia from '../assets/Olivia.png';


const AboutUs = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>About Us</Text>
            <Text>At Intellinote, we are driven by a singular vision: to transform the way students engage with their studies through cutting-edge technology and personalized learning experiences. Our team comprises passionate professionals from various fields, including education, technology, and design, all committed to redefining the academic journey.</Text>
            <View style={styles.teamContainer}>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Aaron Marti</Text>
                    <Image source={Aaron} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
                    <Text style={styles.memberName}>Mason Coco</Text>
                    <Image source={Mason} style={styles.teamMemberImage} />
                </View>
                <View style={styles.teamMember}>
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
                </View>
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
        width: '100%',
        alignSelf: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    teamContainer: {
        flexDirection: 'row',  // Set the direction of items to row
        flexWrap: 'wrap',      // Enable wrapping of items
        justifyContent: 'center', // Center the items horizontally
        marginTop: 20,
        width: '100%',         // Ensures this container takes the full width of its parent
    },
    teamMember: {
        alignItems: 'center',
        marginBottom: 20,
        width: '50%',          // Each team member takes up 50% of the teamContainer width
        maxWidth: '200px',     // Optional: prevents the boxes from becoming too large on bigger screens
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

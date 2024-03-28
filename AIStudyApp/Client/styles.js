import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex:           1,
        backgroundColor:'#fff',
        justifyContent: 'space-between',
    },
    chatContainer: {
        flex:   1,
        padding:10,
    },
    input: {
        height: 300, 
        borderColor: 'gray',
        borderWidth: 0.1,
        margin: 10,
        paddingLeft: 10, 
    },
    
    header: {
        backgroundColor:'#4a90e2',
        padding:        15,
        alignItems:     'center',
        justifyContent: 'center',
    },
    headerText: {
        color:     '#fff',
        fontSize:  20,
        fontWeight:'bold',
    },
    question: {
        fontSize:  18,
        fontWeight:'bold',
        padding:   10,
        textAlign: 'center',
    },
    choicesContainer: {
        marginVertical:10,
    },
    choiceButton: {
        backgroundColor:'#f0f0f0',
        padding:        10,
        borderRadius:   5,
        marginBottom:   10,
    },
    choiceText: {
        fontSize:16,
        color:   'black',
    },
    feedback: {
        fontSize:  16,
        fontWeight:'bold',
        color:     'red',
        padding:   10,
        textAlign: 'center',
    },
    menuContainer: {
        position: 'absolute',
        top: 60, 
        right: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        zIndex: 1000, 
    },
    menuItem: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#4a90e2',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    LoginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    LoginInput: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

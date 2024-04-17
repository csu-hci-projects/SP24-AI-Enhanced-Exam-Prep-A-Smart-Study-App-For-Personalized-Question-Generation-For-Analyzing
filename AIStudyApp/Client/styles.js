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
    TextInput: {
        width:  '80%',
        alignSelf: 'center',
        height: 200, 
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
    RegisterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
    },
    RegisterFormContainer: {
        width: '80%', 
    },
    RegisterHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', 
    },
    RegisterInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    RegisterButton: {
        backgroundColor: '#4a90e2',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    RegisterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noteContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginTop: 10,
        width: '100%',
      },
    notesListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    
    
    noteTitle: {
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10,
        textAlign: 'center',
    },
    noteContent: {
        fontSize: 14,
        width: '100%',
        marginBottom: 5,
    },
    modalView: {
        width: '70%',
        height: '60%',
        margin: 20,
        marginTop: '10%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",  
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
        elevation:4  },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 5,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
      },
      closeButton: {
        backgroundColor: '#2196F3',
        color: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      }
});

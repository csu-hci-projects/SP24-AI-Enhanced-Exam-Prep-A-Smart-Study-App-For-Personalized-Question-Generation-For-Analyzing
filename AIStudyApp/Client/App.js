import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginComponent';
import MainContent from './components/MainContentComponent';
import RegisterComponent from './components/RegisterComponent';
import NotesComponent from './components/NotesComponent';
import AboutUs from './components/AboutUs';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterComponent} />
        <Stack.Screen name="Main" component={MainContent} />
        <Stack.Screen name="Notes" component={NotesComponent} />
        <Stack.Screen name="About" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
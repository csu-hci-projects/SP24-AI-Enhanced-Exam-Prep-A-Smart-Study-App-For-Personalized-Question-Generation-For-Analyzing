import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginComponent';
import MainContent from './components/MainContentComponent';
import RegisterComponent from './components/RegisterComponent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterComponent} />
        <Stack.Screen name="Main" component={MainContent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
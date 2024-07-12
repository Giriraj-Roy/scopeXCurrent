import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import TabNavigation from './TabNavigation';
import Todo from '../screens/Todo';
import Profile from '../screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigation = () => {

    const Stack = createStackNavigator();
    const getToken = async ()=>{
        try{
            return await AsyncStorage.getItem('userToken')
        }catch(e){
            console.error("Failed to get token", e);
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={`${ getToken()!=null ? 'TabNavigation' : 'Login'}`}>
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="Todo" component={Todo} options={{headerShown: false}} />
                <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})
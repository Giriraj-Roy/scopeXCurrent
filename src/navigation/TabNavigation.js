import React, { useContext, useEffect, useState } from 'react';
import { Image, Platform, useColorScheme} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Todo from '../screens/Todo';
import Profile from '../screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoAccount from '../screens/NoAccount';
import { AppContext } from '../utils/AppContext';
import Login from '../screens/Login';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  
  const [token, setToken] = useState("")
  const {isDarkMode} = useContext(AppContext);
    const getToken = async ()=>{
        try{
            setToken(await AsyncStorage.getItem("userToken"))
        }catch(e){
            console.error("error getToken", e);
        }
    }

    useEffect(()=>{
      getToken()
    },[])


  return (
    token!=null ?
      <Tab.Navigator
        initialRouteName={'Todo'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            
            if (route?.name === 'Todo') {
              return focused
                ? <Image source={require('../assets/images/todo_active.png')} style={{width: 50, height: 50}} />
                : <Image source={require('../assets/images/todo_inactive.png')} style={{width: 50, height: 50}} />
            } else if (route?.name === 'Profile') {
              return focused
              ? <Image source={require('../assets/images/profile_active.png')} style={{width: 50, height: 50}} />
              : <Image source={require('../assets/images/profile_inactive.png')} style={{width: 50, height: 50}} />
            }

            
          },
          "tabBarActiveTintColor": "skyblue", // "#D2464B"
          "tabBarInactiveTintColor": "#575757",
          "tabBarLabelStyle": {
            "fontSize": 14,
            "bottom": 12,
          },
          tabBarStyle: {
            height: Platform.OS === 'android' ? '10%' : '12%',
            backgroundColor: isDarkMode ? "black" : 'white',
          },
        })}>
        <Tab.Screen name="Todo" component={Todo} options={{headerShown:false}} />
        <Tab.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
      </Tab.Navigator>

    :
    <Login/>
  );
};
export default TabNavigation;
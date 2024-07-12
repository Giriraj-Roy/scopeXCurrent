import { Appearance, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Loader from '../components/Loader'
import { AppContext } from '../utils/AppContext'

const Profile = ({navigation, route}) => {

    // const user = AsyncStorage.getItem("userDetails")
    // const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({})
    // const isDarkMode= useColorScheme()==='dark'
    const { isDarkMode, setIsDarkMode, loading, setLoading} = useContext(AppContext);

    const getDetails = async ()=>{
        const user  =   JSON.parse(await AsyncStorage.getItem("userDetails"));
        setUserDetails(user)
        // console.log(user);
    }
    const handleLogout = async ()=>{
        try{
            await GoogleSignin.configure()
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userDetails");
            await AsyncStorage.setItem("todoItems", "");

            console.log("Logged out");
            navigation.navigate("Login")

        }catch(e){
            console.error("Error Signin out", e);
        }
    }
    const handleColorScheme = ()=>{
        setLoading(true);
        // if(isDarkMode){
        //     Appearance.setColorScheme("light")
        // }
        // else{
        //     Appearance.setColorScheme("dark")
        // }
        // setIsDarkMode(useColorScheme()==='dark')
        setTimeout(()=>{
            setIsDarkMode()
            setLoading(false);
        },1000)
        }

    useEffect(()=>{
        getDetails()
        // console.log(route?.params?.userInfo);
        // setUserDetails(route?.params?.userInfo)
    },[])

  return (
    loading ? <Loader/> :
    <SafeAreaView style={{flex: 1, backgroundColor : isDarkMode ? Colors.dark : Colors.light}}>
        <View style={{width:"100%", paddingHorizontal: "5%", paddingVertical: "3%"}}>
            <FiraCode name={"Profile"} style={{color: isDarkMode ? Colors.light : "black", fontSize: 32}} />
        </View>
        {
            <View style={{ alignItems: "center"}}>
                <Image source= {{uri : userDetails?.photo ? userDetails?.photo : "https://picsum.photos/200/300"}} style={styles.image} />
                <FiraCode name={`User ID : ${userDetails?.id}`} style={{color: isDarkMode ? Colors.light : "black", fontSize: 14}} />
                <TouchableOpacity onPress={()=>handleColorScheme()} style={{marginVertical: 10, borderWidth: 1, borderColor: isDarkMode? Colors.light : "black", paddingVertical: 8, paddingHorizontal: 20, borderRadius: 4}} >
                    <FiraCode name={`Switch to ${isDarkMode ? "Light" : "Dark"} Mode`} style={{color: isDarkMode ? "white" : "black", fontSize: 18, fontWeight: "700"}} />
                </TouchableOpacity>
                <View style={{width: "90%", marginVertical: "10%"}}>
                    <FiraCode name={`Name `} style={{marginHorizontal: 4, color: isDarkMode ? Colors.light : "black", fontSize: 18}} />
                    <View style={{marginVertical: 4, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: isDarkMode? Colors.light : "black",borderRadius: 4}}>
                        <FiraCode name={`${userDetails?.name}`} style={{color: isDarkMode ? Colors.light : "black", fontSize: 24}} />
                    </View>

                    <FiraCode name={`Email `} style={{marginTop: 10, marginHorizontal: 4, color: isDarkMode ? Colors.light : "black", fontSize: 18}} />
                    <View style={{marginVertical: 4, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: isDarkMode? Colors.light : "black",borderRadius: 4}}>
                        <FiraCode name={`${userDetails?.email}`} style={{color: isDarkMode ? Colors.light : "black", fontSize: 24}} />
                    </View>
                </View>
            </View>

        }
        <Button onPress={()=>handleLogout()} name={"Log Out"} textStyle={{color : Colors.light}} style={{position : "absolute", bottom: "10%"}}/>

    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        margin: "5%"
    }
})
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import LoginModal from '../components/LoginModal'
import FlashMessage from 'react-native-flash-message'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '../constants/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({navigation}) => {

  const [phone, setPhone] = useState("")
  const flashMsgRef = useRef()


  useEffect(()=>{
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
    })
},[])

const googleLogin = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log("userinfo", userInfo);
        if(userInfo?.idToken != undefined){

          await AsyncStorage.setItem("userToken", userInfo.idToken);
          // await AsyncStorage.setItem("username", userInfo.user.name);
          // await AsyncStorage.setItem("useremail", userInfo.user.email);
          // await AsyncStorage.setItem("userImage", userInfo.user.photo);
          await AsyncStorage.setItem("userDetails", JSON.stringify(userInfo?.user));
          console.log("Login", userInfo?.user);
          navigation.navigate("Profile", {userInfo : userInfo?.user});
        }
        


    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log(error)
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log(error)
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log(error)
        } else {
        }
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <FlashMessage ref={flashMsgRef}/>
      <ImageBackground
            source={require("../assets/images/background.jpg")}
            style={{width: "100%", height: "100%", justifyContent: "center"}}
      >
      <View style={{alignSelf: "center", justifyContent: "center", marginBottom: "30%"}}>
        <FiraCode name={"Log In to everyone's \nFavourite Todo Tracker"} style={{color: "#F5F5F5", fontSize: 28, textAlign: "center"}} />
      </View>
      <LoginModal isVisible={true} googleLogin={googleLogin} phone={phone} setPhone={setPhone} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})
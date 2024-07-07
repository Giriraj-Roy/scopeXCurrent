import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import LoginModal from '../components/LoginModal'
import FlashMessage from 'react-native-flash-message'

const Login = () => {

  const [phone, setPhone] = useState("")
  const flashMsgRef = useRef()

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
      <LoginModal phone={phone} setPhone={setPhone} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})
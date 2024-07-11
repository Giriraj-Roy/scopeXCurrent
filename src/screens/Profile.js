import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Profile = ({navigation, route}) => {

    // const user = AsyncStorage.getItem("userDetails")

    const [userDetails, setUserDetails] = useState({})

    const getDetails = async ()=>{
        const user  =   JSON.parse(await AsyncStorage.getItem("userDetails"));
        setUserDetails(user)
        // console.log(user);
    }
    const handleLogout = async ()=>{
        try{
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("userDetails");

            console.log("Logged out");
            navigation.navigate("Login")

        }catch(e){
            console.error("Error Signin out", e);
        }
    }

    useEffect(()=>{
        getDetails()
        // console.log(route?.params?.userInfo);
        // setUserDetails(route?.params?.userInfo)
    },[])

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{width:"100%", paddingHorizontal: "5%", paddingVertical: "3%"}}>
            <FiraCode name={"Profile"} style={{color: "black", fontSize: 32}} />
        </View>
        {
            <View style={{ alignItems: "center"}}>
                <Image source= {{uri : userDetails.photo ? userDetails?.photo : "https://picsum.photos/200/300"}} style={styles.image} />
                <FiraCode name={`User ID : ${userDetails?.id}`} style={{color: "black", fontSize: 14}} />
                <View style={{width: "90%", marginVertical: "10%"}}>
                    <FiraCode name={`Name : ${userDetails?.name}`} style={{color: "black", fontSize: 24}} />
                    <FiraCode name={`Email : ${userDetails?.email}`} style={{color: "black", fontSize: 24}} />
                </View>
            </View>

        }
        <Button onPress={()=>handleLogout()} name={"Log Out"} style={{position : "absolute", bottom: "10%"}}/>

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
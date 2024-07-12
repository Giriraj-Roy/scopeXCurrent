import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import FiraCode, { FiraCodeBold } from '../assets/fonts/FiraCode'
import auth from '@react-native-firebase/auth'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from './Button'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AppContext } from '../utils/AppContext'

const LoginModal = ({isVisible, navigation ,googleLogin, phone, setPhone}) => {

    // const isDarkMode = useColorScheme()==='dark'
    const {isDarkMode} = useContext(AppContext);

    const signInPhone = async (phoneNumber) => {
        console.log("Executing sign in with phone number");
        try{
            const confirmation = await auth().signInWithPhoneNumber("+91"+phoneNumber);
            // console.log("confirmation >> ", confirmation);
            // console.log("confirmation user >> ", confirmation?._auth?._user);
            // setConfirm(confirmation);
            confirmCode(confirmation)
        }
        catch(e){
            console.log("Error with phone number >> ", e);
        }
      }
      const confirmCode = async (confirm) => {
        try {
            otp="123456"
            const data = await confirm.confirm(otp);
            // setOtpValid(true);
            // console.log("OTP confirm: ", otp);
            console.log("Confirm data >> ", data);
            // if (data?.user?.uid) {
                // confirmVerificationCode();
            // }
        } catch (error) {
            console.error("Error otp", error);
            // setOtpValid(false);
            // console.log("OTP not confirmed: ", otp);
            // showToast('Invalid OTP.', '#F3CECF', '#D2464B', require("../Assets/Images/x-mark.png"), flashMessageRef, 60)
        }
    }
    const handleGetOTP= async ()=>{
        try{
            // signInPhone(phone);
            const token = await AsyncStorage.getItem("userToken")
            if(token==null){
                googleLogin()
            }
            else{
                navigation.navigate("TabNavigation");
            }

        }catch(e){
            console.error("Error with OTP >> ", e);
        }

    }
    return (
            // <Modal
            //     visible={isVisible}
            //     transparent={true}
            // >
                <View style={[styles.modal, {backgroundColor : isDarkMode ? Colors.dark: Colors.light}]}>
                    <View style={{width: "100%", alignItems: "center", marginVertical: 10, marginBottom: 150,}}>
                        <FiraCodeBold name={"Login to the App \n using below Profiles"} style={{fontSize: 22, color: isDarkMode ? Colors.lighter : "gray", fontWeight: "600", textAlign: "center"}}/>
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginTop: 20, margin: 10 }}>
                        <TextInput style={{ height: 50, marginRight: 12, borderWidth: 2, borderRadius: 5, padding: 18, backgroundColor: '#F9FAFB', borderColor: '#F1F3F5' }}
                            placeholder="+91"
                            placeholderTextColor={'#BABABA'}
                            editable={false} />
                        <TextInput
                            keyboardType={'numeric'}
                            autoCapitalize={'none'}
                            style={{ height: 50, margin: 2, borderWidth: 2, color: 'black', width: '75%', padding: 18, borderRadius: 5, backgroundColor: '#F9FAFB', borderColor: '#F1F3F5' }}
                            placeholderTextColor={'#BABABA'}
                            maxLength={10}
                            placeholder={"Enter Phone Number"}
                            returnKeyType={(Platform.OS === 'ios') ? 'done' : 'next'}
                            value={phone}
                            onChangeText={e => setPhone(e)}
                        />
                    </View> */}
                    {/* <TouchableOpacity style={styles.getOtp} onPress={()=>handleGetOTP()}>
                        <FiraCode name={"Sign In With Google"} style={{color: "white", fontSize: 18, fontWeight: "700"}} />
                    </TouchableOpacity> */}
                    <Button name={"Sign In With Google"} textStyle={{color: isDarkMode ? Colors.darker : Colors.light}} onPress={handleGetOTP} />
                </View>

            // </Modal>
    )
}

export default LoginModal

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '45%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    padding: 12,
  },
  getOtp: {
    width: '90%',
    height: 50,
    backgroundColor: 'skyblue',
    borderRadius: 4,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
});
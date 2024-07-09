import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FiraCode from '../assets/fonts/FiraCode'
// import auth from '@react-native-firebase/auth'

const LoginModal = ({phone, setPhone}) => {

    const signInPhone = async (phoneNumber) => {
        console.log("Executing sign in with phone number");
        try{
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            console.log("confirmation >> ", confirmation);
            // console.log("confirmation user >> ", confirmation?._auth?._user);
            // setConfirm(confirmation);
        }
        catch(e){
            console.log("Error with phone number >> ", e);
        }
      }
    const handleGetOTP= ()=>{
        try{
            // signInPhone(phone);

        }catch(e){
            console.error("Error with OTP >> ", e);
        }

    }
    return (
            <Modal
                visible={true}
                transparent={true}
            >
                <View style={styles.modal}>
                    <View style={{width: "100%", alignItems: "center", marginVertical: 10}}>
                        <FiraCode name={"Login to the App"} style={{fontSize: 22, color: "gray", fontWeight: "700"}}/>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, margin: 10 }}>
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
                    </View>
                    <TouchableOpacity style={styles.getOtp} onPress={()=>handleGetOTP()}>
                        <FiraCode name={"Send OTP"} style={{color: "white", fontSize: 18, fontWeight: "700"}} />
                    </TouchableOpacity>
                </View>

            </Modal>
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
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const showToast = (text,color,borderColor,flashMessageRef,bottomPosition) => {
    let message = {
      message: text,
      style: {
        width:'90%',
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth:1.5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        bottom: bottomPosition
      },
      duration: 2000,
      position: 'top' ,
      floating: true,
      titleStyle: {textAlign: 'center',color:'black'},
    //   icon: props => <Image source={imgSrc} style={{marginLeft:10}}/>,
    };
    flashMessageRef?.current?.showMessage(message);
  };

export default showToast

const styles = StyleSheet.create({})
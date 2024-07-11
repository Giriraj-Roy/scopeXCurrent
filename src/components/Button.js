import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FiraCode from '../assets/fonts/FiraCode'

const Button = ({onPress, name, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]} >
        <FiraCode name={name} style={[{color: "white", fontSize: 18, fontWeight: "700"}, textStyle]} />
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 50,
        backgroundColor: 'skyblue',
        borderRadius: 4,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
})
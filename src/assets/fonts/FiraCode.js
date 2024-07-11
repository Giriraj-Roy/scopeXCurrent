import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FiraCode = ({name, style}) => {
    return (
        <Text style={[styles.text,style]}>{name}</Text>
    );
}

export const FiraCodeBold = ({name, style}) => {
    return (
        <Text style={[styles.textBold,style]}>{name}</Text>
    );
}

export default FiraCode

const styles = StyleSheet.create({
    text : {
        fontFamily : 'FiraCode-Regular',
        color: "#575757"
    },
    textBold : {
        fontFamily : 'FiraCode-Bold',
        color: "#575757"
    }
})
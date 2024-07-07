import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FiraCode = ({name, style}) => {
    return (
        <Text style={[styles.text,style]}>{name}</Text>
    );
}

export default FiraCode

const styles = StyleSheet.create({
    text : {
        fontFamily : 'FiraCode-Regular',
        color: "#575757"
    }
})
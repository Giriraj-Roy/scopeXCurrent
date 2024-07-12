import { ActivityIndicator, SafeAreaView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AppContext } from '../utils/AppContext';

const Loader = () => {
  const { isDarkMode } = useContext(AppContext);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode? Colors.darker : Colors.light}]}>
        {/* <View style={styles.container}> */}
            <ActivityIndicator size="large" />
        {/* </View> */}
    </SafeAreaView>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
    }
    
})
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import Button from './Button'
import { getTodoItems, updateTodoItem } from '../../helper'
import showToast from './Toast'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AppContext } from '../utils/AppContext'

const EditTodo = ({isVisible, setEditTodoVisible, item, flashMessageRef, todoItems, setTodoItems }) => {

    const [updatedTodo, setUpdatedTodo] = useState({})
    // const [loading, setLoading] = useState(false)
    const {isDarkMode, setLoading} = useContext(AppContext);

    useEffect(()=>{
        getTodoItems(0, 10).then(items => setTodoItems(items));
    },[])

    const handleUpdateTodo = () => {
      setLoading(true)
        updateTodoItem(updatedTodo)
        .then(() => {
          getTodoItems(0, 10).then(items => {
            setTodoItems(items);
            // setNewTodoItem("")
            setEditTodoVisible(false);
            showToast("Updated Successfully", "lightgreen", "green", flashMessageRef, 10);
            
          });
        })
        .catch((e)=>{
          showToast(e.message, "yellow", "chromeYellow",  flashMessageRef, 10);
        })
        setTimeout(()=>setLoading(false),800);
      }

  return (
    <Modal visible={isVisible} transparent={true}>
        <View style={[styles.modal, {backgroundColor : isDarkMode ? Colors.darker : Colors.lighter}, isDarkMode && {borderWidth: 2, borderColor: Colors.lighter, borderRadius: 20}]}>
            <TouchableOpacity onPress={()=>setEditTodoVisible(false)} style={{position: 'absolute', top: 0, right: 5, padding: 10}}>
                <FiraCode name={"x"} style={{fontSize: 22, color: isDarkMode ? Colors.light : "black" , fontWeight: "700"}} />
            </TouchableOpacity>
            <FiraCode name={"Current Task"} style={{fontSize: 18,fontWeight:"700", marginVertical: 4, color: isDarkMode ? Colors.light : "black"}} />
            <FiraCode name={item.title}  style={{fontSize: 16, marginVertical: 4, color: isDarkMode ? "lightgray" : "gray"}} />
            <FiraCode name={"Update Task"} style={{fontSize: 18, fontWeight:"700", marginTop: 20, color: isDarkMode ? Colors.light :  "black"}}/>
            {/* <View style={styles.sectionContainer}> */}
                <TextInput
                    // value={updatedTodo}
                    style={[styles.sectionDescription, {color : isDarkMode ? Colors.light : "black", borderBottomColor: isDarkMode ? Colors.lighter : "gray", borderBottomWidth: 1}]} 
                    placeholder={item?.title}
                    placeholderTextColor={isDarkMode ? Colors.light : "black"}
                    onChange={e => {setUpdatedTodo({id: item.id , title : e.nativeEvent.text})}}
                />
                <Button
                    name="Update"
                    textStyle={{color: "white", fontWeight: "700"}}
                    onPress={handleUpdateTodo}
                />
            {/* </View> */}
            
        </View>
    </Modal>
  )
}

export default EditTodo

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'white',
        width: "90%",
        borderRadius: 20,
        alignSelf: "center",
        padding: 20,
        position: "absolute",
        top: "25%"
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: "black"
      },
      sectionDescription: {
        // marginTop: 8,
        fontSize: 16,
        fontWeight: '400',
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginBottom: 20,
      },
})
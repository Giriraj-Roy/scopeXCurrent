import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import Button from './Button'
import { getTodoItems, updateTodoItem } from '../../helper'
import showToast from './Toast'

const EditTodo = ({isVisible, setEditTodoVisible, item, flashMessageRef, todoItems, setTodoItems }) => {

    const [updatedTodo, setUpdatedTodo] = useState({})
    // const [todoItems, setTodoItems] = useState([]);

    useEffect(()=>{
        getTodoItems(0, 10).then(items => setTodoItems(items));
    },[])

    const handleUpdateTodo = () => {
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
      }

  return (
    <Modal visible={isVisible} transparent={true}>
        <View style={styles.modal}>
            <TouchableOpacity onPress={()=>setEditTodoVisible(false)} style={{position: 'absolute', top: 0, right: 5, padding: 10}}>
                <FiraCode name={"x"} style={{fontSize: 22, color: "black", fontWeight: "700"}} />
            </TouchableOpacity>
            <FiraCode name={"Current Task"} style={{fontSize: 18,fontWeight:"700", marginVertical: 4, color: "black"}} />
            <FiraCode name={item.title}  style={{fontSize: 16, marginVertical: 4, color: "gray"}} />
            <FiraCode name={"Update Task"} style={{fontSize: 18, fontWeight:"700", marginTop: 20, color: "black"}}/>
            {/* <View style={styles.sectionContainer}> */}
                <TextInput
                    // value={updatedTodo}
                    style={styles.sectionDescription}
                    placeholder={item?.title}
                    placeholderTextColor={"black"}
                    onChange={e => {setUpdatedTodo({id: item.id , title : e.nativeEvent.text})}}
                />
                <Button
                    name="Update"
                    textStyle={{color: "white"}}
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
        marginBottom: 20
      },
})
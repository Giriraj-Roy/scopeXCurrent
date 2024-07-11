import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import EditTodo from './EditTodo';


const TodoItem = ({item, flashMessageRef, todoItems, setTodoItems}) => {

    const [editTodoVisible, setEditTodoVisible] = useState(false);
    const darkMode = useColorScheme()==='dark'

  return (
    <View key={item.id} style={styles.todoItem}>
        <FiraCode name={item.title} style={darkMode ? styles.sectionDescriptionDark : styles.sectionDescription} />
        <TouchableOpacity onPress={()=>setEditTodoVisible(true)} style={{padding: 3, paddingHorizontal: 6, borderWidth: 1, borderRadius: 4, borderColor:`${darkMode ? "whitesmoke" : "black"}`}}>
            <FiraCode name={"Edit"} style={{color: `${darkMode ? "whitesmoke" : "black"}`}}/>
        </TouchableOpacity>
        <EditTodo todoItems={todoItems} setTodoItems={setTodoItems} flashMessageRef={flashMessageRef} isVisible={editTodoVisible} setEditTodoVisible={setEditTodoVisible} item={item} />
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: "black"
      },
      sectionDescriptionDark: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: "#F5F5F5"
      },
      todoItem: {
        flexDirection: "row",
        fontSize: 18,
        fontWeight: '400',
        borderBottomWidth: 1,
        padding: 8,
        borderBottomColor: 'gray',
        justifyContent: "space-between",
        alignItems: "center"
      },
})
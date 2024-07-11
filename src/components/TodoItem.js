import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import EditTodo from './EditTodo';

const TodoItem = ({item, flashMessageRef, todoItems, setTodoItems}) => {
  const [editTodoVisible, setEditTodoVisible] = useState(false);

  return (
    <View key={item.id} style={styles.todoItem}>
        <FiraCode name={item.title} style={styles.sectionDescription} />
        <TouchableOpacity onPress={()=>setEditTodoVisible(true)} style={{padding: 3, paddingHorizontal: 6, borderWidth: 1, borderRadius: 4,}}>
            <FiraCode name={"Edit"} />
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
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useContext, useState } from 'react'
import FiraCode from '../assets/fonts/FiraCode'
import EditTodo from './EditTodo';
import { AppContext } from '../utils/AppContext';
import { deleteTodoItem } from '../../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from './Toast';


const TodoItem = ({item, flashMessageRef, todoItems, setTodoItems}) => {

    const [editTodoVisible, setEditTodoVisible] = useState(false);
    // const isDarkMode = useColorScheme()==='dark'
    const {isDarkMode} = useContext(AppContext);

    const getTodos = async ()=>{
      const res = JSON.parse(await  AsyncStorage.getItem('todoItems'))
      // console.log("todos ",res, res.length);
      setTodoItems(res)
    }

    const handleDeleteTodo = ()=>{
      deleteTodoItem(item.id)
      .then(() => {
        getTodos()
        showToast("Congratulations  🎉", "lightgreen", "green", flashMessageRef, 10);
      })
      .catch((e)=>{
        showToast(e.message, "yellow", "chromeYellow",  flashMessageRef, 10);
      })
    }

  return (
    <View key={item.id} style={styles.todoItem}>
        <FiraCode name={item.title} style={isDarkMode ? styles.sectionDescriptionDark : styles.sectionDescription} />
        <View style={{flexDirection: 'row', width: "30%", justifyContent: "space-around"}}>
          <TouchableOpacity onPress={()=>handleDeleteTodo()} style={{padding: 3, paddingHorizontal: 6, borderWidth: 1, borderRadius: 4, borderColor:`${isDarkMode ? "whitesmoke" : "black"}`}}>
              <FiraCode name={"Done"} style={{color: `${isDarkMode ? "whitesmoke" : "black"}`}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setEditTodoVisible(true)} style={{padding: 3, paddingHorizontal: 6, borderWidth: 1, borderRadius: 4, borderColor:`${isDarkMode ? "whitesmoke" : "black"}`}}>
              <FiraCode name={"Edit"} style={{color: `${isDarkMode ? "whitesmoke" : "black"}`}}/>
          </TouchableOpacity>
        </View>
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
import React, {useEffect, useRef} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodoItem, getTodoItems} from '../../helper';
import FiraCode from '../assets/fonts/FiraCode';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import showToast from '../components/Toast';


const Todo = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const [todoItems, setTodoItems] = React.useState([]);
  const [newTodoItem, setNewTodoItem] = React.useState('');
  const flashMessageRef = useRef()

  const backgroundStyle = {
    backgroundColor: !isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(() => {
    getTodoItems(0, 10).then(items => setTodoItems(items));
    console.log(Colors);
  }, []);

  const handleAddTodo = () => {
    addTodoItem(newTodoItem)
    .then(() => {
      getTodoItems(0, 10).then(items => {
        setTodoItems(items);
        showToast("Todo Added", "lightgreen", "green", flashMessageRef, 10);
        setNewTodoItem("")
      });
    })
    .catch((e)=>{
      showToast(e.message, "yellow", "chromeYellow",  flashMessageRef, 10);
    })
  }


  return (
    <SafeAreaView style={[{backgroundStyle}, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <FlashMessage ref={flashMessageRef} />
        <View style={styles.sectionContainer}>
          {/* <Text style={styles.sectionTitle}>TODO</Text> */}
          <FiraCode name={"TODO"} style={styles.sectionTitle} />
        </View>
        <View style={styles.sectionContainer}>
          {todoItems.map((item) => (
            <View key={item.id} style={styles.todoItem}>
              <Text style={styles.sectionDescription}>{item.title}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            value={newTodoItem}
            style={styles.sectionDescription}
            placeholder="Add your todo item"
            placeholderTextColor={"black"}
            onChange={e => {setNewTodoItem(e.nativeEvent.text)}}
          />
          <Button
            title="Add"
            onPress={handleAddTodo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


export default Todo

const styles = StyleSheet.create({
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
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: "black"
  },
  highlight: {
    fontWeight: '700',
  },
  todoItem: {
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    padding: 8,
    borderBottomColor: 'gray',
  },
});
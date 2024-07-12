import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {addTodoItem, getTodoItems} from '../../helper';
import FiraCode from '../assets/fonts/FiraCode';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import showToast from '../components/Toast';
import { useInfiniteQuery } from 'react-query';
import EditTodo from '../components/EditTodo';
import TodoItem from '../components/TodoItem';
import { AppContext } from '../utils/AppContext';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Todo = () => {


  const {isDarkMode, loading, setLoading} = useContext(AppContext);
  const [editTodoVisible, setEditTodoVisible] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState('');
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const flashMessageRef = useRef()

  // const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
  //   'items',
  //   ({ pageParam = 1 }) => fetchItems(pageParam),
  //   {
  //     getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  //   }
  // );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  useEffect(() => {
    // getTodoItems(0, 100).then(items => setTodoItems(items));
    getTodos()
    // setData(todoItems)
    console.log(todoItems?.length);
  }, []);

  const getTodos = async ()=>{
    const res = JSON.parse(await  AsyncStorage.getItem('todoItems'))
    // console.log("todos ",res, res.length);
    setTodoItems(res)
  }

  const handleAddTodo = () => {
    // setLoading(true)
    addTodoItem(newTodoItem)
    .then(() => {
      getTodos()
      
      showToast("Todo Added", "lightgreen", "green", flashMessageRef, 10);
      setNewTodoItem("")
    })
    .catch((e)=>{
      showToast(e.message, "yellow", "chromeYellow",  flashMessageRef, 10);
    })
  }

  const renderTodo = ({item})=>{
    return(
      <TodoItem todoItems={todoItems} setTodoItems={setTodoItems} key={item?.id} item={item} flashMessageRef={flashMessageRef} />
    )
  }
  // const handleLoadData = () => {
  //   if (!hasNextPage || isLoading) return;
  //   setIsLoading(true);
  //   setPage((prevPage) => prevPage + 1);
  //   loadNextPage();
  // };
  
  // const loadNextPage = () => {
  //   // Load the next page of data from your existing data
  //   let pageSize=3;
  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;
  //   const nextPageData = data.slice(startIndex, endIndex);
  
  //   if (nextPageData.length < pageSize) {
  //     setHasNextPage(false);
  //   }
  
  //   setData((prevData) => [...prevData, ...nextPageData]);
  //   setIsLoading(false);
  // };

  const loadNextPage = () => {
    if (isInfiniteLoading) return;
    setIsInfiniteLoading(true);
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const nextPageData = todoItems.slice(startIndex, endIndex);
    setDisplayData((prevData) => [...prevData, ...nextPageData]);
    setPage((prevPage) => prevPage + 1);
    setIsInfiniteLoading(false);
  };
  


  return (
    loading ? <Loader/> :
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View  style={backgroundStyle}>
        <FlashMessage ref={flashMessageRef} />
        <View style={styles.sectionContainer}>
          <FiraCode name={"TODO"} style={isDarkMode ? styles.sectionTitleDark : styles.sectionTitle} />
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            value={newTodoItem}
            style={isDarkMode ? styles.sectionDescriptionDark : styles.sectionDescription}
            placeholder="Add your todo item"
            placeholderTextColor={isDarkMode ? "whitesmoke" : "black"}
            onChange={e => {setNewTodoItem(e.nativeEvent.text)}}
          />
          <Button title="Add" onPress={handleAddTodo} />
        </View>
        <View style={[styles.sectionContainer, backgroundStyle, {height : "70%"}]}>
          <FlatList 
            data={todoItems}
            renderItem={renderTodo}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.2}
            ListFooterComponent={isInfiniteLoading ? <ActivityIndicator /> : null}
          />
        </View>
        
      </View>
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
  sectionTitleDark: {
    fontSize: 24,
    fontWeight: '600',
    color: "whitesmoke"
  },
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
    color: "whitesmoke"
  },
  highlight: {
    fontWeight: '700',
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
});
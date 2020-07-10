import React, { useState} from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { v4 as uuidv4 } from 'uuid';


export default function App() {

  const [todos, setTodo] = useState([
   {id:1, post:"Regarder un film"},
   {id:2, post:"Réviser Native"},
  ]);

const [task, setTask] = useState({});

function addTodo() {
  // todo.id = uuidv4(); // ça ne fonctionne pas
  setTodo(todos + addTask())
}

function addTask() {
  setTask(task)
}

function deleteTodo(id) {
  //créer une nouvelle variable (optionnelle) qui utilise un filter en fonction d'id discordants
  let remainingTodos = todos.filter(todo => todo.id !== id);
  //actualise le state par la nouvelle variable
  setTodo(remainingTodos);
}


  return (
    <View style={styles.container}>
      <Text>Add a new Todo!</Text>
      
      <TextInput style={styles.input} value={task} onChangeText={text => addTask(text)} />
      <Button title="valider" onPress={addTodo} />

      <FlatList
        data={todos}
        renderItem={({item}) => 
        <View style={styles.list}>
          <Text >{item.post}</Text>
          <TouchableOpacity onPress={() => {deleteTodo(item.id)}}>
          <MaterialCommunityIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
         }        
        // keyExtractor={item => item.id.toString()}
      />    
    </View>
  );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33D1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    margin: 5,
  },
  list:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "blue",
    padding: 15,
    margin: 5,
    width: 300,
  }
});

import React, { useState} from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { uuid} from 'uuidv4';
import { Input } from 'react-native-elements';


export default function App() {

  const [todos, setTodo] = useState([
   {id:1, post:"Regarder un film"},
   {id:2, post:"Réviser Native"},
  ]);

const [newtask, setTask] = useState('');



function addTask() {
  let post = {
    id: uuid(),
    post: newtask
  }
  setTodo([post, ...todos]);
  setTask("");
}

function deleteTodo(id) {
  //créer une nouvelle variable (optionnelle) qui utilise un filter en fonction d'id discordants
  let remainingTodos = todos.filter(todo => todo.id !== id);
  //actualise le state par la nouvelle variable
  setTodo(remainingTodos);
}

function seeAlert() {
  Alert.alert(
    "Titre de l'alerte",
    "Message de l'alerte",
    [
    {
    text: "Annuler",
    onPress: () => console.log("Appuyé sur annuler"),
    style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
    );
}

  return (
    <View style={styles.container}>
      <Text>Add a new Todo!</Text>
      
      <Input style={styles.input} value={newtask} onChangeText={text => setTask(text)} label="nouvelle tâche" placeholder="entrez votre todo" />
      <Button title="valider" onPress={addTask} />

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

      <Button title="Voir message" onPress={seeAlert} /> 
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

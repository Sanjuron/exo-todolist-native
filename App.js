import React, { useState} from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
      <Text style={styles.h1}>Votre Todo List</Text>
      <Input style={styles.input} value={newtask} onChangeText={text => setTask(text)} placeholder="Entrez votre nouvelle tâche" />
      <View style={styles.buttonContainer}>      
      <Button title="valider" onPress={addTask} style={styles.validation}/>
      </View>

      <FlatList  
        style={styles.listing}      
        data={todos}
        renderItem={({item}) => 
        <View style={styles.list}>
          <Text style={styles.todo} >{item.post}</Text>
          <TouchableOpacity onPress={() => {deleteTodo(item.id)}}>
          <MaterialCommunityIcons name="delete" size={24} color="#8D818C" />
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
    backgroundColor: '#B4B8C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 14,
    color: "#FEFFFE",
    borderBottomWidth: 3,
    borderColor: "#FEFFFE",
    marginBottom: 20,
  },
  validation:{
    padding: 20,
  },
  // listing:{
  //   borderStyle: "dotted",
  //   borderColor: "#8D818C",
  //   borderWidth: 1,
  //   borderTopWidth: 0,
  //   borderBottomWidth: 0,
  // },
  list:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#A5A299",
    backgroundColor:"#FEFFFE",
    borderRadius: 8,
    padding: 15,
    margin: 8,
    width: 300,
  },
  todo:{
    fontWeight: 'bold',
    fontSize: 20,
    color: "#8D818C",
  },
  buttonContainer: {
    margin: 20,
  },
});

import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';

import Login from './src/components/Login/Index';
import TaskList from './src/components/TaskList/Index';
import firebase from './src/services/firebaseConnection';
import { MaterialIcons } from '@expo/vector-icons';


export default function App() {
  const [user, setUser] = useState(null)
  const [newTask, setNewTasks] = useState('')
  const [tasks, setTasks] = useState([])
  const [key, setKey] = useState('')


  const inputRef = useRef(null)


  //tipo a funcao monted do vue js
  useEffect(() => {


    function getUser() {

      if (!user) return;


      // o  que  eh uma funcao snapshot ?
      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([])


        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTasks(oldTasks => [...oldTasks, data])

        })

      })
    }

    getUser()

  }, [user])

  function handleDelete(key) {

    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)

        setTasks(findTasks)
      })
  }


  function handleEdit(data) {
    setKey(data.key)
    setNewTasks(data.nome)
    inputRef.current.focus()

  }

  function cancelEdit() {
    setKey('')
    setNewTasks('')
    Keyboard.dismiss()
  }


  function handleAdd() {
    if (newTask == '') return;


    //user want edit one task
    if (key !== '') {
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
        .then(() => {

          const taskIndex = tasks.findIndex(item => item.key === key)

          let taskClone = tasks;
          taskClone[taskIndex].nome = newTask;


          setTasks([...taskClone])


        })


      Keyboard.dismiss()
      setNewTasks('')
      setKey('')

      return;
    }


    let tarefas = firebase.database().ref('tarefas').child(user)
    let chave = tarefas.push().key


    tarefas.child(chave).set({
      nome: newTask
    })
      .then(() => {

        const data = {
          key: chave,
          nome: newTask
        }

        //pegando as tarefas atingas e colocando mais uma nova
        setTasks(oldTasks => [...oldTasks, data])
      })

    Keyboard.dismiss();
    setNewTasks('')


  }


  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (


    <SafeAreaView style={styles.container}>


      {/* se tiver algo na key vou mostrar essa sena de cancel */}
      {key.length > 0 && (

        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <MaterialIcons name="cancel" size={24} color="#FF0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: '#FF0000' }}>Voce esta editando uma tarefa!</Text>
        </View>
      )}




      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder='O que  vai fazer hoje ?'
          value={newTask}
          onChangeText={(text) => setNewTasks(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}

      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2f6fc',
    marginTop: 30,
  },

  containerTask: {
    flexDirection: 'row'
  },

  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45
  },

  buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4
  },

  buttonText: {
    color: '#FFFF',
    fontSize: 23
  }



});

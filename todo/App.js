import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import {useEffect, useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  useEffect(() => {
      const fetcher = async () => {
          const {data} = await axios.get('http://localhost:3000')
          setTodos(data)
      }
      fetcher()
  }, [])

  const post = async () => await axios.post('http://localhost:3000', { todo })

  const handle = async (e) => {
    e.preventDefault()
    setTodos(r => [...r, { todo }])
    post()
    setTodo('')
  }

  return (
    <View style={styles.container}>
      {todos.map(todo => <Text>{todo.todo}</Text>)}
      <form onSubmit={handle}>
      <TextInput
        style={styles.input}
        onChangeText={setTodo}
        value={todo}
      />
      <Button
        title={'Add'}
        type='submit'
        onPress={handle}
      />
      <StatusBar style="auto" />
      </form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: '8px',
    height: '50px',
    width: '300px',
    padding: '10px',
    margin: '5px'
  }
});

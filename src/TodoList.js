import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: Math.random().toString(), name: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Agregar Tarea" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.task, item.completed && styles.completedTask]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <Button title="Eliminar" color="red" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8', // Fondo general
    flex: 1,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e90ff', // Azul vibrante
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4CAF50', // Verde brillante
    padding: 12,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    fontSize: 18,
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: '#000', // Sombra para tarjetas
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Para Android
    borderLeftWidth: 4,
    borderLeftColor: '#1e90ff', // Marca visual en el lateral
  },
  task: {
    fontSize: 18,
    color: '#333',
    flexShrink: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#6c757d', // Color gris suave para tareas completadas
    fontStyle: 'italic',
  },
  button: {
    marginVertical: 15,
    borderRadius: 8,
    backgroundColor: '#1e90ff', // Botón azul vibrante
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
    fontWeight: 'bold',
  },
});
export default TodoList;

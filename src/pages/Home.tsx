import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    } 
    setTasks(oldValue => [...oldValue, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(task => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done,
        }
      } else {
        return { ...task }
      }
    })
    setTasks([...newTasks]);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
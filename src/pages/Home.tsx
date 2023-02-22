import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { EditTaskProps } from './interfaces';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find(task => task.title === newTaskTitle);
    if(taskExist) {
      return Alert.alert('Atenção', 'Essa task já foi cadastrada anteriormente');
    }
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
    Alert.alert('Atenção', 'Deseja mesmo remover a task?', [{
      style: 'cancel',
      text: 'Não',
    },{
      style: 'destructive',
      text: 'Sim',
      onPress: () => {
        setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
      }
    }])
  }

 function handleEditTask(taskEditParam: EditTaskProps) {
   const oldTasks = tasks.map(task => ({ ...task }));
   const taskEdit = oldTasks.find(task => task.id === taskEditParam.id);
   if(!taskEdit) return;

   taskEdit.title = taskEditParam.title;
   setTasks([...oldTasks]);
 }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        handleEditTask={handleEditTask}
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
import React from 'react';
import { FlatList } from 'react-native';
import { ItemWrapper } from './ItemWrapper';


import { EditTaskProps } from '../pages/interfaces';
import TaskItem from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (taskEditParam: EditTaskProps) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, handleEditTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
           <TaskItem 
            index={index} 
            item={item} 
            removeTask={removeTask} 
            toggleTaskDone={toggleTaskDone} 
            handleEditTask={handleEditTask} 
          />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
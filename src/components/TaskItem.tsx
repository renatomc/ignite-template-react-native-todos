import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { EditTaskProps } from '../pages/interfaces';
import { Task } from './TasksList';


type TaskItemProps = {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (taskEditParam: EditTaskProps) => void;
}


const TaskItem: React.FC<TaskItemProps> = ({ index, item, toggleTaskDone, removeTask, handleEditTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);
  
  function handleStartEditing(){
    setIsEditing(true);
  }

  function handleCancelEditing(){
    setNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEdit() {
    handleEditTask({ id: item.id, title: newTitle });
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      if(isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEdit}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsWrap}>
          {isEditing ? (
            <TouchableOpacity
              testID={`trash-${index}`}
              onPress={handleCancelEditing}
            >
              <Icon
                name='x'
                size={24}
                color="#b2b2b2"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
          )}
          <View style={styles.iconDivider} />
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={() => removeTask(item.id)}
            disabled={isEditing}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsWrap: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 24,
    alignItems: 'center'
  },
  iconDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through'
  }
})

export default TaskItem;
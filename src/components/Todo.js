import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

export const Todo = ({ task, ToggleComplete, deleteTodo, editTodo, togglePin, isPinned }) => {
  
  return (

    <div className='Todo'>
        <div className='todo-task-container'>
          {!task.completed ? 
          <FontAwesomeIcon icon={faCircle} onClick={() => ToggleComplete(task.id)} />: 
          <FontAwesomeIcon icon={faCircleCheck } onClick={() => ToggleComplete(task.id)} /> }
        
        <p 
        className={`${task.completed ? 'completed': ""}
        `}>{task.task}</p>
        </div>
        
        <div>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)}/>
        </div>
    </div>
  );
};
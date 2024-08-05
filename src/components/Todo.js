import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

export const Todo = ({ task, ToggleComplete, deleteTodo, editTodo, handleSelectTodo, isSelected, selectMode}) => {
  console.log(task)
  return (


    <div className='Todo'>
      {selectMode && (
      
      <input 
        type="checkbox"
        checked={isSelected}
        className="custom-checkbox"
        onChange={() => handleSelectTodo(task._id)}/>
      )}
        <div className='todo-task-container'> 
        {!selectMode && (
          !task.completed ? 
          <FontAwesomeIcon icon={faCircle} onClick={() => ToggleComplete(task._id)} /> : 
          <FontAwesomeIcon icon={faCircleCheck} onClick={() => ToggleComplete(task._id)} />
        )}
        <p className={`${task.completed ? 'completed': ""}`}>
          {task?.description ? task?.description : "default value"}</p>
        </div>
        
        <div>
        
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task._id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task._id)}/>
          
        </div>
    </div>
  );
};
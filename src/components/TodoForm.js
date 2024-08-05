import React, { useState } from 'react';


export const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value) {
            console.log("value is null")
            return alert("value is null")
        }
        try {
            addTodo(value);
            setValue("");
        } catch (error) {
            console.log(error.message)
        }
       

}

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type='text'
                className='todo-input'
                value={value}
                placeholder='What is the task today?'
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleSubmit} type='submit' className='todo-btn'>Add Task</button>
        </form>
    );
};
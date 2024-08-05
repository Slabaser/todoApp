import React, {useState, useEffect, useRef} from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState([]);
    const [selectMode, setSelectMode] =useState(false);
    const wrapperRef = useRef(null);
    
    useEffect(() => {
        console.log('USEFFECT')
         fetchTodos();
      }, []);

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectMode]);

      const fetchTodos = async () => {
        try {
          const response = await axios.get("http://localhost:5001/api/todos");
          setTodos(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      console.log(todos);

      
      const addTodo = async (todo) => {
        try {
            if (todo.trim() !== ""){
            const response = await axios.post("http://localhost:5001/api/todos", {
                description: todo,
                completed: false,
                isEditing: false,
                
            });
            setTodos([...todos,response.data ]);
        }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const ToggleComplete = async (id) => {
        try {
            
            const todo = todos.find(todo => todo._id === id);
            const newCompletedStatus = !todo.completed;
            
            const response = await axios.put(`http://localhost:5001/api/todos/${id}`, {
                completed: newCompletedStatus,
                description: todo.description
            });
            await fetchTodos();
            setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: response.data.completed } : todo));
            
        } catch (error) {
            console.error(error);
        }
    };
    

    const deleteTodo = async (id) => {
        console.log(id)
        try {
            await axios.delete(`http://localhost:5001/api/todos/${id}`);
            const response = await fetchTodos()
            setTodos(response.data);
          } catch (err) {
            console.log(err);
          }
        };
    // düzenleme modunu açıp kapatır
    const editTodo = (id) => {
        setTodos(todos.map(todo => todo._id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }
    //todo metnini günceller
    const editTask = async (task, id) => {
        try {
            // Backende put istegi
            const response = await axios.put(`http://localhost:5001/api/todos/${id}`, {
                description: task
            });
    
            // Local state'i backend'den dönen güncellenmiş veri ile güncelliyoruz
            setTodos(todos.map(todo => todo._id === id ? { ...todo, task: response.data.task, isEditing: false } : todo));
            await fetchTodos()
        } catch (error) {
            console.error(error);
        }
    };

    // todoları seçme
    const handleSelectTodo = async (id) =>{
        setSelectedTodos((prevSelectedTodos) =>
            prevSelectedTodos.includes(id) ? prevSelectedTodos.filter((selectedId) => selectedId !== id)
        : [...prevSelectedTodos, id]

    );
    }
    //seçilen todoları toplu silme 
    const selectedTodoDelete = async () => {
        try {
            if (selectedTodos.length === 0) {
                console.log("No todos selected for deletion");
                return;
            }
            console.log("Deleting todos:", selectedTodos);
            await axios.delete("http://localhost:5001/api/todos", {
                data: { ids: selectedTodos }
            });
            setSelectedTodos([]);
            await fetchTodos();
        } catch (err) {
            console.log("Error deleting selected todos:", err);
        }
    };
        const toggleSelectMode = () => {
            setSelectMode(!selectMode);
            setSelectedTodos([]); 
        };

        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSelectMode(false);
                setSelectedTodos([]);
            }
        };

  return (
    <div className='TodoWrapper' ref={wrapperRef}>
        <h1>Achieve your dreams today!</h1>
        <TodoForm addTodo ={addTodo} />
        <div className='selected-todos'> 
        {todos.length > 0 && (   
        <button className= 'trashcan' onClick={(e) => {
                e.stopPropagation(); 
                selectMode ? selectedTodoDelete() : toggleSelectMode();
            }} disabled={selectMode && selectedTodos.length === 0}>
                {selectMode ? <FontAwesomeIcon icon={faTrashCan} size='2xl' className='fa-icon'/> : <button className='select-button'> Select </button>}     
            </button> 
        )}
        {selectMode && selectedTodos.length >0 && (
                    <h3>{selectedTodos.length} todos selected</h3>
                )}
            </div>
        {todos.map((todo, index)=> (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo}/>
            ) : (
                <Todo task={todo} key={index} 
                ToggleComplete={ToggleComplete}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                handleSelectTodo={handleSelectTodo}
                isSelected={selectedTodos.includes(todo._id)}
                selectMode= {selectMode}/>
            )
            
        ))}    
    </div>
  )
}
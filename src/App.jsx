import { useEffect, useState } from 'react';
import Navbar from './assets/components/navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(false);

  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    settodos(storedTodos);
  }, []);

  const saveloc = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const togglefin = () => {
    setfinished(!finished);
  };

  const handleedit = (e, id) => {
    let t = todos.find(item => item.id === id);
    settodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    saveloc();
  };

  const handledelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    settodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveloc();
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    settodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos)); 
  };
  

  const displayedtasks = finished ? todos.filter(item => item.isCompleted) : todos;

  return (
    <>
      <Navbar />
      <div className='container w-2/3 my-10 mx-44 rounded-xl bg-yellow-200 p-4 min-h-screen '>
        <div className="addtodo">
          <h2 className='font-bold text-lg'>ADD Task</h2>
          <input type="text" onChange={handlechange} value={todo} className='w-1/2' />
          <button onClick={handleadd} disabled={todo.length < 1} className='bg-yellow-400 hover:bg-yellow-600 p-2 py-1 rounded-xl mx-4'>Save</button>
          <input type="checkbox" checked={finished} onChange={togglefin} /> Show Completed
        </div>
        <h1 className='font-bold text-xl'>Your Tasks</h1>
        <div className="todos">
          {displayedtasks.length === 0 && <div className='m-5'>No Tasks To Display</div>}
          {displayedtasks.map((item, index) => (
            <div key={index} className="todo flex justify-between w-3/4 my-2">
              <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="button">
                <button onClick={(e) => handleedit(e, item.id)} className='bg-yellow-400 hover:bg-yellow-600 p-2 py-1 rounded-xl mx-1'>EDIT</button>
                <button onClick={(e) => handledelete(e, item.id)} className='bg-yellow-400 hover:bg-yellow-600 p-2 py-1 rounded-xl mx-1'>DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

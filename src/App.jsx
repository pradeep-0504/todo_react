import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const[todo,setTodo]=useState("")
  const[todos,setTodos]=useState([])

  useEffect(()=>{
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodo(todos)
    }
  },[])
  const saveToLs = (params) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  


  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos);
    
  }
  const handleEdit=(e,id)=>{
    console.log(`${id}`)
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    

  }
  const handleAdd=()=>{
    if(todo.trim()){
    setTodos([...todos,{id:uuidv4(),todo, isCompleted:false}])
    setTodo("")
  }}
  const handleChange=(e)=>{
    setTodo(e.target.value);
  }

  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos);
     
  }

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-300 min-h-[80vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2'/>
          <button onClick={handleAdd} className='mx-5 bg-slate-800 hover:bg-slate-900 py-1 p-2 text-white rounded-md font-Bold'>Add</button>
        </div>
         <h1 className='text-xl font-bold'>Your Todos</h1>
         <div className="todos">
          {todos.length===0 && <div className='m-4 bg-red-500 text-white inline-block p-1'>No Todos to display</div>}
            {todos.map(item=>{

           return <div key={item.id} className="todo flex w-1/2 justify-between my-3 text-black font-semibold">
            <div className='flex gap-5'>
            <input name={item.id} onClick={handleCheckbox} type="checkbox" value={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='mx-1 bg-slate-800 hover:bg-slate-900 py-1 p-2 text-white rounded-md font-Bold'>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='mx-1 bg-slate-800 hover:bg-slate-900 py-1 p-2 text-white rounded-md font-Bold'>Delete</button>
            </div>

          </div>
           })}
         </div>
      </div>
    </>
  )
}

export default App

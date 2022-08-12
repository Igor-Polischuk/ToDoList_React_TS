import React, { useEffect } from 'react';

import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';
import CreateTask from '../createTask/createTask';

import ITask from '../../types/ITask';

import './app.scss'

function App(){
  const [tasks, setTasks] = React.useState<ITask[]>([])
  const [createdTask, setCreateTask] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<string>('all')
  const [categoryes, setCategoryes] = React.useState<string[]>(['Ideas', 'Health&Sport', 'Work'])

  const localStorage = window.localStorage

  useEffect(() => {
    if (localStorage.getItem('tasks') !== null){
      let data = localStorage.getItem('tasks')
      let parsedData : ITask[] = JSON.parse(data!)
      setTasks(parsedData)
    }
  }, [])

  function saveToLocal(elem : any){
    localStorage.setItem('tasks', JSON.stringify(elem))
  }

  const createNewTask = (name: string, descr: string, category: string) => {
    const newTask : ITask = {
      name,
      descr,
      category,
      date: new Date(),
      isComplete: false,
      isImportant: false,
      id: `${new Date()}${Math.random()}`
    }  
    setTasks([...tasks, newTask])
    saveToLocal([...tasks, newTask])
  }

  const toggleCreateTask = () => {
    setCreateTask((createdTask : boolean ) => !createdTask)
  }

  function setComplete (id:string):void {

    const newTasks = tasks.map(task => {
      console.log(task);
      
      if (task.id === id){
        return {...task, isComplete: !task.isComplete}
      }
      return task
    })

    setTasks(newTasks)
    saveToLocal(newTasks)
  }

  function setImportant(id:string):void{
    const newTasks = tasks.map(task => {
      console.log(task);
      
      if (task.id === id){
        return {...task, isImportant: !task.isImportant}
      }
      return task
    })

    setTasks(newTasks)
    saveToLocal(newTasks)
  }

  function setRemove(id:string):void{
    const newTasks = tasks.filter(item => item.id !== id)
    setTasks(newTasks)
    saveToLocal(newTasks)
  }

  function filterTasks(filter : string) {
    switch (filter){
      case 'all':
        return tasks
      case 'important':
        return tasks.filter(item => item.isImportant === true)
      case 'completed':
        return tasks.filter(item => item.isComplete === true)   
    }

    if (categoryes.includes(filter)){
      return tasks.filter(item => item.category === filter)
    }
  }

  const showTasks : any = filterTasks(filter)

  return (
    
    <main>
      <Sidebar toggleCreateTask={toggleCreateTask} setFilter={setFilter} categoryes={categoryes}/>
      {createdTask ? <CreateTask 
                      toggleCreateTask={toggleCreateTask} 
                      createNewTask={createNewTask}
                      categoryes={categoryes}
                      setCategoryes={setCategoryes}
                      /> :
                      <Content 
                      currentCat={filter}
                      tasks={showTasks} 
                      setComplete={setComplete} 
                      SetImportant={setImportant}
                      setRemove={setRemove}/>
        }
    </main>
  )
}

export default App;

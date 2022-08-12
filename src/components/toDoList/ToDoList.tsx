import {FC, ReactNode, useState } from "react";

import ITask from "../../types/ITask";

import { Container } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Checkbox from '@mui/material/Checkbox';

import './toDoList.scss'

const ToDoList : FC<{
  setComplete : (id:string) => void,
  SetImportant : (id:string) => void,
  setRemove : (id:string) => void,
  tasks: ITask[]
}> = ({tasks, setComplete, SetImportant, setRemove}) =>  {
  
  let content :ReactNode;

  if (tasks.length > 0){
    content = tasks.map((task :ITask) => <ToDoListItem 
                                            setComplete={setComplete} 
                                            SetImportant={SetImportant}
                                            setRemove={setRemove}
                                            key={task.id} 
                                            task={task}/>)
  } else{
    content = <h2 style={{
      textAlign: 'center', 
      color: '#474747', 
      fontSize: 24, 
      background: 'rgba(1, 101, 223, 0.363)',
      padding: 20
    }}>No tasks yet</h2>
  }


  return (
    <Container>
      <ul className="todoList">
        {content}
      </ul>
    </Container>
  )
}

const ToDoListItem : FC<{
  setComplete : (id:string) => void,
  SetImportant : (id:string) => void,
  setRemove : (id:string) => void,
  task: ITask
}> = ({task, setComplete, SetImportant, setRemove}) => {

  const {id, name, descr, isComplete, isImportant, date, category} = task

  const [isCardOpen, setOpenCard] = useState(false)

  let todoItemClassList: string = 'todoList__item'
  todoItemClassList = isComplete ? todoItemClassList + ' complete' : todoItemClassList
  todoItemClassList = isImportant ? todoItemClassList + ' important' : todoItemClassList

  function open(e:any){
    if(e.target.classList.contains('todoList__item') || e.target.classList.contains('todoList__descr')){
      setOpenCard(isCardOpen => !isCardOpen)
    } 
    
  }

  return (
    <li>
      <div className={todoItemClassList} onClick={open}>
        <div className="todoList__check" onClick={() => setComplete(id)}>
          <Checkbox
            icon={<CircleOutlinedIcon sx={{ fontSize: 28, color: '#0aa3c2' }} />}
            checkedIcon={<CheckCircleOutlinedIcon sx={{ fontSize: 28, color: '#02f7c2' }} />}
            checked={isComplete} />
          <p className="todoList__task-name"
            style={{
              textDecoration: isComplete ? 'line-through' : 'none'
            }}>{name}</p>
        </div>
        {!isCardOpen &&
          <p
            className="todoList__descr"
            style={{
              textDecoration: isComplete ? 'line-through' : 'none'
            }}
            >{descr.length < 50 ? descr : descr.slice(0, 50) + '...'}</p>}
        
        <div style={{ gap: 20, padding: '0 30px' }}>
          <DeleteSweepOutlinedIcon sx={{
            color: "#bf434a",
            fontSize: 28,
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: '#ff2937'
            }
          }} 
            onClick={() => setRemove(id)}/>
          <StarIcon sx={{
            color: isImportant ? "#fff017" : "#fff",
            fontSize: 28,
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: '#ffdd00'
            }
          }}
            onClick={() => SetImportant(id)} />
        </div>
      </div>
      {isCardOpen && 
        <div className="todoList__item-open">
          <p className="task__data">
            <span className="task__data-cat">Category: {category}</span>
            {/* <span className="task__data-time">Task creation date: {date}</span> */}
            <span className="task__data-deadline">Deadline: 20/07/2022/12:00</span>
            <span className="task__data-process">In process</span>
          </p>
          <p className="task__descr">{descr}</p>
        </div>
      }
    </li>
  );
}

export default ToDoList;
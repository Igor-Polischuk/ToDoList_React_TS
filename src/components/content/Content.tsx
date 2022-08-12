import React from "react";

import ContentHeader from "../contentHeader/contentHeader"
import ToDoList from "../toDoList/ToDoList"

import ITask from '../../types/ITask';

type ContentProps = {
    tasks: ITask[];
    setComplete : (id:string) => void;
    SetImportant : (id:string) => void;
    setRemove : (id:string) => void;
    currentCat : string;
}

const Content : React.FC<ContentProps> = ({tasks, setComplete, SetImportant, setRemove, currentCat}) => {
    
    return (
        <section>
            <ContentHeader currentCat={currentCat}/>
            <ToDoList tasks={tasks} setRemove={setRemove} setComplete={setComplete} SetImportant={SetImportant}/>
        </section>
    )
}

export default Content
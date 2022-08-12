import { Container } from "@mui/system"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import  { useState, FC } from "react";

type CreateTaskProps = {
    toggleCreateTask : () => void;
    createNewTask : (name: string, descr: string, category: string) => void;
    categoryes : string[];
    setCategoryes : (newCat : string[]) => void;
}


const CreateTask : FC<CreateTaskProps> = ({toggleCreateTask, createNewTask, categoryes, setCategoryes}) => {
    const [category, setValue] = useState<string | null>(null)
    const [taskName, setTaskName] = useState<string>('')
    const [taskDescr, setTaskDescr] = useState<string>('')

    const [isFilledName, setisFilledName] = useState<boolean>(false)
    const [isFilledDescr, setisFilledDescr] = useState<boolean>(false)

    const create = () => {
        if (taskName.trim() === ''){
            setisFilledName(true)
            return
        }
        // if (taskDescr.trim() === ''){
        //     setisFilledDescr(true)
        //     return
        // }
        if (category === '' || category === null){
            
            setValue('Other')
        }

        if (!categoryes.includes(category!)){
            setCategoryes([...categoryes, category!])
        }
        
        createNewTask(taskName, taskDescr, category!)
        toggleCreateTask()
    }

    return (
        <Container sx={{ paddingTop: 5 }} maxWidth='sm'>
            <h1>Create a new task</h1>
            <TextField
                error={isFilledName}
                id="standard-basic"
                label="Enter task name"
                fullWidth variant="standard"
                value={taskName}
                onChange={(e : any) => {
                    setTaskName(e.target.value)
                    setisFilledName(false)
                }}
                sx={{ margin: '20px 0' }} />
            <TextField
                id="outlined-multiline-flexible"
                label="Enter a task description"
                multiline
                fullWidth
                error={isFilledDescr}
                value={taskDescr}
                onChange={(e : any) => {
                    setTaskDescr(e.target.value)
                    setisFilledDescr(false)
                }}
                rows={10}
                variant="filled"
            />
            <Autocomplete
                sx={{padding: '20px 0'}}
                id="free-solo-demo"
                freeSolo
                value={category}
                options={categoryes.map((option : string) => option)}
                onChange={(e : any, newValue : string | null) => setValue(newValue)}
                onInput={(e : any) => setValue(e.target.value)}
                renderInput={(params) => <TextField {...params} label="Category"/>}
            />
            <Stack sx={{ paddingTop: 4 }} direction="row" spacing={3}>
                <Button 
                    variant="contained" 
                    color="success"
                    onClick={create}>Create a task</Button>
                <Button variant="outlined" color="error" onClick={toggleCreateTask}>Cancel</Button>
            </Stack>
        </Container>
    )
}

export default CreateTask


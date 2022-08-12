interface ITask{
    id: string;
    name: string;
    descr: string;
    category: string;
    date: Date;
    isImportant: boolean;
    isComplete: boolean;
    deadline?: Date;
}

export default ITask
import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {


    function removeTask( todolistID: string, id: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id != id);
        tasks[todolistID] = filteredTasks
        setTasks({...tasks});
    }

    function addTask(todolistID: string,title: string ) {
        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [task, ...tasks[todolistID]];
        setTasks({...tasks});
    }

    function changeStatus(todolistID: string,taskId: string, isDone: boolean ) {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeFilter(todolistID: string, value: FilterValuesType ) {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    type TodolistsType = {
        id: string
        title: string
        filter: FilterValuesType
    }


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])



    type TasksType = {
        [key: string]: TaskType[]
    }


    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTodolist = (todolistID: string) => {

        setTodolists(todolists.filter(todolist=>todolist.id!==todolistID))

        delete tasks[todolistID]

        setTasks({...tasks})

    }


    return (
        <div className="App">
            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === "active") {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone === false);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone === true);
                }

                return <Todolist key={todolist.id}
                                 todolistId={todolist.id}
                                 title={todolist.title}
                                 tasks={tasksForTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
                                 filter={todolist.filter}
                                 removeTodolist={removeTodolist}
                />
            })}


        </div>
    );
}

export default App;

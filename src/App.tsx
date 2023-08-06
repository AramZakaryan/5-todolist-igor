import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    // // Old Version
    //     function removeTask(id: string) {
    //         let filteredTasks = tasks.filter(t => t.id !== id);
    //         setTasks(filteredTasks);
    //     }

    // New Version
    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id));
    }



    // // Old Version
    // function addTask(title: string) {
    //     let task = {id: v1(), title: title, isDone: false};
    //     let newTasks = [task, ...tasks];
    //     setTasks(newTasks);
    // }

    // New Version
    function addTask(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }


    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    // Old Version: Not correct for Redux
    // function changeTaskStatus (id:string, isDone: boolean) {
    //     let newTask = tasks.find(el=>
    //         el.id === id
    //     )
    //     if (newTask) {newTask.isDone=isDone}
    //     setTasks([...tasks])
    // }

    // New Version: correct for Redux
    function changeTaskStatus(id: string, isDone: boolean) {
        setTasks(tasks.map(el => {
                    return (
                        el.id === id ?
                            {...el, isDone: isDone} :
                            el
                    )
                }
            )
        )
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

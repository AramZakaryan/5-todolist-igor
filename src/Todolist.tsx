import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import S from "./Todolist.module.css"
import {Checkbox} from "./components/Checkbox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id:string, isDone: boolean)=>void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")

    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim()){
        props.addTask(title.trim());
        setTitle("");
        } else {
            setError("The fild is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const [coloredBtn, setColoredBtn] = useState<FilterValuesType>("all")

    const onClickHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
        setColoredBtn(filter)
    }

    const intermediary = (id:string, newIsDone:boolean)=>{
        props.changeTaskStatus(id, newIsDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyDown={ onKeyPressHandler }
                   className={error?S.error:""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={S.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}
                               className={t.isDone?S.isDone:""}
                    >

                        <Checkbox isDone={t.isDone} checkboxCallback={(newIsDone)=>intermediary(t.id, newIsDone)}/>

                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={ ()=>onClickHandler("all") }
                    className={coloredBtn==="all"?S.activeFilter:""}
            >All</button>
            <button onClick={ ()=>onClickHandler("active") }
                    className={coloredBtn==="active"?S.activeFilter:""}
            >Active</button>
            <button onClick={ ()=>onClickHandler("completed") }
                    className={coloredBtn==="completed"?S.activeFilter:""}
            >Completed</button>
        </div>
    </div>
}

import React, {ChangeEvent} from 'react';
import {TaskType} from "../Todolist";

type CheckboxPropsType = {
    isDone: boolean
    checkboxCallback:(newIsDone: boolean)=>void
}

export const Checkbox:React.FC<CheckboxPropsType> = (props) => {
    const checkboxHandler = (ev:ChangeEvent<HTMLInputElement>) =>
        props.checkboxCallback(ev.currentTarget.checked)


    return (
        <div>
            <input type="checkbox"
                   checked={props.isDone}
                   onChange={checkboxHandler}
            />
        </div>
    );
};
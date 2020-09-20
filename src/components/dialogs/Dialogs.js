import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./dialigItem/DialogItem";
import MessageItem from "./messageItem/MeesageItem";
import {DialogsReduxForm} from "./dialogsForm/DialogsReduxForm";

const Dialogs = (props) => {

    const onSendMessageClick = (text) => {
        props.addMessage(text);
    }

    const message = props.dialogsPage.messages.map(m => <MessageItem message={m.message} key={m.id}/>)
    const dialog = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/> )

    return (
    <div className={s.dialogs}>
        <div>
            {dialog}
        </div>
        <div className={s.messages}>
            {message}
        </div>
        <DialogsReduxForm onSubmit={onSendMessageClick}/>
    </div>
    )
}

export default Dialogs;
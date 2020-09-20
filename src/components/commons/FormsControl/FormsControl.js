import React from "react";
import style from "./FormsControl.module.css"

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={(hasError ? style.error : '') + ' ' + style.formControl}>
        <div >
            {props.children}
        </div>
    {hasError ? <small>{meta.error}</small> : ''}
    </div>
    )
}

export const Textarea = (props) => {
    return (
        <FormControl {...props}><textarea {...props} {...props.input} /></FormControl>
    )
}

export const Input = (props) => {
    return (
        <FormControl {...props}><input {...props} {...props.input} /></FormControl>
    )
}


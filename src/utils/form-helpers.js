import {Field} from "redux-form";
import React from "react";

export const createField = (component, name, placeholder, validators = {}, props = {}, text = '') => {
    return (
        <div>
            <Field component={component} name={name} placeholder={placeholder} validate={validators} {...props}/>{text}
        </div>
    )
}
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators";
import {Textarea} from "../../commons/FormsControl/FormsControl";

const maxLength10 = maxLength(10);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'text'} placeholder='введите сообщеник' validate={[maxLength10, required]}/>
            <button>Press</button>
        </form>
    )
}

export const DialogsReduxForm = reduxForm({
    form: 'DialogsForm'
})(DialogsForm)
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../commons/FormsControl/FormsControl";
import {maxLength, required} from "../../../../utils/validators";

const maxLength10 = maxLength(10)
const MyProfileForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"text"} placeholder={'напишите новый пост'} validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export const MyProfileReduxForm = reduxForm({
    form: 'MyProfileForm'
})(MyProfileForm)
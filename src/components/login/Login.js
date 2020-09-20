import React from "react";
import {reduxForm} from "redux-form";
import {Input} from "../commons/FormsControl/FormsControl";
import {required} from "../../utils/validators";
import {Redirect} from "react-router-dom";
import style from "../commons/FormsControl/FormsControl.module.css"
import {createField} from "../../utils/form-helpers";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField(Input, 'email', 'Login', required)}
            {createField(Input, 'password', 'Password', required, {type: 'password'})}
            {createField(Input, 'rememberMe', 'Password','', {type: 'checkbox'}, 'Remember me')}
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm ({
    form: 'login'
})(LoginForm)

const Login = ({isAuth, loginUser}) => {

    const onSubmit = ({email, password, rememberMe}) => {
        loginUser(email, password, rememberMe)
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div> 
}

export default Login;
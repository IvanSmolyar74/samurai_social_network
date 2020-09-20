import React, {Component} from "react";
import Login from "./Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {loginUser} from "../../redux/auth-reducer";

class LoginContainer extends Component {
    render() {
        return <Login {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default compose(
    connect(mapStateToProps, {loginUser})
)(LoginContainer)
import React, {Component} from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

class HeaderContainer extends Component {
    render() {
        console.log('render Header')
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default compose(
    connect(mapStateToProps, {logout})
)(HeaderContainer);

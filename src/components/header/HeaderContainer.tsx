import React, {Component} from "react";
import Header from "./Header";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import { AppStateType } from "../../redux/redux-store";

type PropsStateType = {
    isAuth: boolean
    login: number | null
}

type PropsDispatchType = {
    logout: () => void
}

type PropsOwnType = {}

type PropsType = PropsStateType & PropsDispatchType & PropsOwnType

class HeaderContainer extends Component<PropsType> {
    render() {
        return <Header
            isAuth={this.props.isAuth}
            login={this.props.login}
            logout={this.props.logout}
        />
    }
}

const mapStateToProps = (state: AppStateType): PropsStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default compose(
    connect<PropsStateType, PropsDispatchType, PropsOwnType, AppStateType>(mapStateToProps, {logout})
)(HeaderContainer);

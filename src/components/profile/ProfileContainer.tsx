import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/ProfileReducer";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsStateType = {
    profile: ProfileType | null
    myId: number | null
    status: string
    authorizedUserId: number | null
}

type PropsDispatchType = {
    getUserProfile: any
    getUserStatus: any
    updateUserStatus: (newStatus: string) => void
}

type MatchType = {
    params: {userId: number | null}
}

type PropsOwnerType = {
    match: MatchType
    store: any
}

type PropsType = PropsStateType & PropsDispatchType & PropsOwnerType

class ProfileContainer extends Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile 
            profile={this.props.profile}
            newStatus={this.props.status}
            updateUserStatus={this.props.updateUserStatus}
            />
        )
    }
}

const mapStateToProps = (state: AppStateType): PropsStateType => ({
    profile: state.profilePage.profile,
    myId: state.auth.userId,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})

export default compose(
    connect<PropsStateType, PropsDispatchType, PropsOwnerType, AppStateType>(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
    )(ProfileContainer);
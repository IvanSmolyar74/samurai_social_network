import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/ProfileReducer";

class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) userId = this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    myId: state.auth.id,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
    )(ProfileContainer);
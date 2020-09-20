import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    follow, requestUsers,
    setFollowingProgress,
    unfollow
} from "../../redux/UsersReducer";
import Users from "./Users";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/user-selector";

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageClick = (page) => {
        this.props.getUsers(this.props.pageSize, page);
    }

    render() {
        return  <Users
                    onPageClick={this.onPageClick}
                    {...this.props}
               />
    }
}

const mapStateToProps = (state) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowingProgress: getIsFollowingProgress(state)
});

export default compose(
    connect(mapStateToProps, {getUsers: requestUsers, follow, unfollow, setFollowingProgress}))
    (UsersContainer);

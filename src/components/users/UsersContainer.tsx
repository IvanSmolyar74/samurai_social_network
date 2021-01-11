import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    follow, 
    requestUsers,
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
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type PropsStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowingProgress: Array<number | boolean>
}

type PropsDispatchType = {
    getUsers: (pageSize: number, currentPage: number) => void
    follow: (id: number) => void
    unfollow: (id: number) => void
}

type OwnPropsType = {}

type PropsType = PropsStateType & PropsDispatchType & OwnPropsType

class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onPageClick = (page: number) => {
        this.props.getUsers(this.props.pageSize, page);
    }

    render() {
        return  <Users
                    onPageClick={this.onPageClick}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    isFetching={this.props.isFetching}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    users={this.props.users}
                    isFollowingProgress={this.props.isFollowingProgress}
                    totalUsersCount={this.props.totalUsersCount}
               />
    }
}

const mapStateToProps = (state: AppStateType): PropsStateType => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    isFollowingProgress: getIsFollowingProgress(state)
});

export default compose(
    connect<PropsStateType, PropsDispatchType, OwnPropsType,  AppStateType>(mapStateToProps, {getUsers: requestUsers, follow, unfollow}))
    (UsersContainer);

import {userApi} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
const IS_FOLLOWING_PROGRESS = 'IS_FOLLOWING_PROGRESS';

let initialState = {
    "users": [],
    "pageSize": 10,
    "totalUsersCount": 20,
    "currentPage": 1,
    "isFetching": true,
    "isFollowingProgress": []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});
export const setTotalUsersCount = (totalUsersCount) => ({type: TOTAL_USERS_COUNT, totalUsersCount});
export const setFollowingProgress = (isFetching, userId) => ({type: IS_FOLLOWING_PROGRESS, isFetching, userId})

export const requestUsers = (count, currentPage) => (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage))
    userApi.getUsers(count, currentPage)
        .then(data => {
            dispatch(setUsers(data.items));
            dispatch(setIsFetching(false));
            dispatch(setTotalUsersCount(data.totalCount));
        })
}

const followUnfollow = async (userId, dispatch, useApi, actionCreator) => {
    dispatch(setFollowingProgress(true, userId));
    const resultCode = await useApi
    if (resultCode === 0) dispatch(actionCreator(userId));
    dispatch(setFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    await followUnfollow(userId, dispatch, userApi.followUser(userId), followSuccess)
}

export const unfollow = (userId) => async (dispatch) => {
    await followUnfollow(userId, dispatch, userApi.unfollowUser(userId), unfollowSuccess)
}

export default usersReducer;
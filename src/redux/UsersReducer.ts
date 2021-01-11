import {ResultCodeEnum, userApi} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import { UsersType } from "../types/types"
import { AppStateType } from "./redux-store";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
const IS_FOLLOWING_PROGRESS = 'IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    isFollowingProgress: [] as Array<number | boolean> //Array of users Id
}

type InitialStateType = typeof initialState

type ActionType  = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType |
    SetIsFetchingActionType | SetTotalUsersCountActionType | SetFollowingProgressActionType

const usersReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.payload
            }
        case IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFetching ? 
                    [...state.isFollowingProgress, action.isFetching] : 
                    state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    payload: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, payload: userId});

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    payload: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, payload: userId});

type SetUsersActionType = {
    type: typeof SET_USERS
    payload: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, payload: users});

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    payload: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, payload: currentPage});

type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    payload: boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({type: SET_IS_FETCHING, payload: isFetching});

type SetTotalUsersCountActionType = {
    type: typeof TOTAL_USERS_COUNT
    payload: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: TOTAL_USERS_COUNT, payload: totalUsersCount});

type SetFollowingProgressActionType = {
    type: typeof IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number 
}
export const setFollowingProgress = (isFetching: boolean, userId: number): SetFollowingProgressActionType => ({type: IS_FOLLOWING_PROGRESS, isFetching, userId})

type DispatchType = Dispatch<ActionType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType>

export const requestUsers = (count: number, currentPage: number): ThunkType => async (dispatch: DispatchType) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage))

    const data = await userApi.getUsers(count, currentPage)
    dispatch(setUsers(data.items));
    dispatch(setIsFetching(false));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollow = async (userId: number, dispatch: DispatchType, useApi: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(setFollowingProgress(true, userId));
    const resultCode = await useApi
    if (resultCode === ResultCodeEnum.success) dispatch(actionCreator(userId));
    dispatch(setFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    await followUnfollow(userId, dispatch, userApi.followUser(userId), followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    await followUnfollow(userId, dispatch, userApi.unfollowUser(userId), unfollowSuccess)
}

export default usersReducer;
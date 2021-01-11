import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {profileApi} from "../API/api";
import {PostType, ProfileType} from "../types/types"
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const POST_DELETE = 'POST_DELETE';

let initialState = {
    posts: [
        {
            message: 'Hi, how are you?',
            likesCounter: 15,
            id: 1
        },
        {
            message: 'It is my first post!',
            likesCounter: 25,
            id: 2
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: 'Enter your status here'
}

export type InitialStateType = typeof initialState

type ActionTypes = AddPostActionType | SetUserProfileActionType | SetUserStatusActionType | DeletePostActionType

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            if (!action.payload) return state;
            return {
                ...state,
                posts: [...state.posts, {
                    "message": action.payload,
                    "likesCounter": 0,
                    "id": Date.now()
                }],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case SET_USER_STATUS :
            return {
                ...state,
                status: action.payload
            }
        case POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        default:
            return state;
    }
}

// ActionsCreators

type AddPostActionType = {
    type: typeof ADD_POST 
    payload: string
}

export const addPost = (newPostText: string): AddPostActionType => ({
    type: ADD_POST, 
    payload: newPostText
});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    payload: profile
});

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    payload: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, payload: status});

type DeletePostActionType = {
    type: typeof POST_DELETE
    payload: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: POST_DELETE, payload: postId})

// ThunksCreators
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUserProfile = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    const data = await profileApi.getUserProfile(userId);
    dispatch(setUserProfile(data));

};
export const getUserStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    const data = await profileApi.getUserStatus(userId)

    if (!data) return
    dispatch(setUserStatus(data))

};
export const updateUserStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
    const response = await profileApi.updateStatusUserProfile(status)

    if (response.data.resultCode === 0) dispatch(setUserStatus(status));

};

export default profileReducer;
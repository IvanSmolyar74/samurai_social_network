import {profileApi} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const POST_DELETE = 'POST_DELETE';

let initialState = {
    "posts": [
        {
            "message": 'Hi, how are you?',
            "likesCounter": 15,
            "id": '1'
        },
        {
            "message": 'It is my first post!',
            "likesCounter": 25,
            "id": '2'
        }
    ],
    "profile": null,
    "status": 'Enter your status here'
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            if (!action.newPostText.text) return state;
            return {
                ...state,
                posts: [...state.posts, {
                    "message": action.newPostText.text,
                    "likesCounter": 0,
                    "id": Date.now().toString()
                }],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS :
            return {
                ...state,
                status: action.status
            }
        case POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        default:
            return state;
    }
}

// ActionsCreators
export const addPost = (newPostText) => ({
    type: ADD_POST, newPostText
});
export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: POST_DELETE, postId})

// ThunksCreators
export const getUserProfile = (userId) => async (dispatch) => {
    const data = await profileApi.getUserProfile(userId);
    dispatch(setUserProfile(data));

};
export const getUserStatus = (userId) => async (dispatch) => {
    const data = await profileApi.getUserStatus(userId)

    if (!data) return
    dispatch(setUserStatus(data))

};
export const updateUserStatus = (status) => async (dispatch) => {
    const response = await profileApi.updateStatusUserProfile(status)

    if (response.data.resultCode === 0) dispatch(setUserStatus(status));

};

export default profileReducer;
import {authApi} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: true,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
//ActionCreators
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

//ThunkCreators
export const getAuthUser = () => async (dispatch) => {
    const data = await authApi.authUser()

    if (data.resultCode === 0) {
        const {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true));
    }

}

export const loginUser = (email, password, rememberMe) => async (dispatch) => {
    const response = await authApi.loginUser(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getAuthUser())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages : 'some error';
        dispatch(stopSubmit('login', {_error: message}))
    }

}

export const logout = () => async (dispatch) => {
    const data = await authApi.logout()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

export default authReducer;
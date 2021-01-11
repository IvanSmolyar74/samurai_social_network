import {authApi, securityApi, ResultCodeEnum, ResultCodeCAptcha} from "../API/api";
import {stopSubmit} from "redux-form";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: true,
    isAuth: false
}

export type InitialStateType = typeof initialState

type ActionTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                login: '123',
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
//ActionCreators

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl }
})

//ThunkCreators

type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUser = (): ThunkType => async (dispatch: DispatchType) => {
    const data = await authApi.authUser()

    if (data.resultCode === ResultCodeEnum.success) {
        const { id, login, email } = data.data
        dispatch(setAuthUserData(id, login, email, true));
    }

}

export const loginUser = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
    const response = await authApi.loginUser(email, password, rememberMe, captcha)

    if (response.data.resultCode === ResultCodeEnum.success) {
        dispatch(getAuthUser())
    } else {
        if (response.data.resultCode === ResultCodeCAptcha.getCaptcha) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.message.length > 0 ? response.data.message : 'some error';
        dispatch(stopSubmit('login', {_error: message}))
    }

}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityApi.getCaptchaUrl()
}

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
    const data = await authApi.logout()

    if (data.resultCode === ResultCodeEnum.success) {
        dispatch(setAuthUserData(null, null, null, false));
    }

}

export default authReducer;
import axios from "axios";
import { UsersType } from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0d8806c4-7afd-46f2-95f2-b162d060331a'
    }
})

type GetUsersType = {
    items: Array<UsersType>
    totalCount: ResultCodeEnum
    error: string
}

type FollowUnfollowUserType = {
    resultCode: ResultCodeEnum
    message: Array<string>
    data: {}
}

export const userApi = {
    getUsers(count: number, currentPage: number) {
        return instance.get<GetUsersType>(`users?count=${count}&page=${currentPage}`)
            .then(response => response.data)
    },
    followUser(userId: number) {
        return instance.post<FollowUnfollowUserType>(`follow/${userId}`)
            .then(response => response.data.resultCode)
    },
    unfollowUser(userId: number) {
        return instance.delete<FollowUnfollowUserType>(`follow/${userId}`)
            .then(response => response.data.resultCode)
    }
}

type GetUserProfileType = UsersType
type GetUserStatus = {
    status: string
}
type UpdateStatusType = {
    resulCode: ResultCodeEnum
    message: Array<string>
    data: {}
}

type SavePhotoProfileType = {
    data: {
        small: string
        large: string
    }
    message: Array<string>
    resultCode: ResultCodeEnum
}

export const profileApi = {
    getUserProfile(userId: number) {
        return instance.get<GetUserProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<GetUserStatus>(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatusUserProfile(status: string) {
        return instance.put<UpdateStatusType>(`profile/status`, {
            status
        })
    },
    savePhotoProfile(photo: any) {
        const formData = new FormData()
        formData.append('image', photo)

        return instance.put<SavePhotoProfileType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

type AuthUserType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    message: Array<string>
}

export enum ResultCodeEnum {
    success = 0,
    error = 1
}

type LoginLogoutType = {
    resultCode: ResultCodeEnum | ResultCodeCAptcha
    message: Array<string>
    data: {}
}

export const authApi = {
    authUser() {
        return instance.get<AuthUserType>(`auth/me`)
            .then(response => response.data)
    },
    loginUser(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginLogoutType>(`/auth/login`,{
            email,
            password,
            rememberMe,
            captcha
        })
    },
    logout() {
        return instance.delete<LoginLogoutType>(`/auth/login`).then(ses => ses.data)
}
}

export enum ResultCodeCAptcha {
    getCaptcha = 10
}

type CaptchaType = {
    urlCaptcha: string
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<CaptchaType>(`security/get-captcha-url`)
    }
}


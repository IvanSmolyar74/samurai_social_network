import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '0d8806c4-7afd-46f2-95f2-b162d060331a'
    }
})

export const userApi = {
    getUsers(count, currentPage) {
        return instance.get(`users?count=${count}&page=${currentPage}`)
            .then(response => response.data)
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data.resultCode)
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data.resultCode)
    }
}

export const profileApi = {
    getUserProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatusUserProfile(status) {
        return instance.put(`profile/status`, {
            status
        })
    }
}

export const authApi = {
    authUser() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    loginUser(email, password, rememberMe = false) {
        return instance.post(`/auth/login`,{
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete(`/auth/login`)
}
}


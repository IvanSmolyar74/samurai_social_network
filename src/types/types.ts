export type PostType = {
    message: string
    likesCounter: number
    id: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagramm: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    useId: number
    lookinForAJob: boolean
    lookinForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
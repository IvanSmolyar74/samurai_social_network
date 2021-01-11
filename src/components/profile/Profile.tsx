import React from "react";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/ProfileInfo";
import { ProfileType } from '../../types/types'

type PropsType = {
    profile: ProfileType | null
    updateUserStatus: (newStatus: string) => void
    newStatus: string
    store?: any
}

const Profile: React.FC<PropsType> = ({profile, updateUserStatus, newStatus, store}) => {
    return (
        <div >
            <ProfileInfo profile={profile} updateUserStatus={updateUserStatus} newStatus={newStatus}/>
            <MyPostsContainer store={store} />
        </div>
    )
}

export default Profile;
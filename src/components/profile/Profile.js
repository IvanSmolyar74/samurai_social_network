import React from "react";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import ProfileInfo from "./profileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div >
            <ProfileInfo profile={props.profile} updateUserStatus={props.updateUserStatus} status={props.status}/>
            <MyPostsContainer store={props.store} />
        </div>
    )
}

export default Profile;
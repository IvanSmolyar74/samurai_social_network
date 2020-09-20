import React from "react";
import styles from './ProfileInfo.module.css';
import photo from "../../../assets/image/avatar.jpg"
import Status from './Status';
import Preloader from "../../commons/Preloader/Preloader";

const ProfileInfo = React.memo( ({profile, status, updateUserStatus}) => {
    if (!profile) return <Preloader />
    return (
        <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHnHamnGAQO6byapKIZIp-6TZNYZksh2x3MQ&usqp=CAU" alt=""/>
            </div>
            <h2>{profile.fullName}</h2>
            <div className={styles.descriptionBlock}>
                <div className={styles.userAvatar}>
                    <img src={profile.photos.large || photo} alt="User avatar"/>
                </div>
                <p>{profile.lookingForAJobDescription}</p>
                <Status status={status} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    )
})

export default ProfileInfo;
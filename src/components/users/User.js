import styles from "./users.module.css";
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/image/avatar.jpg";
import React from "react";
import {compose} from "redux";
import withPreloader from "../../HOC/withPreloader";

const User = ({user, isFollowingProgress, unfollow, follow}) => {
    return (<div className={styles.userItem}>
        <div className={styles.userAva}>
                        <div>
                            <NavLink to={`profile/${user.id}`}>
                                <img src={user.photos.small || userPhoto} alt="avatar" className={styles.userPhoto}/>
                            </NavLink>
                        </div>
            {user.followed
                ? <button disabled={isFollowingProgress.some(id => id === user.id)}
                          onClick={() => {
                              unfollow(user.id)
                          }}
                          className={styles.btnUnfollow}>Unfollow</button>
                : <button disabled={isFollowingProgress.some(id => id === user.id)}
                          onClick={() => {
                              follow(user.id)
                          }}
                          className={styles.btnUnfollow}>Follow</button>}
        </div>
        <span>
                        <div>{user.name}</div><div>{user.status}</div>
        </span>
    </div>)
}

export default compose(withPreloader)(User);
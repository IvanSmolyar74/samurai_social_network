import React from "react";
import s from './MyPost.module.css';

const MyPost = (props) => {
    return (

        <div className={s.item}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" alt=""/>
            { props.message }
            <div>
                <span className={s.like}>{ props.likes }</span>
            </div>
        </div>

    )
}

export default MyPost;
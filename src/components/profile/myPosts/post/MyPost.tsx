import React from "react";
import s from './MyPost.module.css';

type PropsType = {
    message: string
    likes: number
}

const MyPost: React.FC<PropsType> = ({message, likes}) => {
    return (

        <div className={s.item}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" alt=""/>
            { message }
            <div>
                <span className={s.like}>{ likes }</span>
            </div>
        </div>

    )
}

export default MyPost;
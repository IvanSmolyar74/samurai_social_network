import React from "react";
import s from './MyPosts.module.css';
import MyPost from "./post/MyPost";
import {MyProfileReduxForm} from "./myProfileForm/MyProfileForm";
import { PostType } from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPost: any) => void
}

const MyPosts: React.FC<PropsType> = React.memo( ({addPost, posts}) => {
    const onNewPostText = (text: any) => {
        addPost(text);
    };

    let postsItem = posts.map((p) => <MyPost message={p.message} likes={p.likesCounter} key={p.id}/>)
    return (
            <div className={s.postBlock}>
                <h3>My posts</h3>
               <MyProfileReduxForm onSubmit={onNewPostText}/>
                <div className={s.posts}>
                    {postsItem}
                </div>
            </div>
    )
})

export default MyPosts;
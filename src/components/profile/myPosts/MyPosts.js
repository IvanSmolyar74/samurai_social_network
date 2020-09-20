import React from "react";
import s from './MyPosts.module.css';
import MyPost from "./post/MyPost";
import {MyProfileReduxForm} from "./myProfileForm/MyProfileForm";

const MyPosts = React.memo( (props) => {
    console.log('MyPosts')
    const onNewPostText = (text) => {
        props.addPost(text);
    };

    let postsItem = props.posts.map((p) => <MyPost message={p.message} likes={p.likesCounter} key={p.id}/>)
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
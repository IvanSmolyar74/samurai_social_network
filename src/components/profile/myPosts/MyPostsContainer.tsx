import {addPost} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";

type PropsStateType = {
    posts: Array<PostType>
}

type PropsDispatchType = {
    addPost: any
}

type PropsOwnType = {
    store: any
}

const mapStateToProps = (state: AppStateType): PropsStateType => ({
    posts: state.profilePage.posts,
});

export default compose(connect<PropsStateType, PropsDispatchType, PropsOwnType, AppStateType>(mapStateToProps, {addPost}))(MyPosts);
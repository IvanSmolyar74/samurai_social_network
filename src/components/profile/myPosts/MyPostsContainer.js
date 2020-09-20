import {addPost} from "../../../redux/ProfileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {compose} from "redux";


const mapStateToProps = (state) => ({
    posts: state.profilePage.posts,
});

export default compose(connect(mapStateToProps, {addPost}))(MyPosts);
import Dialogs from './Dialogs';
import {addMessage} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => ({
    dialogsPage: state.dialogsPage,
});

export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(Dialogs);
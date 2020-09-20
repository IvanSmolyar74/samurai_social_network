import React from "react";
import Preloader from "../components/commons/Preloader/Preloader";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    isFetching: state.usersPage.isFetching,
})

const withPreloader = (Component) => {
    class PreloaderContainer extends React.Component {
        render() {
            return <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Component
                        {...this.props}
                    />
                }
            </>
        }
    }
    return connect(mapStateToProps)(PreloaderContainer)
}

export default withPreloader;
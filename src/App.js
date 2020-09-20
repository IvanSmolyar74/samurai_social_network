import React from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import {Switch, withRouter, Route, BrowserRouter} from "react-router-dom";
import HeaderContainer from "./components/header/HeaderContainer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/authApp-reducer";
import Preloader from "./components/commons/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/users/UsersContainer"))
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"))
const LoginContainer = React.lazy(() => import("./components/login/LoginContainer"))
const Music = React.lazy(() => import( "./components/music/Music"));
const News = React.lazy(() => import( "./components/news/News"));
const Settings = React.lazy(() => import("./components/settings/Settings"))


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <React.Suspense fallback={<Preloader />}>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            <Route path='/music' render={() => <Music/>}/>
                            <Route path='/news' component={News}/>
                            <Route path='/settings' render={() => <Settings/>}/>
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginContainer/>}/>
                        </React.Suspense>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

const ContainerApp = compose(withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ContainerApp/>
            </Provider>
        </BrowserRouter>)
}

export default SamuraiJSApp;
import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./ProfileReducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./SidebarReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import initializedAppReducer from "./authApp-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: initializedAppReducer
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleWare)));
window.store = store;
export default store;
import profileReducer from "./ProfileReducer";
import sidebarReducer from "./SidebarReducer";
import dialogsReducer from "./dialogs-reducer";

const  Store = {
    "_state": {
        "dialogsPage": {
            "dialogs": [
                {"name": 'Ivan', "id": '1'},
                {"name": 'Lera', "id": '2'},
                {"name": 'Ksucha', "id": '3'},
                {"name": 'Lena', "id": '4'},
                {"name": 'Andrey', "id": '5'},
                {"name": 'Misha', "id": '6'},
                {"name": 'Sasha', "id": '7'},
            ],
            "messages": [
                {"message": 'Hi', "id": '1'},
                {"message": 'How are you', "id": '2'},
                {"message": 'Yo', "id": '3'}

            ],
            "newMessageBody": ""
        },
        "profilePage": {
            "posts": [
                {
                    "message": 'Hi, how are you?',
                    "likesCounter": 15,
                    "id": '1'
                },
                {
                    "message": 'It is my first post!',
                    "likesCounter": 25,
                    "id": '2'
                }
            ],
            "newPostText": ""
        },
        "sidebarPage": {
        }
    },
    _subscriber() {
        console.log('No subscribes');
    },
    getState() {return this._state},

    subscribe(observer)  {
        this._subscriber = observer;
    },

    dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebarPage = sidebarReducer(this._state.sidebarPage, action);

        this._subscriber(this._state);
    }
}

export default Store;
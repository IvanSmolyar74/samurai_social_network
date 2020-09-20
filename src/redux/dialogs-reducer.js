const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
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

    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  'ADD_MESSAGE':
            if (!action.newMessageBody.text) return state;
            return {
                ...state,
                messages: [...state.messages, {
                    "message": action.newMessageBody.text,
                    "id": Date.now().toString()
                }],
            }
        default:
            return state;
    }
}

export const addMessage = (newMessageBody) => ({
    type: ADD_MESSAGE, newMessageBody
});

export default dialogsReducer;
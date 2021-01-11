const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    dialogs: [
        {name: 'Ivan', id: 1},
        {name: 'Ksucha', id: 2},
        {name: 'Lera', id: 3},
        {name: 'Lena', id: 4},
        {name: 'Andrey', id: 5},
        {name: 'Misha', id: 6},
        {name: 'Sasha', id: 7},
    ] as Array<{name: string, id: number}>,
    messages: [
        {message: 'Hi', id: 1},
        {message: 'How are you', id: 2},
        {message: 'Yo', id: 3}

    ] as Array<{message: string, id: number}>
}

export type InitialStateType = typeof initialState

type ActionTypes = AddMessageActionType

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case  'ADD_MESSAGE':
            if (!action.payload) return state;
            return {
                ...state,
                messages: [...state.messages, {
                    message: action.payload,
                    id: Date.now()
                }],
            }
        default:
            return state;
    }
}

type AddMessageActionType = {
    type: typeof ADD_MESSAGE,
    payload: string 
}

type MessageType = {
    text: string
}

export const addMessage = ({ text }: MessageType): AddMessageActionType => ({
    type: ADD_MESSAGE, 
    payload: text
});

export default dialogsReducer;
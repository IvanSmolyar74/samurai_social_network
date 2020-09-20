import profileReducer, {addPost, deletePost} from "./ProfileReducer";

let state = {
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
    ]
}

it ('length posts should be incremented', () => {
    // Test data
    let action = addPost({text:'new Post Test'})


    //Action Test
    let result = profileReducer(state, action)
    // Expectation
    expect( result.posts.length ).toBe(3)
})

it ('after deleting length should be decrement', () => {
    let action = deletePost('1');

    let result = profileReducer(state, action);

    expect(result.posts.length).toBe(1)
})

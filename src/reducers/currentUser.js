
const signIn = action => {
    localStorage.setItem("token", action.payload.token);
    return action.payload
};

const signOut = (state) => {
    localStorage.removeItem("token");
    return null
};


export default (state = '', action) => {

    switch (action.type) {
        case 'SIGN_IN':
            return signIn(action)
        case 'SIGN_OUT':
            return signOut(state)
        default:
            return state
    }
}
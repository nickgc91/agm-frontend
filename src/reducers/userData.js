

export default (state = null, action) => {

    switch (action.type) {
        case 'GIVE_ME_USER_DATA':
            return action.payload
        case 'RELEASE_USER_DATA':
            return null
        default:
            return state
    }
}
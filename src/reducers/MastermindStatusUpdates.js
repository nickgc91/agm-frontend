

export default (state = [], action) => {

    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return [...state, action.payload]
        default:
            return state
    }
}
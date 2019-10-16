

export default (state = [], action) => {

    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return [...state, action.payload].slice(0,12)
        default:
            return state
    }
}
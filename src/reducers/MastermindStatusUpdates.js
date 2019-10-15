

export default (state = [], action) => {

    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return [action.payload, ...state].slice(0,12)
        default:
            return state
    }
}
const actionUpdatesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return action.payload.actionUpdates
        default:
            return state
    }
}

export default actionUpdatesReducer

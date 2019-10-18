const lifeStatusUpdatesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return action.payload.lifeStatusUpdates
        default:
            return state
    }
}

export default lifeStatusUpdatesReducer

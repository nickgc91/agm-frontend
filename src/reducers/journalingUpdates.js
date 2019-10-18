const journalingUpdatesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return action.payload.journalingUpdates
        default:
            return state
    }
}

export default journalingUpdatesReducer
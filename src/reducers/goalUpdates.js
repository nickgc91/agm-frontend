const goalUpdatesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_MASTERMIND_STATUS_UPDATE':
            return action.payload.goalUpdates
        case 'ADD_GOAL_UPDATE':
            return [action.payload, ...state].slice(0, 3)
        default:
            return state
    }
}

export default goalUpdatesReducer

import { combineReducers } from 'redux'
import currentUser from './currentUser'
import userData from './userData'
import mastermindStatusUpdates from './MastermindStatusUpdates'

export default combineReducers ({
    user: currentUser,
    userData: userData,
    mastermindStatusUpdates: mastermindStatusUpdates
})
import { combineReducers } from 'redux'
import currentUser from './currentUser'
import userData from './userData'
import goalUpdates from './goalUpdates'
import journalingUpdates from './journalingUpdates'
import lifeStatusUpdates from './lifeStatusUpdates'
import actionUpdates from './actionUpdates'
import updateJournalEntryToShow from './updateJournalEntryToShow'

export default combineReducers ({
    user: currentUser,
    userData: userData,
    goalUpdates,
    journalingUpdates,
    lifeStatusUpdates,
    actionUpdates,
    updateJournalEntryToShow
})
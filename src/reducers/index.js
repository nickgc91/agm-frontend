import { combineReducers } from 'redux'
import currentUser from './currentUser'
import userData from './userData'

export default combineReducers ({
    user: currentUser,
    userData: userData
})
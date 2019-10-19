
const baseUrl= 'http://localhost:3000'
const signinUrl = baseUrl + '/signin'
const createAccountUrl = baseUrl + '/newAccount'
const validateUrl = baseUrl + '/validate'
const getUserDataUrl = baseUrl + '/getUserData'
const getAccountabilityPartnerNameUrl = baseUrl + '/getAccPartner'
const createNewGoalUrl = baseUrl + '/createNewGoal'
const deleteGoalUrl = baseUrl + '/deleteGoal'
const deleteJournalEntryUrl = baseUrl + '/deleteJournalEntry'
const updateItemActionIsCompletedUrl = baseUrl + '/updateActionItemIsCompleted'
const createNewJournalEntryUrl = baseUrl + '/createNewJournalEntry'
const updateDateUrl = baseUrl + '/updateAccountabilityDate'
const lifeStatusUpdateUrl = baseUrl + '/lifeStatusUpdate'
const provideMastermindUpdatesUrl = baseUrl + '/provideMastermindUpdates'

const get = url => fetch(url, {
    headers: {
        Authorization: localStorage.getItem('token')
    }
}).then(resp => resp.json())


const post = (url, data) => 
{ 
return fetch(url, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(data)
}).then(resp => {
    return resp.json()})
}

const patch = (url, data) => 
{ 
return fetch(url, {
    method: 'PATCH',
    headers: { 
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
    },
    body: JSON.stringify(data)
}).then(resp => {
    return resp.json()})
}

//login
const createAccount = user => post(createAccountUrl, user)
const signIn = user => post(signinUrl, user)
const validate = () => get(validateUrl)

//initial data fetch
const getUserData = () => get(getUserDataUrl)
const getAccountabilityPartnerName = () => get(getAccountabilityPartnerNameUrl)
const provideMastermindUpdates = () => get(provideMastermindUpdatesUrl)

//goals 
const createNewGoal = goal => post(createNewGoalUrl, goal)
const deleteGoal = goal => post(deleteGoalUrl, goal)
const updateItemActionIsCompleted = itemId => patch(updateItemActionIsCompletedUrl, itemId)

//journaling
const createNewJournalEntry = journalEntry => post(createNewJournalEntryUrl, journalEntry)
const deleteJournalEntry = journal => post(deleteJournalEntryUrl, journal)

const updateDate = date => patch(updateDateUrl, date)

const lifeStatusUpdate = data => patch(lifeStatusUpdateUrl, data)




export default { signIn, createAccount, validate, getUserData,
    getAccountabilityPartnerName, createNewGoal, 
    deleteGoal, updateItemActionIsCompleted,
    createNewJournalEntry, updateDate, lifeStatusUpdate, 
    provideMastermindUpdates, deleteJournalEntry}

const updateJournalEntryToShow = (state = null, action) => {
    switch (action.type) {
        case 'UPDATE_JOURNAL_ENTRY_TO_SHOW':
            return action.payload
        default:
            return state
    }
}

export default updateJournalEntryToShow
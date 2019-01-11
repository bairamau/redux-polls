import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receivePolls } from '../actions/polls'
import { setAuthedUser } from '../actions/authedUser'

const AUTHED_ID = 'dan_abramov'

export function handleAddAnswer(args) {
  savePollAnswer(args)
  return (dispatch) => dispatch(addAnswer({args}))
}

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({users, polls}) => {
        dispatch(receiveUsers(users))
        dispatch(receivePolls(polls))
        dispatch(setAuthedUser(AUTHED_ID))
      })
  }
}
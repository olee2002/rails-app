import { merge } from '../utils'
import { GET_PEOPLE } from '../actions/Constants'

export function people(
  state = {},
  action
) {
  switch (action.type) {
    case GET_PEOPLE:
      return merge(state, action.people)
    default:
      return state
  }
}
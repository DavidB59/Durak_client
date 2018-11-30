import { BottomNavigationAction } from "material-ui";

// import {ADD_GAME, UPDATE_GAME, UPDATE_GAMES} from '../actions/games'
// import {USER_LOGOUT} from '../actions/users'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null,action ={}) => {
  switch (action.type) {
    case "TO_DEFEND":
      return action.payload
    default:
      return state
  }
}

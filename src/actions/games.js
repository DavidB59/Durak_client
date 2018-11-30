import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_GAME = 'ADD_GAME'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UPDATE_GAMES = 'UPDATE_GAMES'
export const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS'
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS'

const updateGames = games => ({
  type: UPDATE_GAMES,
  payload: games
})

const addGame = game => ({
  type: ADD_GAME,
  payload: game
})

const updateGameSuccess = () => ({
  type: UPDATE_GAME_SUCCESS
})

const joinGameSuccess = () => ({
  type: JOIN_GAME_SUCCESS
})

const toDefend = (cards) => ({
  type: "TO_DEFEND",
  paympad : cards
})





export const getGames = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateGames(result.body)))
    .catch(err => console.error(err))
}

export const joinGame = (gameId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games/${gameId}/players`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(_ => dispatch(joinGameSuccess()))
    .catch(err => console.error(err))
}

export const createGame = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/games`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addGame(result.body)))
    .catch(err => console.error(err))
}

export const updateGame = (gameId, board) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .patch(`${baseUrl}/games/${gameId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ board })
    .then(_ => dispatch(updateGameSuccess()))
    .catch(err => console.error(err))
}



export const attack = (gameId, cardCode) =>  (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  console.log('test21')
  console.log(cardCode)
  request
  .patch(`${baseUrl}/games/${gameId}/attack`)
  .set('Authorization', `Bearer ${jwt}`)
  .send({"cardCode": cardCode})
  .then(_ => dispatch(updateGameSuccess()))
  .then(cardsToDefend(gameId,jwt))
  .then(_ => console.log('RATAA'))
  .catch(err => console.error(err))

}



export const defend = (gameId, cardCode) =>  (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  console.log('DEFEND')
  console.log(cardCode)
  request
  .patch(`${baseUrl}/games/${gameId}/defend`)
  .set('Authorization', `Bearer ${jwt}`)
  .send({"cardCode": cardCode})
  .then(_ => dispatch(updateGameSuccess()))
  .then(takeCard(gameId,jwt))
  .catch(err => console.error(err))
}


export const cardsToDefend = (gameId,jwt) =>  (dispatch) => {
  // const state = getState()
  // const jwt = state.currentUser.jwt
  console.log('Cards to defend')
  request
  .get(`${baseUrl}/games/${gameId}/cards-to-defend`)
  .set('Authorization', `Bearer ${jwt}`)
  .then(response =>{ 
    console.log(response)
    console.log('we are almost there')
    dispatch (toDefend(response.body))})
  .then(_ => dispatch(updateGameSuccess()))
  .catch(err => console.error(err))

}




export const takeCard =  (gameId,jwt) =>  (dispatch) => {
  //  const state = getState()
  //  const jwt = state.currentUser.jwt
  console.log('taking Card')
  request
  .patch(`${baseUrl}/games/${gameId}/takeCards`)
  .set('Authorization', `Bearer ${jwt}`)
  // .then(response =>{ 
  //   dispatch ({
  //     type: "TO_DEFEND",
  // payload: response.body
  //   })
  // }  )
  .then(_ => dispatch(updateGameSuccess()))
  .catch(err => console.error(err))

}
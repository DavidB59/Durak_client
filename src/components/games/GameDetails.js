import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, attack, defend,cardsToDefend , takeCard} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import './GameDetails.css'


class GameDetails extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
     // console.log(this.props.game.deckOfCards)
    //  console.log('test')
    //  console.log(this.props.game)
      if (this.props.game === null) this.props.getGames()
      // console.log('test2')
      // console.log(this.props.game)
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    const {game, updateGame} = this.props

    const board = game.board.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )
    updateGame(game.id, board)
  }

  onClick = (cardCode) => {
  //ATTACKER TURN
    if (this.props.game.onTable.length<1){
      if (this.props.game.players[0].userId === this.props.userId) { // Check player 0 is current user
        if (this.props.game.players[0].id %2 === this.props.game.turn)
        { 
          this.props.attack(this.props.match.params.id, cardCode)
      
      }
        else { alert ('wait for your turn')}
      }
      // executed if player 1 is current User
      else if (this.props.game.players[1].id %2 === this.props.game.turn)
      { 
        this.props.attack(this.props.match.params.id, cardCode)      }
      else { alert ('wait for your turn')}
    }
    // DEFENDER TURN
    else if( this.props.game.onTable.length===1){
      if (this.props.game.players[0].userId === this.props.userId) {
        if (this.props.game.players[0].id %2 === this.props.game.turn)
        { 
          this.props.defend(this.props.match.params.id, cardCode)
                      }
        else { alert ('wait for your turn')}
      }
      else if (this.props.game.players[1].id %2 === this.props.game.turn)
      { 
        this.props.defend(this.props.match.params.id, cardCode)
      }
      else { alert ('wait for your turn')}
    }
    
}

  render() {
    const {game, users, authenticated, userId} = this.props
    // console.log(this.props)
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)
    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]
      // console.log("test3")
      // console.log(this.props)
    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <Board 
        takeCard = {this.props.takeCard}
        id ={this.props.match.params.id}
        onTable={game.onTable}
        currentUser={this.props.userId}
        onClick={this.onClick}
        deck={game.deckOfCards} player1={game.players[0]} player2={game.players[1]} />
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame,attack,defend ,cardsToDefend, takeCard
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

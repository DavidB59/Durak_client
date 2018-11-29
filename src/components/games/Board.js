import React from 'react'
import './Board.css'
import {backOfCard} from '../../constants'

const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <button
      className="board-tile"
      disabled={hasTurn}
      onClick={() => makeMove(rowIndex, cellIndex)}
      key={`${rowIndex}-${cellIndex}`}
    >{symbol || '-'}</button>
  )
}

// export default ({board, makeMove}) => board.map((cells, rowIndex) =>
//   <div key={rowIndex}>
//     {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
//   </div>
// )

export default function Board (props ){
  return (<div>
    {props.handPlayer1.hand.map( card => <img className="visibleCard"
src={card.image} alt={card.code}/> )}

    {//for (let i=0, i< props.handPlayer1.hand.length,i++) {
     props.handPlayer2.hand.map( card => 
      <img className="visibleCard"  src={backOfCard} alt="backOfCard"/> 
      )
    }

    {      <img className="trumpCard"  src={props.deck[0].image} alt={props.deck[0].code}/> 
}
  </div>)}


  // `eHIS IS A CARD ${card.code}` 
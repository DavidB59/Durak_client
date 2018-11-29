import React from 'react'
import './Board.css'
import {backOfCard, tapisCarte} from '../../constants'

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

 {      <img style={{"position" :"relative","height":" 800px"}}   src={tapisCarte} alt={props.deck[0].code}/> 
}
    {props.handPlayer1.hand.map( (card,vanyaRocks) =>
    <img   style={{"position" :"absolute", "top":"910px", "left":`${vanyaRocks*80+450}px`, "height":" 150px"}}
     src={card.image} alt={card.code}/> 
    )}
  
    {
     props.handPlayer2.hand.map((card, vanyaRocks) =>      
      <img  style={{"position" :"absolute", "top":"240px", "left":`${vanyaRocks*80+400}px`, "height":" 150px"}}

       src={backOfCard} alt="backOfCard"/> 

      )
    }
    {      <img style={{"position" :"absolute", "top":"570px", "left":`240px`, "height":" 150px"}}
     src={props.deck[0].image} alt={props.deck[0].code}/> 
}



  </div>)}

  
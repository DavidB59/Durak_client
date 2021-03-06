import React from 'react'
import './Board.css'
import { backOfCard, tapisCarte } from '../../constants'

// const renderCel = (makeMove, rowIndex, cellIndex, symbol, hasTurn) => {
//   return (
//     <button
//       className="board-tile"
//       disabled={hasTurn}
//       onClick={() => makeMove(rowIndex, cellIndex)}
//       key={`${rowIndex}-${cellIndex}`}
//     >{symbol || '-'}</button>
//   )
// }

// export default ({board, makeMove}) => board.map((cells, rowIndex) =>
//   <div key={rowIndex}>
//     {cells.map((symbol, cellIndex) => renderCel(makeMove, rowIndex, cellIndex,symbol,false))}
//   </div>
// )
export default function Board(props) {
  return (<div>
 
      { props.deck.length===0 &&
      props.player1.hand.length ===0 &&
      props.player1.userId === props.users[2].id &&
    <h1>${props.users[0].firstName} WON THE GAME</h1> }


    { props.deck.length===0 &&
      props.player2.hand.length ===0 &&
      props.player2.userId === props.users[2].id &&
      <h1>${props.users[0].firstName} WON THE GAME</h1> }

    { props.deck.length===0 &&
      props.player1.hand.length ===0 &&
      props.player1.userId === props.users[1].id &&
      <h1>{props.users[1].firstName} WON THE GAME</h1> }

    { props.deck.length===0 &&
      props.player2.hand.length ===0 &&
      props.player2.userId === props.users[1].id &&
      <h1>{props.users[1].firstName} WON THE GAME</h1> }   

    {<img style={{ "position": "relative", "height": " 800px" }} src={tapisCarte} alt="TapisCarte" />
    }
    {/* isEven(props.turn)===isEven(props.playerId) ? <p>This is your turn</p>
     : 
    <p>Wait for your turn</p> */ }

    {console.log('Current USer'+ props.currentUser)}
    {props.player1.userId === props.currentUser ? // if player 1 is current user; will display his cards, otherwise hidden cards
      props.player1.hand.map((card, vanyaRocks) =>
        <img key={card.code}
          onClick={() => props.onClick(card.code)}
          style={{ "position": "absolute", "top": "910px", "left": `${vanyaRocks * 80 + 450}px`, "height": " 150px" }}
          src={card.image} alt={card.code} />
      )
      :
      props.player1.hand.map((card, vanyaRocks) =>
        <img key={card.code} 
          style={{ "position": "absolute", "top": "240px", "left": `${vanyaRocks * 80 + 400}px`, "height": " 150px" }}
          src={backOfCard} alt="backOfCard" />
    )}

    {props.player2.userId === props.currentUser ? // if player 2 is current user; will display his cards,otherwise hidden cards
      props.player2.hand.map((card, vanyaRocks) =>
          <img key={card.code} 
          onClick={() => props.onClick(card.code)}
          style={{ "position": "absolute", "top": "910px", "left": `${vanyaRocks * 80 + 450}px`, "height": " 150px" }}
          src={card.image} alt={card.code} />
        
     
      ) :
      props.player2.hand.map((card, vanyaRocks) =>
        <img key={card.code} 
          style={{ "position": "absolute", "top": "240px", "left": `${vanyaRocks * 80 + 400}px`, "height": " 150px" }}
          src={backOfCard} alt="backOfCard" />
    )}

    {props.deck.length<1 ? console.log('deck empty') :
    <img
      style={{ "position": "absolute", "top": "570px", "left": `240px`, "height": " 150px" }}
      src={props.deck[0].image} alt={props.deck[0].code} />
    }
 { props.onTable.length<1 ? 
    console.log("No table")
  :
  props.onTable.map( (card, vanyaRocks) =>
  <img
    onClick={() => props.onClick(card.code)}
    style={{ "position": "absolute", "top": "570px", "left": `${vanyaRocks * 80 + 550}px`, "height": " 150px" }}
    src={card.image} alt={card.code} />
)}
{/* <img
  style={{ "position": "absolute", "top": "570px", "left": `550px`, "height": " 150px" }}
  src={props.onTable[0].image} alt={props.onTable[0].code} /> */}

 


  </div>)
}


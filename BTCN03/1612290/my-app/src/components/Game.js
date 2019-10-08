import React from 'react';
import GameBoard from '../containers/GameBoard'
import GamePlayAgain from '../containers/GamePlayAgain'
import GameMovesSorting from '../containers/GameMovesSorting'
import GameStatus from '../containers/GameStatus'
import GameMovesHistory from '../containers/GameMovesHistory'

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <GameBoard></GameBoard>
      </div>

      <div className="game-info">
        <GamePlayAgain></GamePlayAgain>
        <GameMovesSorting></GameMovesSorting>
        <p></p>
        <GameStatus></GameStatus>
        <GameMovesHistory></GameMovesHistory>
      </div>
    </div>       
  );
}


export default Game;
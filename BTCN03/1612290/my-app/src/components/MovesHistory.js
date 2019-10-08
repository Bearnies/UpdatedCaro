import React from 'react'

const MovesHistory = (stepNumber, history, sortAscend, onClick) => {
    const moves = history.map((step, move) => {
      const latestMoveRow = 1 + step.row;
      const latestMoveCol = 1 + step.col;
      const desc = move ?
        `Go to move #${move} (Row: ${latestMoveRow}, Column: ${latestMoveCol})` :
        'Go to game start'; 
      return (
        <li key={move}>
          <button className={move === stepNumber ? 'bold-selected-move' : ''} onClick={() => onClick(move)}>{desc}</button>
        </li>
      );
    });

    if (!sortAscend)
    {
      moves.reverse();
    }
    return (
    <ol>{moves}</ol>
    );
};

export default MovesHistory;
import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderBoard(row) {
    const board = [];
    const {winSquares, squares, onClick} = this.props;
      for (let col = 0; col < 20; col += 1) 
      {           
        board.push(
          <Square 
            key={(row, col)}
            className={winSquares[row][col]}   
            value={squares[row][col]}    
            onClick={() => onClick(row, col)}
          />
        )  
      }
      return (
        <div className='board-row'>
          {board}
        </div>
      );
  }

  render() {
      const rows = [];
      for (let r = 0; r < 20; r += 1) {
          rows.push(
            this.renderBoard(r)
          );
        }
      return(
        <div>
          <p>Cờ Caro VN</p>
          <div>{rows}</div>
        </div>
      ); 
  }
    
}

export default Board;
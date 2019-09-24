import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderBoard(row) {
    const squares = [];
      for (let col = 0; col < 20; col++) 
      {      
        squares.push(
          <Square value = {this.props.squares[row][col]} onClick={() => this.props.onClick(row, col)}></Square>
        )  
      }
      return (
        <div className="board-row">
          {squares}
        </div>
      );
  }

  render() {
      const rows = [];
      for (let r = 0; r < 20; r++) {
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
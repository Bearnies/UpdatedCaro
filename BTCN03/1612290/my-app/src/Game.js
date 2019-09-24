import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      history: [{row : null, col : null}],
      stepNumber: 0,
      xIsNext: true,
      winner:null,
      sortAscend: true,
      winSquares: [],
    }
  }

  handleClick(row, col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const caroboard = Array(20).fill(null).map(row => new Array(20).fill(null));
    const currentStep = this.state.stepNumber;
    const squares = caroboard;
    
    //Go to move.
    for (var i = 1; i < history.length; i++)
    {
      const current = history[i];
      if (i % 2 === 1)
      {
        squares[current.row][current.col] = 'X';
      }
      else
      {
        squares[current.row][current.col] = 'O';
      }
    }

    //Sau khi Win mà sử dụng "Go to move" thì check xem stepNumber của move đó có = history.length không. Nếu không
    //thì chứng tỏ đã sử dụng "Go to move" và cho phép người chơi tiếp tục chơi từ move.
    var tempWinner = this.state.winner;
    if (currentStep !== (this.state.history.length - 1))
    {
      tempWinner = null;
      this.setState(
        {
          winner: null,
          winSquares: [],
        }
      );
    }

    const winner = tempWinner;
    if (winner || squares[row][col]) {
      return;
    }
    squares[row][col] = this.state.xIsNext ? 'X' : 'O';
    this.calculateWinner(row, col, squares);

    this.setState({
      history: history.concat([
        {
          squares: squares[row][col],
          row: row,
          col: col,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  calculateWinner(row, col, squares) {
    if (this.calculateWinnerHorizontal(row, col, squares)) {
      this.setState({winner:squares[row][col]})
    } else if (this.calculateWinnerVertical(row, col, squares)) {
      this.setState({winner:squares[row][col]})
    } else if (this.calculateWinnerLCross(row, col, squares)) {
      this.setState({winner:squares[row][col]})
    } else if (this.calculateWinnerRCross(row, col, squares)) {
      this.setState({winner:squares[row][col]})
    }
    return false;
  }

  calculateWinnerVertical(row, col, squares) {
    var latestClick = squares[row][col];
    var start = null;
    var end = null;
    var startCol = col;
    var endCol = col;

    while(startCol < 19 && squares[row][startCol] === latestClick)  {
      startCol++;
    }

    if (squares[row][startCol] === null) {
      start = true;
    } else {
      start = false;
    }
    
    while(endCol > 0 && squares[row][endCol] === latestClick)  {
      endCol--;
    }

    if (squares[row][endCol] === null) {
      end = true;
    } else {
      end = false;
    }

    if (end || start) {
      if ((startCol - endCol) >= 6) {
        return true;
      } else if (((endCol === 0 && squares[row][endCol] === latestClick) || (startCol === 19 && squares[row][startCol] === latestClick)) && (startCol - endCol) >= 5) {
        return true;
      }
    }
    return false;
  }

  calculateWinnerHorizontal(row, col, squares) {
    var latestClick = squares[row][col];
    var start = null;
    var end = null;
    var startRow = row;
    var endRow = row;

    while(startRow < 19 && squares[startRow][col] === latestClick)  {
      startRow++;
    }

    if (squares[startRow][col] === null) {
      start = true;
    } else {
      start = false;
    }
    
    while(endRow > 0 && squares[endRow][col] === latestClick)  {
      endRow--;
    }

    if (squares[endRow][col] === null) {
      end = true;
    } else {
      end = false;
    }

    if (end || start) {
      if ((startRow - endRow) >= 6) {
        return true;
      } else if (((endRow === 0 && squares[endRow][col] === latestClick) || (startRow === 19 && squares[startRow][col] === latestClick)) && (startRow - endRow) >= 5) {
        return true;
      }
    }
    return false;
  }

  calculateWinnerLCross(row, col, squares) {
    var latestClick = squares[row][col];
    var start = null;
    var end = null;
    var rowrightDown = row;
    var rowleftUp = row;
    var colleftUp = col;
    var colrightDown = col;

    while(rowrightDown < 19 && colrightDown > 0 && squares[rowrightDown][colrightDown] === latestClick)  {
      rowrightDown++;
      colrightDown++;
    }

    if (squares[rowrightDown][colrightDown] === null) {
      start = true;
    } else {
      start = false;
    }
    
    while(rowleftUp > 0 && colleftUp < 19 && squares[rowleftUp][colleftUp] === latestClick)  {
      colleftUp--;
      rowleftUp--;
    }

    if (squares[rowleftUp][colleftUp] === null) {
      end = true;
    } else {
      end = false;
    }

    if (end || start) {
      if ((rowrightDown - rowleftUp) >= 6) {
        return true
      } else if (((rowrightDown === 19 && squares[rowrightDown][colrightDown] === latestClick) || (colrightDown === 19 && squares[rowleftUp][colleftUp] === latestClick)) && (rowrightDown - rowleftUp) >= 5) {
        return true
      }
    }
    return false;
  }

  calculateWinnerRCross(row, col, squares) {
    var latestClick = squares[row][col];
    var start = null;
    var end = null;
    var rowleftDown = row;
    var rowrightUp = row;
    var colleftDown = col;
    var colrightUp = col;

    while(rowleftDown < 19 && colleftDown > 0 && squares[rowleftDown][colleftDown] === latestClick)  {
      rowleftDown++;
      colleftDown--;
    }

    if (squares[rowleftDown][colleftDown] === null) {
      start = true;
    } else {
      start = false;
    }
    
    while(rowrightUp > 0 && colrightUp < 19 && squares[rowrightUp][colrightUp] === latestClick)  {
      colrightUp++;
      rowrightUp--;
    }

    if (squares[rowrightUp][colrightUp] === null) {
      end = true;
    } else {
      end = false;
    }

    if (end || start) {
      if ((rowleftDown - rowrightUp) >= 6) {  
        return true
      } else if (((rowleftDown === 19 && squares[rowleftDown][colleftDown] === latestClick) || (colrightUp === 19 && squares[rowrightUp][colrightUp] === latestClick)) && (rowleftDown - rowrightUp) >= 5) {
        return true
      }
    }
    return false;
  }

  playAgain(){
    const newSquares = Array(20).fill(null).map(row => new Array(20).fill(null));
    this.setState({
      caroboard: newSquares,
      xIsNext: true,
      winner: null,
      history: [{row: null, col: null}],
      stepNumber: null,
      winSquares: []
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleSort()
  {
    this.setState({
      sortAscend: !this.state.sortAscend
    });
  }


  render() {
    const winner = this.state.winner;
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const caroboard = Array(20).fill(null).map(row => new Array(20).fill(null));

    for (var i = 1; i < history.length; i++)
    {
      const current = history[i];
      if (i % 2 === 1)
      {
        caroboard[current.row][current.col] = 'X';
      }
      else
      {
        caroboard[current.row][current.col] = 'O';
      }
    }

    const moves = this.state.history.map((step, move) => {
      const latestMoveRow = 1 + step.row;
      const latestMoveCol = 1 + step.col;
      const desc = move ?
        `Go to move #${move} (Row: ${latestMoveRow}, Column: ${latestMoveCol})` :
        'Go to game start';
      return (
        <li key={move}>
          <button className={move === stepNumber ? 'bold-selected-move' : ''} onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const sortAscend = this.state.sortAscend;
    if (!sortAscend)
    {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
        <div>
          <div className="game">
            <div className="game-board">
              <Board squares={caroboard} onClick={(row, col) => this.handleClick(row, col)}></Board>
            </div>
            <div className="game-info">
              <button class="classExtraBtn" onClick={() => this.playAgain()}>Play Again</button>
              <button class="classExtraBtn" onClick={() => this.handleSort()}>Sort{sortAscend ? ' (Descend)' : ' (Ascend)'}</button>
              <p></p>
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>       
        </div>
    );
  }
}

export default Game;
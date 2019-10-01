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
    const {history, stepNumber, winner, xIsNext} = this.state;
    const currhistory = history.slice(0, stepNumber + 1);
    const caroboard = Array(20)
    .fill(null)
    .map(() => new Array(20).fill(null));

    const squares = caroboard;
    
    //Go to move.
    for (let i = 1; i < currhistory.length; i += 1)
    {
      const current = currhistory[i];
      if (i % 2 === 1)
      {
        caroboard[current.row][current.col] = 'X';
      }
      else
      {
        caroboard[current.row][current.col] = 'O';
      }
    }

    //Sau khi Win mà sử dụng "Go to move" thì check xem stepNumber của move đó có = history.length không. Nếu không
    //thì chứng tỏ đã sử dụng "Go to move" và cho phép người chơi tiếp tục chơi từ move.
    let tempWinner = winner;
    if (stepNumber !== (this.state.history.length - 1))
    {
      tempWinner = null;
      this.setState(
        {
          winner: null,
          winSquares: [],
        }
      );
    }

    const currwinner = tempWinner;
    if (currwinner || squares[row][col]) {
      return;
    }
    squares[row][col] = xIsNext ? 'X' : 'O';
    this.calculateWinner(row, col, squares);

    this.setState({
      history: currhistory.concat([
        {
          squares: squares[row][col],
          row: row,
          col: col,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !xIsNext,
    });
  }

  // calculateWinner(row, col, squares) {
  //   if (this.calculateWinnerHorizontal(row, col, squares)) {
  //     this.setState({winner:squares[row][col]})
  //   } else if (this.calculateWinnerVertical(row, col, squares)) {
  //     this.setState({winner:squares[row][col]})
  //   } else if (this.calculateWinnerLCross(row, col, squares)) {
  //     this.setState({winner:squares[row][col]})
  //   } else if (this.calculateWinnerRCross(row, col, squares)) {
  //     this.setState({winner:squares[row][col]})
  //   }
  //   return false;
  // }

  calculateWinner(row, col, squares) {
    const winSquares=this.state.winSquares;
    const winHorizontal=this.calculateWinnerHorizontal(row,col,squares);
    const winVertical=this.calculateWinnerVertical(row,col,squares);
    const winLCross=this.calculateWinnerLCross(row,col,squares);
    const winRCross=this.calculateWinnerRCross(row,col,squares);
    
    if (winVertical.result) {
      const result = winVertical.winLine;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(result),
      })
    }
    
    else if (winHorizontal.result) {
      const result = winHorizontal.winLine;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(result),
      })
    }

    else if (winLCross.result) {
      const result = winLCross.winLine;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(result),
      })
    } 

    else if (winRCross.result) {
      const result = winRCross.winLine;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(result),
      })
    }
    return false;
  }

  calculateWinnerHorizontal(row, col, squares) {
    let latestClick = squares[row][col];
    let start = null;
    let end = null;
    let startRow = row;
    let endRow = row;

    while(endRow > 0 && squares[endRow][col] === latestClick)  {
      endRow -= 1;
    }

    if (squares[endRow][col] === null) {
      end = true;
    } else {
      end = false;
    }

    while(startRow < 19 && squares[startRow][col] === latestClick)  {
      startRow += 1;
    }

    if (squares[startRow][col] === null) {
      start = true;
    } else {
      start = false;
    }

    let winHorizontal = [];
    if (end || start) {
      if ((startRow - endRow) >= 6) {
          for (let i = endRow + 1; i < startRow; i += 1) {
            winHorizontal.push({row: i, col: col});
          }
          return {
            result: true,
            winLine: winHorizontal,
          };
      } else if (
       ((endRow === 0 && squares[endRow][col] === latestClick) ||
       (startRow === 19 && squares[startRow][col] === latestClick)) &&
       (startRow - endRow) >= 5
      ) {
        let endr=endRow;
        let startr=startRow;
        if (!end) {
          endr -= 1;
        } else {
          startr += 1;
        }
        for (let i = endr + 1; i < startr; i += 1) {
          winHorizontal.push({row: i, col: col});
        }
        return {
          result: true,
          winLine: winHorizontal,
        };
      }
    }
    return false;
  }

  calculateWinnerVertical(row, col, squares) {
    let latestClick = squares[row][col];
    let start = null;
    let end = null;
    let startCol = col;
    let endCol = col;
    
    while(endCol > 0 && squares[row][endCol] === latestClick)  {
      endCol -= 1;
    }

    if (squares[row][endCol] === null) {
      end = true;
    } else {
      end = false;
    }

    while(startCol < 19 && squares[row][startCol] === latestClick)  {
      startCol += 1;
    }

    if (squares[row][startCol] === null) {
      start = true;
    } else {
      start = false;
    }

    let winVertical = [];
    if (end || start) {
      if ((startCol - endCol) >= 6) {
        for (let i = endCol + 1; i < startCol; i += 1) {
          winVertical.push({row: row, col: i});
        }
        return {
          result: true,
          winLine: winVertical,
        };
      }

      else if (
      ((endCol === 0 && squares[row][endCol] === latestClick) ||
      (startCol === 19 && squares[row][startCol] === latestClick)) &&
      (startCol - endCol) >= 5
      ) {
        let endc = endCol;
        let startc = startCol;
        if (!end) {
          endc -= 1;
        } else {
          startc += 1;
        }
        for (let i = endc+1; i < startc; i += 1) {
          winVertical.push({row: row, col: i});
        }
        return {
          result: true,
          winLine: winVertical,
        };
      }
    }
    return false;
  }

  calculateWinnerLCross(row, col, squares) {
    let latestClick = squares[row][col];
    let start = null;
    let end = null;
    let rowrightDown = row;
    let rowleftUp = row;
    let colleftUp = col;
    let colrightDown = col;
    
    while(rowleftUp > 0 && colleftUp > 0 && squares[rowleftUp][colleftUp] === latestClick)  {
      rowleftUp -= 1;
      colleftUp -= 1;
    }

    if (squares[rowleftUp][colleftUp] === null) {
      end = true;
    } else {
      end = false;
    }

    while(rowrightDown < 19 && colrightDown < 19 && squares[rowrightDown][colrightDown] === latestClick)  {
      rowrightDown += 1;
      colrightDown += 1;
    }

    if (squares[rowrightDown][colrightDown] === null) {
      start = true;
    } else {
      start = false;
    }

    let winLCross = [];
    let temprow = rowleftUp;
    let tempcol = colleftUp;
    if (end || start) {
      if ((rowrightDown - rowleftUp) >= 6) {
        while (temprow !== rowrightDown - 1) {
          temprow += 1;
          tempcol += 1;
          winLCross.push({row: temprow, col: tempcol});
        }
        return {
          result: true,
          winLine: winLCross,
        };
      } else if (
       (colrightDown === 19 || colleftUp === 0 || rowrightDown === 19 || rowleftUp === 0) &&
       (rowrightDown - rowleftUp) >= 5 &&
       (squares[rowrightDown][colrightDown] === latestClick ||
       squares[rowleftUp][colleftUp] === latestClick)
      ) {
        let checkLCross = rowrightDown;
        if (!end) {
          temprow -= 1;
          tempcol -= 1;
        } else {
          checkLCross += 1;
        }
        while (temprow < checkLCross - 1) {
          temprow += 1;
          tempcol += 1;
          winLCross.push({row: temprow, col: tempcol});
        }
        return {
          result: true,
          winLine: winLCross,
        };
      }
    }
    return false;
  }

  calculateWinnerRCross(row, col, squares) {
    let latestClick = squares[row][col];
    let start = null;
    let end = null;
    let rowleftDown = row;
    let rowrightUp = row;
    let colleftDown = col;
    let colrightUp = col;

    while(rowrightUp < 19 && colrightUp > 0 && squares[rowrightUp][colrightUp] === latestClick)  {
      rowrightUp += 1;
      colrightUp -= 1;
    }

    if (squares[rowrightUp][colrightUp] === null) {
      end = true;
    } else {
      end = false;
    }

    while(rowleftDown > 0 && colleftDown < 19 && squares[rowleftDown][colleftDown] === latestClick)  {
      colleftDown += 1;
      rowleftDown -= 1;
    }

    if (squares[rowleftDown][colleftDown] === null) {
      start = true;
    } else {
      start = false;
    }

    let winRCross = [];
    let temprow = rowleftDown;
    let tempcol = colleftDown;
    if (end || start) {
      if ((colleftDown - colrightUp) >= 6) {  
        while (temprow !== rowrightUp - 1) {
          temprow += 1;
          tempcol -= 1;
          winRCross.push({row: temprow, col: tempcol});
        }
        return {
          result: true,
          winLine: winRCross,
        };
      } else if (
        (colleftDown === 19 || colrightUp === 0|| rowleftDown === 0 || rowrightUp === 19) &&
        (colleftDown - colrightUp) >= 5 &&
        (squares[rowleftDown][colleftDown] === latestClick || squares[rowrightUp][colrightUp] === latestClick)
        ) {
        let checkRCross = rowrightUp;
        if (end) {
          temprow -= 1;
          tempcol += 1;
        } else {
          checkRCross += 1;
        }
        while (temprow < checkRCross - 1) {
          temprow += 1;
          tempcol -= 1;
          winRCross.push({row: temprow, col: tempcol});
        }
        return {
          result: true,
          winLine: winRCross,
        };
      }
    }
    return false;
  }

  playAgain(){
    const newSquares = Array(20)
    .fill(null)
    .map(row => new Array(20).fill(null));

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
    const {sortAscend} = this.state;
    this.setState({
      sortAscend: !sortAscend
    });
  }


  render() {
    const {stepNumber, history, winSquares, winner, xIsNext, sortAscend} = this.state;
    const currhistory = history.slice(0, stepNumber + 1);
    const caroboard = Array(20)
    .fill(null)
    .map(() => new Array(20).fill(null));

    for (let i = 1; i < currhistory.length; i += 1)
    {
      const current = currhistory[i];
      if (i % 2 === 1)
      {
        caroboard[current.row][current.col] = 'X';
      }
      else
      {
        caroboard[current.row][current.col] = 'O';
      }
    }

    const result = Array(20)
    .fill(null)
    .map(() => new Array(20).fill("square"));

    for (let i = 0; i < winSquares.length; i += 1) {
      const temp = winSquares[i];
      result[temp.row][temp.col] = 'square highlight';
    }

    const moves = history.map((step, move) => {
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

    if (!sortAscend)
    {
      moves.reverse();
    }

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>
          <div className="game">
            <div className="game-board">
              <Board squares={caroboard} onClick={(row, col) => this.handleClick(row, col)} winSquares={result}></Board>
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
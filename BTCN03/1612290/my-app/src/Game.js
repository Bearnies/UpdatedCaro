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
    const caroboard = Array(20).fill(null).map(() => new Array(20).fill(null));
    const currentStep = this.state.stepNumber;
    const squares = caroboard;
    
    //Go to move.
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
    const winVertical=this.calculateWinnerVertical(row,col,squares);
    const winHorizontal=this.calculateWinnerHorizontal(row,col,squares);
    const winLCross=this.calculateWinnerLCross(row,col,squares);
    const winRCross=this.calculateWinnerRCross(row,col,squares);
    
    if (winVertical.result) {
      const winResult=winVertical.win;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(winResult),
      })
    }
    
    else if (winHorizontal.result) {
      const winResult=winHorizontal.win;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(winResult),
      })
    }

    else if (winLCross.result) {
      const winResult=winLCross.win;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(winResult),
      })
    } 

    else if (winRCross.result) {
      const winResult=winRCross.win;
      this.setState({
        winner:squares[row][col],
        winSquares:winSquares.concat(winResult),
      })
    }
    return false;
  }

  calculateWinnerVertical(row, col, squares) {
    var latestClick = squares[row][col];
    var start = null;
    var end = null;
    var startCol = col;
    var endCol = col;
    
    while(endCol > 0 && squares[row][endCol] === latestClick)  {
      endCol--;
    }

    if (squares[row][endCol] === null) {
      end = true;
    } else {
      end = false;
    }

    while(startCol < 19 && squares[row][startCol] === latestClick)  {
      startCol++;
    }

    if (squares[row][startCol] === null) {
      start = true;
    } else {
      start = false;
    }

    var winVertical = [];
    if (end || start) {
      if ((startCol - endCol) >= 6) {
        for (let i = endCol+1; i < startCol; i++) {
          winVertical.push({row: row, col: i});
        }
        return {
          result:true,
          win:winVertical,
        };
      }

      else if (((endCol === 0 && squares[row][endCol] === latestClick) || (startCol === 19 && squares[row][startCol] === latestClick)) && (startCol - endCol) >= 5) {
        var endc=endCol;
        var startc=startCol;
        if (!end) {
          endc-=1;
        } else {
          startc+=1;
        }
        for (let i = endc+1; i < startc; i++) {
          winVertical.push({row: row, col: i});
        }
        return {
          result:true,
          win:winVertical,
        };
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

    while(endRow > 0 && squares[endRow][col] === latestClick)  {
      endRow--;
    }

    if (squares[endRow][col] === null) {
      end = true;
    } else {
      end = false;
    }

    while(startRow < 19 && squares[startRow][col] === latestClick)  {
      startRow++;
    }

    if (squares[startRow][col] === null) {
      start = true;
    } else {
      start = false;
    }

    var winHorizontal = [];
    if (end || start) {
      if ((startRow - endRow) >= 6) {
          for (let i = endRow+1; i < startRow; i++) {
            winHorizontal.push({row: i, col: col});
          }
          return {
            result:true,
            win:winHorizontal,
          };
      } else if (((endRow === 0 && squares[endRow][col] === latestClick) || (startRow === 19 && squares[startRow][col] === latestClick)) && (startRow - endRow) >= 5) {
        var endr=endRow;
        var startr=startRow;
        if (!end) {
          endr-=1;
        } else {
          startr+=1;
        }
        for (let i = endr+1; i < startr; i++) {
          winHorizontal.push({row: i, col: col});
        }
        return {
          result:true,
          win:winHorizontal,
        };
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
    
    while(rowleftUp > 0 && colleftUp > 0 && squares[rowleftUp][colleftUp] === latestClick)  {
      rowleftUp--;
      colleftUp--;
    }

    if (squares[rowleftUp][colleftUp] === null) {
      end = true;
    } else {
      end = false;
    }

    while(rowrightDown < 19 && colrightDown < 19 && squares[rowrightDown][colrightDown] === latestClick)  {
      rowrightDown++;
      colrightDown++;
    }

    if (squares[rowrightDown][colrightDown] === null) {
      start = true;
    } else {
      start = false;
    }

    var winLCross = [];
    var tempa = colleftUp;
    var tempb = rowleftUp;
    if (end || start) {
      if ((rowrightDown - rowleftUp) >= 6) {
        while (tempb!==rowrightDown) {
          tempb+=1;
          tempa+=1;
          winLCross.push({row:tempb, col:tempa});
        }
        return {
          result:true,
          win:winLCross,
        };
      } else if ((colrightDown === 19 || colleftUp === 0 || rowrightDown === 19 || rowleftUp === 0) && (rowrightDown - rowleftUp) >= 5 && (squares[rowrightDown][colrightDown] === latestClick || squares[rowleftUp][colleftUp] === latestClick)) {
        var tempbrd=rowrightDown;
        if (!end) {
          tempb-=1;
          tempa-=1;
        } else {
          tempbrd+=1;
        }
        while (tempb<tempbrd-1) {
          tempb+=1;
          tempa+=1;
          winLCross.push({row:tempb, col:tempa});
        }
        return {
          result:true,
          win:winLCross,
        };
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

    while(rowrightUp < 19 && colrightUp > 0 && squares[rowrightUp][colrightUp] === latestClick)  {
      rowrightUp++;
      colrightUp--;
    }

    if (squares[rowrightUp][colrightUp] === null) {
      end = true;
    } else {
      end = false;
    }

    while(rowleftDown > 0 && colleftDown < 19 && squares[rowleftDown][colleftDown] === latestClick)  {
      colleftDown++;
      rowleftDown--;
    }

    if (squares[rowleftDown][colleftDown] === null) {
      start = true;
    } else {
      start = false;
    }

    var winRCross=[];
    var tempa=colleftDown;
    var tempb=rowleftDown;
    if (end || start) {
      if ((colleftDown - colrightUp) >= 6) {  
        while (tempb!==rowrightUp) {
          tempb+=1;
          tempa-=1;
          winRCross.push({row: tempb, col: tempa});
        }
        return {
          result:true,
          win:winRCross,
        };
      } else if ((colleftDown === 19 || colrightUp === 0|| rowleftDown === 0 || rowrightUp === 19) && (colleftDown - colrightUp) >= 5 && (squares[rowleftDown][colleftDown] === latestClick || squares[rowrightUp][colrightUp] === latestClick)) {
        var tempbru=rowrightUp;
        if (end) {
          tempb-=1;
          tempa+=1;
        } else {
          tempbru+=1;
        }
        while (tempb<tempbru-1) {
          tempb+=1;
          tempa-=1;
          winRCross.push({row: tempb, col: tempa});
        }
        return {
          result:true,
          win:winRCross,
        };
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
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const caroboard = Array(20).fill(null).map(() => new Array(20).fill(null));

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

    const winSquares = this.state.winSquares;
    const winResult = Array(20).fill(null).map(() => new Array(20).fill("square"));
    for (let i = 0; i < winSquares.length; i++) {
      const temp = winSquares[i];
      winResult[temp.row][temp.col] = 'square highlight';
    }
    const winner = this.state.winner;

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
              <Board squares={caroboard} onClick={(row, col) => this.handleClick(row, col)} winSquares={winResult}></Board>
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
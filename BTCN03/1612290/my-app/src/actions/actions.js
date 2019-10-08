export const X_ISNEXT = 'X_ISNEXT'
export const NEW_X_ISNEXT = 'NEW_X_ISNEXT'
export const GET_WINSQUARES = 'GET_WINSQUARES'
export const PLAY_AGAIN = 'PLAY_AGAIN'
export const SORT_ASCEND = 'SORT_ASCEND'
export const NEW_WINNER = 'NEW_WINNER'
export const NEW_HISTORY = 'NEW_HISTORY'
export const NEW_STEPNUMBER = 'NEW_STEPNUMBER'

export function xIsNext() {
    return {
        type: 'X_ISNEXT',
    };
}

export function newxIsNext(isXNext) {
    return {
        type: 'NEW_X_ISNEXT',
        isXNext
    }
}

export function newwinSquares(winSquares) {
    return {
        type: 'GET_WINSQUARES',
        winSquares
    };
}

export function newWinner(winner) {
    return {
        type: 'NEW_WINNER',
        winner
    };
}

export function playAgain() {
    return {
        type: 'PLAY_AGAIN'
    };
}

export function sortAscend() {
    return {
        type: 'SORT_ASCEND'
    };
}

export function newHistory(newhistory) {
    return {
        type: 'NEW_HISTORY',
        newhistory
    };
}

export function newStepNumber(newstepnumber) {
    return {
        type: 'NEW_STEPNUMBER',
        newstepnumber
    };
}

function calculateWinnerHorizontal(row, col, squares) {
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

function calculateWinnerVertical(row, col, squares) {
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

function calculateWinnerLCross(row, col, squares) {
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

function calculateWinnerRCross(row, col, squares) {
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

export function handleClick(row, col) {
    return (dispatch, getState) => {
        //Set Initial State
        const initialState = getState();
        const {history, stepNumber, xIsNext, winner, winSquares} = initialState;
        const currhistory = history.slice(0, stepNumber + 1);
        const caroboard = Array(20)
        .fill(null)
        .map(() => new Array(20).fill(null));

        //Set temporary winner for go to move
        let tempWinner = winner
        if (stepNumber !== (history.length - 1)) {
            tempWinner = null;
            dispatch(newWinner(null));
            dispatch(winSquares([]));
        }

        const currwinner = tempWinner;
        const squares = caroboard;

        //Go to move
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

        //Next player if winner === null
        if (currwinner || squares[row][col]) {
            return;
        }
        squares[row][col] = xIsNext ? 'X' : 'O';

        //Calculate Winner
        const winHorizontal = calculateWinnerHorizontal(row,col,squares);
        const winVertical = calculateWinnerVertical(row,col,squares);
        const winLCross = calculateWinnerLCross(row,col,squares);
        const winRCross = calculateWinnerRCross(row,col,squares);
        
        if (winVertical.result) {
          const result = winVertical.winLine;
          dispatch(newWinner(squares[row][col]));
          dispatch(newwinSquares(winSquares.concat(result)));
        }
        
        else if (winHorizontal.result) {
          const result = winHorizontal.winLine;
          dispatch(newWinner(squares[row][col]));
          dispatch(newwinSquares(winSquares.concat(result)));
        }
    
        else if (winLCross.result) {
          const result = winLCross.winLine;
          dispatch(newWinner(squares[row][col]));
          dispatch(newwinSquares(winSquares.concat(result)));
        } 
    
        else if (winRCross.result) {
          const result = winRCross.winLine;
          dispatch(newWinner(squares[row][col]));
          dispatch(newwinSquares(winSquares.concat(result)));
        }

        dispatch(newHistory(currhistory.concat(squares[row][col], row, col)));
        dispatch(newStepNumber(currhistory.length));
        dispatch(xIsNext());
    }
}
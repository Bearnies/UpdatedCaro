import {
    LATEST_CLICK,
    X_ISNEXT,
    PLAY_AGAIN,
    GO_TO_MOVE,
    SORT_ASCEND,
    CAL_WINNER
} from '../actions/actions'

const initialState = {
    caroboard: Array(20)
    .fill(null)
    .map(() => new Array(20).fill(null)), 
    history: [{row : null, col : null}],
    stepNumber: 0,
    xIsNext: true,
    winner: null,
    sortAscend: true,
    winSquares: [],
};

export default function tictactoeGame(state = initialState, action) {
    const {history, stepNumber, winner, xIsNext} = this.state;
    const currhistory = history.slice(0, stepNumber + 1);
    const caroboard = Array(20)
    .fill(null)
    .map(() => new Array(20).fill(null));
    const squares = caroboard;

    switch (action.type){
        case LATEST_CLICK:
            let tempWinner = winner;
            const { history } = this.state;
            if (stepNumber !== (history.length - 1))
            {
                tempWinner = null;
                return {
                    winner: null,
                    winSquares: []
                };
            }
            const currwinner = tempWinner;
            if (currwinner || squares[row][col]) {
                return;
            }
            squares[row][col] = xIsNext ? 'X' : 'O';

            return {
                ...state,
                xIsNext: action.xIsNext,
                winner: currwinner,
            };

        case X_ISNEXT:
            return {
                ...state,
                xIsNext: action.xIsNext
            };

        case GO_TO_MOVE:
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
            return {
                ...state,
                history: currhistory.concat([
                    {
                      squares: squares[row][col],
                      row: row,
                      col: col,
                    }
                  ]),
                stepNumber: history.length,
                xIsNext: !xIsNext
            };

        case PLAY_AGAIN:
            return {
                ...initialState
            };

        case SORT_ASCEND:
            return {
                ...state,
                sortAscend: action.sortAscend
            };

        case CAL_WINNER:
            return{
                ...state,
                winner: action.winner
            };

        default:
            return state;
    }
}
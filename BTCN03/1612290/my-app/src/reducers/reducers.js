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

export default function tictactoeGame(state = initialState, action){
    switch (action.type){
        case LATEST_CLICK:
            caroboard[row][col] = xIsNext ? 'X' : 'O';
            return {
                ...state,
        };

        case X_ISNEXT:
            return {
                ...state,
                xIsNext: action.xIsNext
        };

        case GO_TO_MOVE:
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0
        };

        case PLAY_AGAIN:
            return {
                ...state,
                caroboard: Array(20)
                .fill(null)
                .map(() => new Array(20).fill(null)),
                xIsNext: true,
                winner: null,
                history: [{row: null, col: null}],
                stepNumber: null,
                winSquares: []
        };

        case SORT_ASCEND:
            return {
                ...state,
                sortAscend: !sortAscend
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
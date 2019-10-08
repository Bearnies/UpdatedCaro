import {
    X_ISNEXT,
    NEW_X_ISNEXT,
    PLAY_AGAIN,
    SORT_ASCEND,
    GET_WINSQUARES,
    NEW_WINNER,
    NEW_HISTORY,
    NEW_STEPNUMBER,
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
    switch (action.type) {
        case X_ISNEXT:
            return !state

        case NEW_X_ISNEXT:
            return {
                ...state,
                xIsNext: action.isXNext
            }

        case PLAY_AGAIN:
            return {
                ...state
            }

        case SORT_ASCEND:
            return !state

        case GET_WINSQUARES:
            return {
                ...state,
                winSquares: action.winSquares
            }

        case NEW_WINNER:
            return {
                ...state,
                winner: action.winner
            }

        case NEW_HISTORY:
            return {
                ...state,
                history: action.newhistory
            }
        
        case NEW_STEPNUMBER:
            return {
                ...state,
                stepNumber: action.newstepnumber
            }

        default:
            return state
    }
}
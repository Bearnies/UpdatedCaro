export const LATEST_CLICK = 'LATEST_CLICK'
export const X_ISNEXT = 'X_ISNEXT'
export const PLAY_AGAIN = 'PLAY_AGAIN';
export const SORT_ASCEND = 'SORT_ASCEND';
export const CAL_WINNER = 'CAL_WINNER'
export const GO_TO_MOVE = 'GO_TO_MOVE'

export function latestClick(row, col) {
    return {
        type: 'LATEST_CLICK',
        payload: {
            row,
            col
        }
    };
}

export function xIsNext() {
    return {
        type: 'X_ISNEXT',
    };
}

export function calculateWinner() {
    return {
        type: 'CAL_WINNER',
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

export function goToMove() {
    return {
        type: 'GO_TO_MOVE',
    };
}
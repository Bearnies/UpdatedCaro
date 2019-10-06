export const LATEST_CLICK = 'LATEST_CLICK'
export const PLAY_AGAIN = 'PLAY_AGAIN';
export const SORT_ASCEND = 'SORT_ASCEND';
export const CAL_WINNER = 'CAL_WINNER'

export function latestClick(row, col, player) {
    return {
        type: types.LATEST_CLICK,
        row,
        col,
        player
    };
}

export function calculateWinner(row, col, winner) {
    return {
        type: types.CAL_WINNER,
        row,
        col,
        winner
    };
}

export function playAgain() {
    return {
        type: types.PLAY_AGAIN
    };
}

export function sortAscend() {
    return {
        type: types.SORT_ASCEND
    };
}
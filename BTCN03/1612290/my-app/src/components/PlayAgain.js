import React from 'react'

const PlayAgain = ({onClick}) => {
    return (
        <button class="classExtraBtn" onClick={() => onClick()}>Play Again</button>
    );
};

export default PlayAgain;
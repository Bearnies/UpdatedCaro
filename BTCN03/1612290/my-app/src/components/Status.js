import React from 'react';
import propTypes from 'prop-types';

const Status = ({ winner, xIsNext }) => {
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div>{status}</div>
    );
};

Status.propTypes = {
  xIsNext: propTypes.bool.isRequired,
  winner: propTypes.string.isRequired
};

export default Status;
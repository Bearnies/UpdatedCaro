import Board from '../components/Board';
import {connect} from 'react-redux';
import {handleClick} from '../actions/actions';

const mapStateToProps = state => {
    const {stepNumber, history, winSquares} = state;
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
    .map(() => new Array(20).fill('square'));

    for (let i = 0; i < winSquares.length; i += 1) {
      const tempwin = winSquares[i];
      result[tempwin.row][tempwin.col] = 'square highlight';
    }

    return {
        winSquares: result,
        squares: caroboard
    }
};

const mapDispatchToProps = dispatch => ({
    onClick: (row, col) => {
      dispatch(handleClick(row, col));
    }
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
  
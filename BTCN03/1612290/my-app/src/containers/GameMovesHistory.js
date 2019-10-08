import MovesHistory from '../components/MovesHistory';
import {connect} from 'react-redux';
import {newStepNumber, newxIsNext} from '../actions/actions';

const mapStateToProps = state => ({
    stepNumber: state.newStepNumber,
    history: state.history,
    sortAscend: state.sortAscend
});

const mapDispatchToProps = dispatch => ({
    onClick: move => {
      dispatch(newStepNumber(move));
      dispatch(newxIsNext(move % 2 === 1)) //
    }
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovesHistory);
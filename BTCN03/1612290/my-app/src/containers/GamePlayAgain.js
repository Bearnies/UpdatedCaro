import PlayAgain from '../components/PlayAgain';
import {connect} from 'react-redux';
import {playAgain} from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(playAgain())
    }
});
  
export default connect(
    null, //mamapStateToProps,
    mapDispatchToProps
)(PlayAgain);
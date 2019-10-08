import Status from '../components/Status';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    winner: state.winner,
    xIsNext: state.xIsNext
});
  
export default connect(
    mapStateToProps,
    null  //mamapDispatchToProps,
)(Status);
import Sorting from '../components/Sorting';
import {connect} from 'react-redux';
import {sortAscend} from '../actions/actions';

const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(sortAscend())
    }
});
  
export default connect(
    null, //mamapStateToProps,
    mapDispatchToProps
)(Sorting);
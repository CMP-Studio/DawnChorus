import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import birds from '../data/birds';

import { showInfoCards } from '../actions/infoCards';

import AboutBirdsScreen from '../components/aboutBirdsScreen';

const mapStateToProps = (state) => {
  return {
    birds,
    navigatorKey: state.navigator.routes[state.navigator.index].key,
    infoCards: (state.infoCards.currentCard !== null),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        showInfoCards,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutBirdsScreen);

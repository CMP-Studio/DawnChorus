import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InfoCardsScreen from '../components/infoCardsScreen';

import birds from '../data/birds';

import { closeInfoCards } from '../actions/infoCards';

const mapStateToProps = (state) => {
  return {
    birds,
    currentCard: state.infoCards.currentCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions:
      bindActionCreators({
        closeInfoCards,
      }, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoCardsScreen);

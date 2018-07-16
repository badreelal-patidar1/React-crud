import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveGame, fetchGame, updateGame } from './action';
import GameForm from './GameForm';

class GameFormPage extends React.Component {

  state = {
    redirect: false
  }

  componentDidMount = () => {
    const { match } = this.props;
    if (match.params._id) {
      this.props.fetchGame(match.params._id);
    }
  }

  saveGame = ({ id, name, address, state, city, phoneNo }) => {
    if (id) {
      return this.props.updateGame({ id, name, address, state, city, phoneNo }).then(
        () => { this.setState({ redirect: true }) },
      );
    } else {
      return this.props.saveGame({ name, address, state, city, phoneNo }).then(
        () => { this.setState({ redirect: true }) },
      );
    }
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
            <Redirect to="/games" /> :
            <GameForm
              game={this.props.game}
              saveGame={this.saveGame}
            />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  if (match.params._id) {
    return {
      game: state.games[0]
    }
  }

  return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage);

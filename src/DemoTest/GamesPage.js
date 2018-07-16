import React from 'react';
import GamesList from './GamesList';
import { connect } from 'react-redux';
import { searchGames, deleteGame } from './action';

class GamesPage extends React.Component {
  componentWillMount() {
    this.props.searchGames();
  }
  render() {

    return (
      <div>
        <h1>College List</h1>
        <GamesList games={this.props.games} deleteGame={this.props.deleteGame} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.games
  }
}

export default connect(mapStateToProps, { searchGames, deleteGame })(GamesPage);

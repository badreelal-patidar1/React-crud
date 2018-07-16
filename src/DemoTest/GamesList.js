import React from 'react';
import { Link } from 'react-router-dom';
export default function GamesList({ games, deleteGame }) {
  const emptyMessage = (
    <p>There are no games yet in your collection.</p>
  );
  console.log("GAMES=>", games)
  const gamesList = (
    <div className="ui four cards">
      <div className="responsive-table">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>COLLEGE NAME</th>
              <th>ADDRESS</th>
              <th>STATE</th>
              <th>CITY</th>
              <th>PHONE NUMBER</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>

            {games.length && games[0, 0].map((game, index) =>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{game.name}</td>
                <td>{game.address}</td>
                <td>{game.state}</td>
                <td>{game.city}</td>
                <td>{game.phoneNo}</td>
                <td>
                  <div className="ui two buttons">
                    <Link to={`/game/${game.id}`} className="ui basic button green">Edit</Link>
                    <div className="ui basic button red" onClick={() => deleteGame(game.id)}>Delete</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  );
}

// GamesList.propTypes = {
//   games: React.PropTypes.array.isRequired,
//   deleteGame: React.PropTypes.func.isRequired
// }

export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const GAME_DELETED = 'GAME_DELETED';
export const SEARCH_GAME = "SEARCH_GAME"
const ROOT_URL = "http://localhost:3000"
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  }
}

export function addGame(game) {
  return {
    type: ADD_GAME,
    game
  }
}
export function searchGame(game) {
  return {
    type: SEARCH_GAME,
    game
  }
}
export function gameFetched(game) {
  return {
    type: GAME_FETCHED,
    game
  }
}

export function gameUpdated(game) {
  return {
    type: GAME_UPDATED,
    game
  }
}

export function gameDeleted(gameId) {
  return {
    type: GAME_DELETED,
    gameId
  }
}

export function saveGame(data) {
  return dispatch => {
    return fetch(`${ROOT_URL}/College/save`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(addGame(data)));
  }
}

export function updateGame(data) {
  return dispatch => {
    return fetch(`${ROOT_URL}/College/save`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(gameUpdated(data)));
  }
}

export function deleteGame(id) {
  return dispatch => {
    return fetch(`${ROOT_URL}/College/delete/${id}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(gameDeleted(id)));
  }
}
export function searchGames(data) {
  return dispatch => {
    return fetch(`${ROOT_URL}/College/search`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
      .then(data => dispatch(searchGame(data)));
  }
}

export function fetchGame(id) {
  console.log("id", id)
  return dispatch => {
    fetch(`${ROOT_URL}/College/get/${id}`)
      .then(res => res.json())
      .then(data => dispatch(gameFetched(data)));
  }
}

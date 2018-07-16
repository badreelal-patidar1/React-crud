import { SET_GAMES, ADD_GAME, GAME_FETCHED, GAME_UPDATED, GAME_DELETED, SEARCH_GAME } from '../action';

export default function games(state = [], action = {}) {
    switch (action.type) {
        case ADD_GAME:
            return [
                ...state,
                action.game
            ];
        case SEARCH_GAME:
            return [
                ...state,
                action.game
            ];

        case GAME_DELETED:
            return state.filter(item => item._id !== action.gameId);

        case GAME_UPDATED:
            return state.map(item => {
                if (item._id === action.game._id) return action.game;
                return item;
            });

        case GAME_FETCHED:
            console.log("reducer", state.findIndex(item => item))
            const index = state.findIndex(item => item._id === action.game.id);
            if (index > -1) {
                return state.map(item => {
                    if (item._id === action.game._id) return action.game;
                    return item;
                });
            } else {
                return [
                    ...state,
                    action.game
                ];
            }

        case SET_GAMES:
            return action.games;
        default: return state;
    }
}

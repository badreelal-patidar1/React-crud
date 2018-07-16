export default (state = { user: [], search: [] }, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return action.users;

        case "CREATE_USER":
            return action.user

        case "SEARCH_USER":
            return action.user

        case 'REMOVE_USER':
            return state.filter(user => user.id !== action.id);

        default:
            return state;
    }
}

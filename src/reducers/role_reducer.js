export default (state = { role: [], search: [] }, action) => {
    switch (action.type) {
        case 'GET_ROLE':
            return action.roles;

        case "CREATE_ROLE":
            return action.role

        case "SEARCH_ROLE":
            return action.role

        case 'REMOVE_ROLE':
            return state.filter(role => role.id !== action.id);

        default:
            return state;
    }
}

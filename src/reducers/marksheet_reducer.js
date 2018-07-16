export default (state = { college: [], search: [] }, action) => {
    switch (action.type) {
        case 'GET_MARKSHEETS':
            return action.marksheets;

        case "CREATE_MARKSHEET":
            return action.marksheet

        case "SEARCH_MARKSHEET":
            return action.marksheet

        case 'REMOVE_MARKSHEET':
            return state.filter(marksheet => marksheet.id !== action.id);

        default:
            return state;
    }
}

export default (state = { student: [], search: [] }, action) => {
    switch (action.type) {
        case 'GET_STUDNETS':
            return action.students;

        case "CREATE_STUDENT":
            return action.student

        case "SEARCH_STUDENT":
            return action.student

        case 'REMOVE_STUDENT':
            return state.filter(student => student.id !== action.id);

        default:
            return state;
    }
}

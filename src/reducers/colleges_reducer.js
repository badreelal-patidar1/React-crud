export default (state = { college: [], search: [] }, action) => {
  switch (action.type) {
    case 'GET_COLLEGES':
      return action.colleges;

    case "CREATE_COLLEGE":
      return action.college

    case "SEARCH_COLLEGE":
      return action.college

    case 'REMOVE_COLLEGE':
      return state.filter(college => college.id !== action.id);

    default:
      return state;
  }
}

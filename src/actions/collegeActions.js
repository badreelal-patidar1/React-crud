
const API_URL = process.env.REACT_APP_API_URL;

// Action Creators
export const setColleges = colleges => {
  return {
    type: 'GET_COLLEGES',
    colleges
  }
}

export const searchCollege = college => {
  return {
    type: 'SEARCH_COLLEGE',
    college
  }
}
export const addCollege = college => {
  return {
    type: 'CREATE_COLLEGE',
    college
  }
}
export const removeCollege = college => {
  return {
    type: 'REMOVE_COLLEGE',
    college
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

// Async actions
export const fetchCollege = (id) => {
  return dispatch => {
    return fetch(`${API_URL}/College/get/${id}`)
      .then(response => response.json())
      .then(college => {
        dispatch(setColleges([college]));
      })
      .catch(error => console.log(error));
  }
}

export const search = (college) => {
  return dispatch => {
    return fetch(`${API_URL}/College/search`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(college)
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(college => {
        dispatch(searchCollege(college))
      })
      .catch(error => {
        dispatch({ type: 'error' })
      })




  }
}
export const createCollege = (college, callback) => {
  return dispatch => {
    return fetch(`${API_URL}/College/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(college)
    })
      .then(handleResponse)
      .then(data => dispatch(addCollege(data)))
      .then(() => callback())
      .catch(error => {
        console.log(error);
      });
  }
}

export const deleteCollege = (id, callback) => {
  return dispatch => {
    return fetch(`${API_URL}/College/delete/${id}`, {
      method: "GET",
      headers: {
        'Accept-Version': 1,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(response => {
        dispatch(removeCollege(id));
      })
      .then(() => callback())
      .catch(error => console.log(error))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}


const API_URL = process.env.REACT_APP_API_URL;

// Action Creators
export const setStudent = students => {
    return {
        type: 'GET_STUDENTS',
        students
    }
}

export const searchStudent = student => {
    return {
        type: 'SEARCH_STUDENT',
        student
    }
}
export const addStudent = student => {
    return {
        type: 'CREATE_STUDENT',
        student
    }
}
export const removeStudent = student => {
    return {
        type: 'REMOVE_STUDENT',
        student
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
export const getStudent = () => {
    return dispatch => {
        return fetch(`${API_URL}/Student`)
            .then(res => res.json())
            .then(students => {
                dispatch(setStudent(students))
            })
            .catch(error => console.log(error));
    }
}

export const fetchStudent = (id) => {
    return dispatch => {
        return fetch(`${API_URL}/Student/get/${id}`)
            .then(response => response.json())
            .then(student => {
                dispatch(setStudent([student]));
            })
            .catch(error => console.log(error));
    }
}

export const search = (student) => {
    return dispatch => {
        return fetch(`${API_URL}/Student/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(student => {
                dispatch(searchStudent(student))
            })
            .catch(error => {
                dispatch({ type: 'error' })
            })
    }
}
export const createStudent = (student, callback) => {
    console.log("actioncollege", student)
    return dispatch => {
        return fetch(`${API_URL}/Student/save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
            .then(handleResponse)
            .then(data => dispatch(addStudent(data)))
            .then(() => callback())
            .catch(err => {
                console.log(err)
            })
    }
}

export const deleteStudent = (id, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/Student/delete/${id}`, {
            method: "GET",
            headers: {
                'Accept-Version': 1,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => {
                dispatch(removeStudent(id))
            }).then(() => callback())
            .catch(error => console.log(error))
    }
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

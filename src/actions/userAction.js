
const API_URL = process.env.REACT_APP_API_URL;

// Action Creators
export const setUsers = users => {
    return {
        type: 'GET_USER',
        users
    }
}

export const searchUser = user => {
    return {
        type: 'SEARCH_USER',
        user
    }
}
export const addUser = user => {
    return {
        type: 'CREATE_USER',
        user
    }
}
export const removeUser = user => {
    return {
        type: 'REMOVE_USER',
        user
    }
}


// Async actions

export const fetchUser = (id) => {
    return dispatch => {
        return fetch(`${API_URL}/User/get/${id}`)
            .then(response => response.json())
            .then(user => {
                dispatch(setUsers([user]));
            })
            .catch(error => console.log(error));
    }
}

export const search = (user) => {
    return dispatch => {
        return fetch(`${API_URL}/User/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(user => {
                dispatch(searchUser(user))
            })
            .catch(error => {
                dispatch({ type: 'error' })
            })
    }
}
export const createUser = (user, callback) => {
    console.log("actioncollege", user)
    return dispatch => {
        return fetch(`${API_URL}/User/save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(user => {
                dispatch(addUser(user))
            })
            .then(() => callback())
            .catch(error => {
                dispatch({ type: 'error' })
            })
    }
}

export const deleteUser = (id, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/User/delete/${id}`, {
            method: "GET",
            headers: {
                'Accept-Version': 1,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => {
                dispatch(removeUser(id));
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

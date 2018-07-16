
const API_URL = process.env.REACT_APP_API_URL;

// Action Creators
export const setRoles = roles => {
    return {
        type: 'GET_ROLES',
        roles
    }
}

export const searchRole = role => {
    return {
        type: 'SEARCH_ROLE',
        role
    }
}
export const addRole = role => {
    return {
        type: 'CREATE_ROLE',
        role
    }
}
export const removeRole = role => {
    return {
        type: 'REMOVE_ROLE',
        role
    }
}


// Async actions

export const fetchRole = (id) => {
    return dispatch => {
        return fetch(`${API_URL}/Role/get/${id}`)
            .then(response => response.json())
            .then(role => {
                dispatch(setRoles([role]));
            })
            .catch(error => console.log(error));
    }
}

export const search = (role) => {
    return dispatch => {
        return fetch(`${API_URL}/Role/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(role)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(role => {
                dispatch(searchRole(role))
            })
            .catch(error => {
                dispatch({ type: 'error' })
            })




    }
}
export const createRole = (role, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/Role/save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(role)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(role => {
                dispatch(addRole(role))
            })
            .then(() => callback())
            .catch(error => {
                dispatch({ type: 'error' })
            })
    }
}

export const deleteRole = (id, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/Role/delete/${id}`, {
            method: "GET",
            headers: {
                'Accept-Version': 1,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => {
                dispatch(removeRole(id));
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

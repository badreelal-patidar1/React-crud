
const API_URL = process.env.REACT_APP_API_URL;

// Action Creators
export const setMarksheets = marksheets => {
    return {
        type: 'GET_MARKSHEET',
        marksheets
    }
}

export const searchMarksheet = marksheet => {
    return {
        type: 'SEARCH_MARKSHEET',
        marksheet
    }
}
export const addMarksheet = marksheet => {
    return {
        type: 'CREATE_MARKSHEET',
        marksheet
    }
}
export const removeMarksheet = marksheet => {
    return {
        type: 'REMOVE_MARKSHEET',
        marksheet
    }
}


// Async actions

export const fetchMarksheet = (id) => {
    return dispatch => {
        return fetch(`${API_URL}/Marksheet/get/${id}`)
            .then(response => response.json())
            .then(marksheet => {
                dispatch(setMarksheets([marksheet]));
            })
            .catch(error => console.log(error));
    }
}

export const search = (marksheet) => {
    return dispatch => {
        return fetch(`${API_URL}/Marksheet/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marksheet)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(marksheet => {
                dispatch(searchMarksheet(marksheet))
            })
            .catch(error => {
                dispatch({ type: 'error' })
            })




    }
}
export const createMarksheet = (marksheet, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/Marksheet/save`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marksheet)
        })
            .then(handleErrors)
            .then(response => response.json())
            .then(marksheet => {
                dispatch(addMarksheet(marksheet))
            })
            .then(() => callback())
            .catch(error => {
                dispatch({ type: 'error' })
            })
    }
}

export const deleteMarksheet = (id, callback) => {
    return dispatch => {
        return fetch(`${API_URL}/Marksheet/delete/${id}`, {
            method: "GET",
            headers: {
                'Accept-Version': 1,
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(response => {
                dispatch(removeMarksheet(id));
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

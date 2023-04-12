import {createAction} from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
        .then(filters => dispatch(filterFetched(filters)))
        .catch((e) => console.log(e))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction('HEROES_FETCHING')

export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDeleting = () => {
    return {
        type: 'HEROES_DELETING'
    }
}

export const heroesDeleted = (id) => {
    return {
        type: 'HEROES_DELETED',
        payload: id
    }
}

export const heroesDeletingError = () => {
    return {
        type: 'HEROES_DELETING_ERROR'
    }
}

export const heroesAdding = () => {
    return {
        type: 'HEROES_ADDING'
    }
}

export const heroesAdded = (hero) => {
    return {
        type: 'HEROES_ADDED',
        payload: hero
    }
}

export const heroesAddingError = () => {
    return {
        type: 'HEROES_ADDING_ERROR'
    }
}

export const filterFetched = (filters) => {
    return {
        type: 'FILTER_FETCHED',
        payload: filters
    }
}

export const filterHeroes = (filter) => {
    return {
        type: 'HEROES_FILTERED',
        payload: filter
    }
}
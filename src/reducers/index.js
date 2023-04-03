const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETING':
            return {
                ...state,
                heroesDeletingStatus: 'loading'
            }
        case 'HEROES_DELETED':
            return {
                ...state,
                heroesDeletingStatus: 'idle',
                heroes: state.heroes.filter(item => action.payload !== item.id),
                filteredHeroes: state.heroes.filter(item => action.payload !== item.id)
            }
        case 'HEROES_DELETING_ERROR':
            return {
                ...state,
                heroesDeletingStatus: 'error'
            }
        case 'HEROES_ADDING':
            return {
                ...state,
                heroesAddingStatus: 'loading'
            }
        case 'HEROES_ADDED':
            return {
                ...state,
                heroesAddingStatus: 'idle',
                heroes: [...state.heroes, action.payload],
                filteredHeroes: [...state.heroes, action.payload],
            }
        case 'HEROES_ADDING_ERROR':
            return {
                ...state,
                heroesAddingStatus: 'error'
            }
        case 'FILTER_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'HEROES_FILTERED':
            return {
                ...state,
                filteredHeroes: state.heroes.filter(item => {
                    if(action.payload === 'all') return true
                    return item.element === action.payload
                })
            }
        default: return state
    }
}

export default reducer;
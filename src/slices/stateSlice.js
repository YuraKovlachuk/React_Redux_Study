import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
    filters: []
}

const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        heroesFetching: state => { state.heroesLoadingStatus = 'loading'; },
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.filteredHeroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        heroesFetchingError: state => { state.heroesLoadingStatus = 'error'; },
        heroesDeleting: state => { state.heroesDeletingStatus = 'loading'; },
        heroesDeleted: (state, action) => {
            state.heroesDeletingStatus = 'idle';
            state.heroes = state.heroes.filter(item => action.payload !== item.id);
            state.filteredHeroes = state.heroes.filter(item => action.payload !== item.id);
        },
        heroesDeletingError: state => { state.heroesDeletingStatus = 'error'; },
        heroesAdding: state => { state.heroesAddingStatus = 'loading' },
        heroesAdded: (state, action) => {
            state.heroesAddingStatus = 'idle';
            state.heroes.push(action.payload);
            state.filteredHeroes.push(action.payload);
        },
        heroesAddingError: state => { state.heroesAddingStatus = 'error'; },
        filterFetched: (state, action) => {
            state.filters = action.payload
        },
        filterHeroes: (state, action) => {
            state.filteredHeroes = state.heroes.filter(item => {
                if(action.payload === 'all') return true
                return item.element === action.payload
            })
        }
    }
})

const {actions, reducer} = stateSlice

export default reducer
export const {
    heroesAdded,
    heroesAdding,
    heroesAddingError,
    heroesDeleted,
    heroesDeleting,
    heroesDeletingError,
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
    filterFetched,
    filterHeroes
} = actions

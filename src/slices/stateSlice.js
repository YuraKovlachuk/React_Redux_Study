import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";

const initialState = {
    heroes: [],
    filteredHeroes: [],
    heroesLoadingStatus: 'idle',
    heroesDeletingStatus: 'idle',
    heroesAddingStatus: 'idle',
    filters: []
}

export const fetchHeroes = createAsyncThunk(
    'state/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request('http://localhost:3001/heroes')
    }
)

export const fetchFilters = createAsyncThunk(
    'state/fetchFilters',
    async () => {
        const { request } = useHttp()
        return await request('http://localhost:3001/filters')
    }
)
const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
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
        filterHeroes: (state, action) => {
            state.filteredHeroes = state.heroes.filter(item => {
                if(action.payload === 'all') return true
                return item.element === action.payload
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading'; })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroes = action.payload;
                state.filteredHeroes = action.payload;
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, state => { state.heroesLoadingStatus = 'error'; })
            .addCase(fetchFilters.fulfilled, (state, action) => { state.filters = action.payload })
            .addDefaultCase(() => {})
    }
})

export const deleteHero = (request, id) => (dispatch) => {
    dispatch(heroesDeleting());
    request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        .then(() => dispatch(heroesDeleted(id)))
        .catch(() => dispatch(heroesDeletingError()))
}

const {actions, reducer} = stateSlice

export default reducer
export const {
    heroesAdded,
    heroesAdding,
    heroesAddingError,
    heroesDeleted,
    heroesDeleting,
    heroesDeletingError,
    filterHeroes
} = actions

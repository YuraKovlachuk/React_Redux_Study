import { configureStore } from "@reduxjs/toolkit";
import reducer from "../slices/stateSlice";

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

// const store = createStore(reducer,
//     compose(applyMiddleware(ReduxThunk),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;

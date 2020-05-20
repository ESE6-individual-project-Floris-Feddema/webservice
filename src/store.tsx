import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import auth from './reducers/authReducer';

const store = createStore(combineReducers({
        auth
    }),
    loadFromLocalStorage(),
    applyMiddleware(createLogger(), thunk)
);


function saveToLocalStorage(state : any) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

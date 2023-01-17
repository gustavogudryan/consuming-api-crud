import { configureStore } from '@reduxjs/toolkit';
import combineReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig={
    key:'root',
    storage,
}

const persistRedux=persistReducer(persistConfig,combineReducer)

const store=configureStore({
    reducer:persistRedux,
    middleware:[thunk],
    devTools: process.env.NODE_ENV !== 'production',
})

const persistor=persistStore(store)

export{store,persistor}
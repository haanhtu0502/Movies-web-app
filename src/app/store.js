import { configureStore } from '@reduxjs/toolkit';
import favouriteReducer from './favouriteSlice';

const rootReducer ={
    favourite : favouriteReducer
}

const store = configureStore({
    reducer:rootReducer,
 
});

export default store;
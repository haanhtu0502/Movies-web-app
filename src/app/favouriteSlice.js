import {createSlice} from '@reduxjs/toolkit';

const favourite = createSlice({
    name:'favourites',
    initialState: [],
    reducers: {
        addFavourite:(state, action) =>{
            state.push(action.payload);
        },
        removeFavourite:(state,action)=>{
            state=state.filter((i) => i.id !== action.payload);
            return state;
           
        }
    }
})

export const { addFavourite,removeFavourite } = favourite.actions;
export default favourite.reducer;
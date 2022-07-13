import { createReducer } from "@reduxjs/toolkit";
const intialState={
  
}

export const placeReducer = createReducer(intialState,{
    LoginRequest:(state)=>{
        state.isLoading=true
    },
    LoginSuccess:(state,action)=>{
        state.isLoading=false
        state.user=action.payload
        state.places=true
    },
    LoginFailure:(state,action)=>{
        state.isLoading=false
        state.error=action.payload
        state.places=false
    },
    LoadRequest:(state)=>{
        state.isLoading=true
    },
    LoadSuccess:(state,action)=>{
        state.isLoading=false
        state.user=action.payload
        state.places=true
    },
    LoadFailure:(state,action)=>{
        state.isLoading=false
        state.error=action.payload
        state.places=false
    },
    
})

export const getPlaceReducer = createReducer(intialState, {
    GetPlacesRequest: (state) => {
      state.loading = true;
    },
    GetPlacesSuccess: (state, action) => {
      state.loading = false;
      state.places = action.payload;
    },
    GetPlacesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
  });
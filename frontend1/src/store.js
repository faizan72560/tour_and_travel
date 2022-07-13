import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userreducer"; 
import {getPlaceReducer, placeReducer}  from "./reducers/placeReducer"

const store=configureStore({
    reducer:{
        user:userReducer,
        myPlaces:getPlaceReducer
        // postOfFollowing: postOfFollowingReducer,
        // createPost:createNewPost,
        // allUsers: allUsersReducer,
        // myposts:myPostsReducer
    
    }
    , middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),   

    })

export default store

    
   
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";

const store = configureStore({
    
    reducer: {
   userpic:UserSlice
    },
  })
  
   
  export default store 
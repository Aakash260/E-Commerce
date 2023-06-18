import { createSlice } from '@reduxjs/toolkit'
 
const UserSlice = createSlice({
  name: 'upic',
  initialState:[],
  reducers: {
 addPic(state,action){
  state.push(action.payload)
 },
//  addName(state,action){
//   state.push(action.payload)
//  },
  },
})
// console.log("🚀 ~ file: UserSlice.js:10 ~ UserSlice:", UserSlice.actions)

 
export default UserSlice.reducer;
export const {addPic}=UserSlice.actions
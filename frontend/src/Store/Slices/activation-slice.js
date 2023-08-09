import { createSlice } from "@reduxjs/toolkit";

const initialState ={
   name:"",
   avatar:''
}
 const  activationSlice = createSlice({
    name:'activate',
    initialState:initialState,
    reducers:{
        setName:(state,actions)=>{
           state.name = actions.payload;
           
        },
        setAvatar:(state,action)=>{
        state.avatar = action.payload;
        }
    }
});
export const { setName ,setAvatar} = activationSlice.actions;

export default activationSlice.reducer;

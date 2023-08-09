import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isAuth:false,
    user:null,
    otp:{
        email:'',
        hash:''
    }
}
 const  authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setAuth:(state,actions)=>{
            const { user , isAuth} = actions.payload;
            state.user = user;
            if(user===null){
                state.isAuth = false
            }else{
                state.isAuth = true
            }
        },
        setOtp:(state,action)=>{
            const {email,hash} = action.payload;
         
            state.otp.email = email 
            state.otp.hash = hash 
          
        }
    }
});
export const { setAuth ,setOtp} = authSlice.actions;

export default authSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import auth from "../Store/Slices/user-slices"
import activate from "../Store/Slices/activation-slice"

const store = configureStore({
  reducer: {
 
    authSlice:auth,
    activationSlice:activate
  },
});

export default store;
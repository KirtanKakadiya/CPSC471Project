import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    isLoggedIn: false,
    userType: ""
  };
  
export const userSlice = createSlice({
  name: 'userdetails',
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {

      switch(action.payload.type) {
        case 'LOG_IN':
          console.log("logged in");
          state.username = action.payload.payload.username;
          state.isLoggedIn = true;
          state.userType = action.payload.payload.userType;
          break;
        case 'LOG_OUT':
          state.username = null;
          state.isLoggedIn = false;
          state.userType = null;
          break;
        default:
          state.username = "reset";
          state.isLoggedIn = false;
          state.userType = null;
      }
    }
  }
});
  
export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
  

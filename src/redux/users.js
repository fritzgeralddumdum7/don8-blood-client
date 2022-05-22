import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '@/services';

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile',
  async () => {
    const response = await User.profile();

    return response.data.data;
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    authUser: null,
    isFetching: false
  },
  reducers: {
    resetAuthUser: state => {
      state.authUser = null;
    },
    setIsFetching: (state, payload) => {
      state.authUser = payload;
    }
  },
  extraReducers: {
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.authUser = action.payload;
    }
  }
})

export const {
  resetAuthUser,
  setIsFetching
} = usersSlice.actions;

export default usersSlice.reducer;

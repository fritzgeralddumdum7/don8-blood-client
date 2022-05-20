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
    authUser: null
  },
  reducers: {
    resetAuthUser: state => {
        state.authUser = null;
    }
  },
  extraReducers: {
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.authUser = action.payload;
    }
  }
})

export const { resetAuthUser } = usersSlice.actions;

export default usersSlice.reducer;

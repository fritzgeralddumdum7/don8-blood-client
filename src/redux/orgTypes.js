import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrganizationType } from '@/services';
import { formatAsSelectData } from '@/helpers';


export const fetchOrgTypes = createAsyncThunk('orgTypes/fetchOrgTypes',
  async () => {
    const response = await OrganizationType.getOrganizationTypes();

    return response.data.data;
  }
)

export const orgTypesSlice = createSlice({
  name: 'orgTypes',
  initialState: {
    orgTypes: []
  },
  extraReducers: {
    [fetchOrgTypes.fulfilled]: (state, action) => {
      state.orgTypes = formatAsSelectData(action.payload, 'name');
    }
  }
})

export default orgTypesSlice.reducer;

import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";
import { channelsApi } from "../services/channelsApi";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ active: null });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers(builder) {
    builder.addMatcher(
      channelsApi.endpoints.getChannels.matchFulfilled,
      (state, action) => {
        channelsAdapter.upsertMany(state, action.payload);
        console.log('current channels state  ', current(state));
      }
    )
  }
})

export const selectors = channelsAdapter.getSelectors(state => state.channels);
export const selectAllChannels = selectors.selectAll;
export const countChannels = (state) => selectors.selectTotal(state);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
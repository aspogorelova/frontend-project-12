import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";
import { channelsApi } from "../services/channelsApi";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ active: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      console.log('setActiveChannel id  ', action);
      state.active = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      channelsApi.endpoints.getChannels.matchFulfilled,
      (state, action) => {
        channelsAdapter.upsertMany(state, action.payload);
        // console.log('current channels state  ', current(state));
      }
    )
  }
})

export const selectors = channelsAdapter.getSelectors(state => state.channels);
export const selectAllChannels = selectors.selectAll;
export const selectActiveChannelId = (state) => state.channels.active;
export const countChannels = (state) => selectors.selectTotal(state);
export const { setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
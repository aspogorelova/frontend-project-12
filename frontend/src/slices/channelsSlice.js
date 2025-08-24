import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { channelsApi } from '../services/channelsApi'

const channelsAdapter = createEntityAdapter()
const activeChannel = localStorage.getItem('currentChannel') || 1
const initialState = channelsAdapter.getInitialState({ active: activeChannel })

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel(state, action) {
      state.active = action.payload
      localStorage.setItem('currentChannel', action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        channelsApi.endpoints.getChannels.matchFulfilled,
        (state, action) => {
          channelsAdapter.setAll(state, action.payload)
        },
      )
      .addMatcher(
        channelsApi.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          channelsAdapter.removeOne(state, payload.id)
        },
      )
  },
})

export const selectors = channelsAdapter.getSelectors(state => state.channels)
export const selectAllChannels = selectors.selectAll
export const selectActiveChannelId = state => state.channels.active
export const countChannels = state => selectors.selectTotal(state)
export const { setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer

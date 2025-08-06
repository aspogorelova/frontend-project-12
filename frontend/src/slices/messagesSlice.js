import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";
import { messagesApi } from "../services/messagesApi.js";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageFromSocket: (state, action) => {
      messagesAdapter.upsertOne(state, action.payload);
      console.log('current MESSAGES state after add new mess  ', current(state));

    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      messagesApi.endpoints.getMessages.matchFulfilled,
      (state,action) => {
        messagesAdapter.upsertMany(state, action.payload);
        console.log('current MESSAGES state  ', current(state));
      }
    )
  }
})

export const { addMessageFromSocket } = messagesSlice.actions;
export const { selectAll } = messagesAdapter.getSelectors((state) => state.messages);
export const countMessages = (state) => selectors.selectTotal(state);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
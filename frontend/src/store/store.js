import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import channelsReducer from '../slices/channelsSlice.js'
import messagesReducer from '../slices/messagesSlice.js'
import { channelsApi } from '../services/channelsApi.js'
import { messagesApi } from '../services/messagesApi.js'
import { authApi } from '../services/authApi.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware)
    .concat(authApi.middleware),
})

export default store

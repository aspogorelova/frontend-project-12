import { isRejectedWithValue } from '@reduxjs/toolkit'
import { logOut } from '../slices/authSlice.js'

export const unauthenticatedMiddleware = ({ dispatch }) => (next) => (action) => {
  if (isRejectedWithValue(action) && action.payload.status === 401) {
    dispatch(logOut())
    window.location.href = '/login'
  }

  return next(action)
}

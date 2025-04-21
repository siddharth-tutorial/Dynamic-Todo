import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './ComponentSlice/createslice'
export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});

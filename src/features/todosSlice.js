import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodosFromApi } from '../api/todoMockApi';

export const getAllPosts = createAsyncThunk('/', async () => {
  console.log('runnings');
  const data = await getTodosFromApi();
  console.log(data);
  return data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodoReducer: (state, action) => {
      const { id, text } = action.payload;
      state.push({ id, text });
    },
    removeTodoReducer: (state, action) => {
      const id = action.payload;
      state = state.filter(item => item.id !== id);
      return state;
    },
    updateTodoReducer: (state, action) => {
      const { todoId, text } = action.payload;
      state = state.map(item => {
        if (item.id === todoId) {
          return {
            id: todoId,
            text
          };
        } else {
          return item;
        }
      });
      return state;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getAllPosts.fulfilled]: (state, action) => {
      console.log('logging', action.payload);
      state = [...action.payload];
      return state;
    }
  }
});

export const {
  addTodoReducer,
  removeTodoReducer,
  updateTodoReducer
} = todosSlice.actions;
export default todosSlice.reducer;

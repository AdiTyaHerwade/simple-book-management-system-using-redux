import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      // console.log(state);
      // console.log(action);
      // state = [...state,action.payload]
      state.push(action.payload);
    },
    updateBook: (state, action) => {
      const { id, updatedBook } = action.payload;
      console.log(action.payload, id, updatedBook);
      
      const index = state.findIndex(book => book.id === id);
      console.log(index);
      
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      return state.filter(book => book.id !== action.payload);
    },
  },
});

// Export actions
export const { addBook, updateBook, deleteBook } = booksSlice.actions;

// Export reducer
export default booksSlice.reducer;

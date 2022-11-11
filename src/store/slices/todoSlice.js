import { createSlice } from "@reduxjs/toolkit";

// the object to represent the filters
export const filters = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  NOT_COMPLETED: "NOT_COMPLETED",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: 1,
        completde: false,
        title: "todo 1",
        completed: false,
      },
      {
        id: 2,
        completde: true,
        title: "todo 2",
        completed: false,
      },
    ],

    // default: show all todos
    filterBy: filters.ALL,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.title,
      });
    },
    toggleTodo(state, action) {
      const toggleTodoItem = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggleTodoItem.completed = !toggleTodoItem.completed;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    filterBy(state, action) {
      state.filterBy = action.payload;
    },
  },
});

const { actions, reducer } = todoSlice;

export const { addTodo, removeTodo, toggleTodo, filterBy } = actions;

export default reducer;

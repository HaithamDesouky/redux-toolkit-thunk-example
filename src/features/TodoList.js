import React, { useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { connect, useDispatch } from 'react-redux';
import {
  addTodoReducer,
  removeTodoReducer,
  updateTodoReducer,
  getAllPosts
} from './todosSlice';

const selectTodos = state => state.todos;

const mapStateToProps = state => ({
  todos: selectTodos(state)
});

function TodoList({ todos }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const addNewTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    dispatch(addTodoReducer(todo));
  };

  const removeTodo = id => {
    dispatch(removeTodoReducer(id));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    dispatch(updateTodoReducer({ todoId, text: newValue.text }));
  };

  // const completeTodo = id => {
  //   let updatedTodos = todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.isComplete = !todo.isComplete;
  //     }
  //     return todo;
  //   });
  // setTodos(updatedTodos);
  // };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addNewTodo} />
      <Todo
        todos={todos}
        // completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default connect(mapStateToProps)(TodoList);

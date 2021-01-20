import { combineReducers } from 'redux';
import todosReducer from '../features/todosSlice';

export default combineReducers({
  todos: todosReducer
});

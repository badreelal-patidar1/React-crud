import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';
import colleges from './reducers/colleges_reducer';
import errors from './reducers/errors_reducer';
import marksheet from './reducers/marksheet_reducer';
import role from './reducers/role_reducer';
import users from './reducers/user_reducer';
import students from './reducers/student_reducer';
const reducers = combineReducers({
  colleges,
  marksheet,
  users,
  role,
  students,
  errors,
  form: formReducer
});

const middleware = [thunk];

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
);

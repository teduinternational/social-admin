import { applyMiddleware, combineReducers, createStore } from 'redux';

import { accountReducer } from './account/reducers';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  account: accountReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, middleWareEnhancer);
}

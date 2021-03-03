import { createStore } from 'redux'
import reducer from './reducers'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer
)

export type RootState = ReturnType<typeof store.getState>;

export default store
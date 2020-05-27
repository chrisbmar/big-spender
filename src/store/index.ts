import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { itemReducer } from "./reducers/reducer";
import rootSaga from "./sagas/initBillionaires";

// export type RootState = ReturnType<typeof itemReducer>;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  itemReducer,
  compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))
);

sagaMiddleware.run(rootSaga);

export default store;

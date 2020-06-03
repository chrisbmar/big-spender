import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducers/reducer";
import rootSaga from "./sagas/initBillionaires";

// export type RootState = ReturnType<typeof reducer>;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))
);

sagaMiddleware.run(rootSaga);

export default store;

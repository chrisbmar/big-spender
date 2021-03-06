import "regenerator-runtime/runtime";
import { put, call, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actions";
import { fetchBillionaireData } from "../../utility/fetchBillionaireData";
import * as actionTypes from "../actions/actionTypes";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* initBillionairesSaga() {
  try {
    const data = yield call(fetchBillionaireData);
    yield put(actions.setBillionaires(data));
    yield put(actions.updateBillionaire(data[0]));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function* watchInitBillionaires() {
  yield takeEvery(actionTypes.INIT_BILLIONAIRES, initBillionairesSaga);
}

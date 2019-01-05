import { takeEvery } from 'redux-saga/effects';
import { generateProtectedApiCallSaga } from '../utils/protectedApiCallSaga';
import { getPaginatedIncomes } from '../../services/http/budgetAppAPI/requests/incomes';
import {
  FETCH_INCOMES_REQUEST,
  fetchIncomesFailure,
  fetchIncomesSuccess
} from '../actions/incomesActions';

export const fetchIncomes = generateProtectedApiCallSaga(
  getPaginatedIncomes,
  action => ([action.page, action.perPage]),
  fetchIncomesSuccess,
  fetchIncomesFailure
);

export function* watchFetchIncomesRequest() {
  yield takeEvery(FETCH_INCOMES_REQUEST, fetchIncomes);
}

import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as DevActions } from '../ducks/devs';

export function* addDev(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.data.user}`);

    const isDuplicated = yield select((state) => {
      const { devs } = state;
      return devs.data.find(dev => dev.id === data.id);
    });

    if (isDuplicated) {
      yield put(DevActions.addDevFailure('Duplicated dev'));
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        avatar: data.avatar_url,
        login: data.login,
        latitude: action.payload.data.latitude,
        longitude: action.payload.data.longitude,
      };

      yield put(DevActions.addDevSuccess(userData));
    }
  } catch (err) {
    yield put(DevActions.addDevFailure('Error while adding dev'));
  }
}

export function* removeDev(action) {
  yield put(DevActions.removeDevSuccess(action.payload.id));
}

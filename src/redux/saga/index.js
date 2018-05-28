import { all, fork } from 'redux-saga/effects';
import * as api from '../../api/index';

// import common from './common';
import { effects } from 'redux-saga';

/**
 * 生成 saga
 * @param {func} module
 */
export function makeSage(module) {
    return fork(module(effects, api));
}

export default function* rootSaga() {
    yield all([]);
}

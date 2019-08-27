import { fromJS } from 'immutable';
import appContext2Reducer from '../reducer';

describe('appContext2Reducer', () => {
  it('returns the initial state', () => {
    expect(appContext2Reducer(undefined, {})).toEqual(fromJS({}));
  });
});

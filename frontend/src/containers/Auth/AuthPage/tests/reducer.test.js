import { fromJS } from 'immutable';
import authPageReducer from '../reducer';

describe('authPageReducer', () => {
  it('returns the initial state', () => {
    expect(authPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import signUpPropainerReducer from '../reducer';

describe('signUpPropainerReducer', () => {
  it('returns the initial state', () => {
    expect(signUpPropainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

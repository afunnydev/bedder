import { fromJS } from 'immutable';
import authPagePropainerReducer from '../reducer';

describe('authPagePropainerReducer', () => {
  it('returns the initial state', () => {
    expect(authPagePropainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

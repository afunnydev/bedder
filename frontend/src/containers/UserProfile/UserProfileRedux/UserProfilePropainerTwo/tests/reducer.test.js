import { fromJS } from 'immutable';
import userProfilePropainerTwoReducer from '../reducer';

describe('userProfilePropainerTwoReducer', () => {
  it('returns the initial state', () => {
    expect(userProfilePropainerTwoReducer(undefined, {})).toEqual(fromJS({}));
  });
});

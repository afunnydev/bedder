import { fromJS } from 'immutable';
import userProfilePropainerOneReducer from '../reducer';

describe('userProfilePropainerOneReducer', () => {
  it('returns the initial state', () => {
    expect(userProfilePropainerOneReducer(undefined, {})).toEqual(fromJS({}));
  });
});

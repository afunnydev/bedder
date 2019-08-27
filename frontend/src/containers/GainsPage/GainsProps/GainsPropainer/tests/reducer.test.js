import { fromJS } from 'immutable';
import gainsPropainerReducer from '../reducer';

describe('gainsPropainerReducer', () => {
  it('returns the initial state', () => {
    expect(gainsPropainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

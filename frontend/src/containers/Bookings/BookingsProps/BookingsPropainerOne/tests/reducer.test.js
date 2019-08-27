import { fromJS } from 'immutable';
import bookingsPropainerOneReducer from '../reducer';

describe('bookingsPropainerOneReducer', () => {
  it('returns the initial state', () => {
    expect(bookingsPropainerOneReducer(undefined, {})).toEqual(fromJS({}));
  });
});

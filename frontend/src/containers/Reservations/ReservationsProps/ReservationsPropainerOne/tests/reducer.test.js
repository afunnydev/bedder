import { fromJS } from 'immutable';
import reservationsPropainerOneReducer from '../reducer';

describe('reservationsPropainerOneReducer', () => {
  it('returns the initial state', () => {
    expect(reservationsPropainerOneReducer(undefined, {})).toEqual(fromJS({}));
  });
});

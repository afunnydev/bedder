import { fromJS } from 'immutable';
import supportTicketPropainerReducer from '../reducer';

describe('supportTicketPropainerReducer', () => {
  it('returns the initial state', () => {
    expect(supportTicketPropainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});

import { fromJS } from 'immutable';
import myAdsPageReducer from '../reducer';

describe('myAdsPageReducer', () => {
  it('returns the initial state', () => {
    expect(myAdsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});

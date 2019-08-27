import { fromJS } from 'immutable';

export const initialState = fromJS({});

function AppReducer(state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default AppReducer;

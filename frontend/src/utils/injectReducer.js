import React from 'react';

import { store } from 'containers/App';

// const injectReducer = ({ key, reducer }) => {
//   store.injectReducer(key, reducer);
// }

const injectReducer = ({ key, reducer }) => WrappedComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      store.injectReducer(key, reducer);
    }

    render() {
      return(
        <div>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};
export default injectReducer;

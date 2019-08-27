/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */

import React from 'react';
import Loadable from 'react-loadable';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <BedderLoadingIndicator white center full />,
});

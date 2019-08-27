/**
 *
 * Asynchronously loads the component for BusinessViewPropConnector
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

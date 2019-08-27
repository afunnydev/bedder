/**
 *
 * Asynchronously loads the component for ErrorNetwork
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

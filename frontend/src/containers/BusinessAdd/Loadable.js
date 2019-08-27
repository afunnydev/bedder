/**
 *
 * Asynchronously loads the component for BusinessAdd
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

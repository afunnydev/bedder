/**
 *
 * Asynchronously loads the component for BedderLoading
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

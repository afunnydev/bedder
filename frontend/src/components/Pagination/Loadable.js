/**
 *
 * Asynchronously loads the component for Pagination
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

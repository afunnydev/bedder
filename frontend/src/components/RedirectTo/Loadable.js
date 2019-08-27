/**
 *
 * Asynchronously loads the component for RedirectTo
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

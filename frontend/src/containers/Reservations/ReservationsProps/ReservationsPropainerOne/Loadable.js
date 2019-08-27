/**
 *
 * Asynchronously loads the component for ReservationsPropainerOne
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

/**
 *
 * Asynchronously loads the component for BookingsPropainerOne
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

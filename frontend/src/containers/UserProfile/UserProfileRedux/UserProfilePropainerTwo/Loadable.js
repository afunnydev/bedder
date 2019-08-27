/**
 *
 * Asynchronously loads the component for UserProfilePropainerTwo
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

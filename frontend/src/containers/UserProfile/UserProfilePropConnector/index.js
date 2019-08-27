import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import UserProfilePage from '../UserProfilePage/Loadable';

import UserProfilePropainerOne from '../UserProfileProps/UserProfilePropainerOne/Loadable';
import { withConnect as UserProfilePropainerOneConnect } from '../UserProfileProps/UserProfilePropainerOne';
import UserProfilePropainerTwo from '../UserProfileProps/UserProfilePropainerTwo/Loadable';
import { withConnect as UserProfilePropainerTwoConnect } from '../UserProfileProps/UserProfilePropainerTwo';


export class UserProfilePropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <UserProfilePropainerOne>
          <UserProfilePropainerTwo>
            <UserProfilePage {...this.props} />
          </UserProfilePropainerTwo>
        </UserProfilePropainerOne>
      </React.Fragment>
    );
  }
}

UserProfilePropConnector.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  UserProfilePropainerOneConnect,
  UserProfilePropainerTwoConnect,
)(UserProfilePropConnector);

export { withConnect };

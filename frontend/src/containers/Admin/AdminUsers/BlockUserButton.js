import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

import Block from '@material-ui/icons/Block';
import ThumbUp from '@material-ui/icons/ThumbUp';

import { USERS_QUERY } from './index';

const TOGGLE_BLOCK_USER_MUTATION = gql`
  mutation TOGGLE_BLOCK_USER_MUTATION($userId: Int!) {
    toggleBlockUser(userId: $userId) {
      message
    }
  }
`;

const BlockUserButton = ({ userId, isBlocked, classes, enqueueSnackbar }) => (
  <Mutation
    mutation={TOGGLE_BLOCK_USER_MUTATION}
    variables={{ userId }}
    refetchQueries={[{ query: USERS_QUERY }]}
    optimisticResponse={{ toggleBlockUser: {
      message: 'vladimir.demidyuk@gmail.com has been unblocked.',
      __typename: 'Message'
    }}}
  >
    {( toggleBlockUser, { loading }) => (
      <Button
        color="secondary"
        disabled={loading}
        onClick={async () => {
          let messageObj;
          try {
            messageObj = await toggleBlockUser();
          } catch(e) {
            console.log(e);
            return enqueueSnackbar(e.message, { variant: 'error' });
          }
          const message = messageObj && messageObj.data && messageObj.data.toggleBlockUser && messageObj.data.toggleBlockUser.message;
          if (message) {
            return enqueueSnackbar(message);
          }
          return enqueueSnackbar('Something didn\'t work out', { variant: 'error' });
        }}
      >
        {!isBlocked ? <Block className={classes.icon} /> : <ThumbUp className={classes.icon} />} 
      </Button>
    )}
  </Mutation>
);

BlockUserButton.propTypes = {
  userId: PropTypes.number.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(BlockUserButton);
/**
 *
 * MessageError
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';

const MessageError = props => (
  <div align="center" style={{ marginBottom: 10, marginTop: 10 }}>
    <Chip
      // color="primary"
      // color="secondary"
      // color="error"
      style={{ color: '#f44336' }}
      // key={i}
      label={props.error && props.error.message ? props.error.message.replace('GraphQL error:', '') : props.error || props.children}
      avatar={
        <Avatar >
          <ErrorIcon />
        </Avatar>
      }
    />
  </div>
);

MessageError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default MessageError;

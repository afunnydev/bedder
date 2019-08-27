/**
 *
 * MessageResult
 *
 */

import React from 'react';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';

/* eslint-disable react/prefer-stateless-function */
class MessageResult extends React.Component {
  render() {
    return (
      <Chip
        // color="primary"
        // color="secondary"
        label={this.props.message || this.props.children}
        avatar={
          <Avatar>
            <DoneIcon />
          </Avatar>
        }
      />
    );
  }
}

MessageResult.propTypes = {};

export default MessageResult;

/**
 *
 * ErrorResult
 *
 */

import React from 'react';

import Typography from '@material-ui/core/Typography';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';

/* eslint-disable react/prefer-stateless-function */
class ErrorResult extends React.Component {
  render() {
    // console.log('error res', this.props.result);
    const avatar = this.props.plain ? null : (<Avatar >
      <ErrorIcon />
    </Avatar>);
    const chipStyle = {color: '#f44336'};
    return (
      <div align="center" style={{margin: 3}}>
        {this.props.result && this.props.result.errors && this.props.result.errors.length > 0 && (
          this.props.result.errors.map((v,i) => {
            // console.log('errrr', v, i)
            return (
              <Chip
                // color="primary"
                // color="secondary"
                // color="error"
                style={chipStyle}
                key={i}
                label={v}
                avatar={avatar}
              />
              // <Typography key={i} color="error">{v}</Typography>
            )
          })
        )}
        {this.props.result && this.props.result.error && this.props.result.error.code && this.props.result.error.code == 1001 && (
          Object.keys(this.props.result.error.error).map((v,i) => {
            console.log("V", v);
            console.log(this.props.result.error.error[v][0]);
            return (
              <Chip
            // color="primary"
            // color="secondary"
            // color="error"
            style={chipStyle}
            key={i}
            label={this.props.result.error.error[v][0]}
            avatar={
              <Avatar >
                <ErrorIcon />
              </Avatar>
            }
          />
            )

          })
        // <Typography key={i} color="error">{v}</Typography>
        )}
        {this.props.result && this.props.result.error && !this.props.result.error.code && this.props.result.error.error && (


              <Chip
                // color="primary"
                // color="secondary"
                // color="error"
                style={chipStyle}
                // key={i}
                label={this.props.result.error.error}
                avatar={avatar}
              />
              // <Typography key={i} color="error">{v}</Typography>
        )}
      </div>
    );
  }
}

ErrorResult.propTypes = {};

export default ErrorResult;

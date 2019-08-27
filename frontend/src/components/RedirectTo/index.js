/**
 *
 * RedirectTo
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class RedirectTo extends React.Component {

  constructor(props) {
    super(props);
    this.doRedirect = this.doRedirect.bind(this);

    // console.log('RedirectTo props', this.props);
    var doRedirect = true;

    if(this.props.delay > 0) {
      doRedirect = false;
      setTimeout(this.doRedirect, this.props.delay);
    }

    this.state = {doRedirect: doRedirect};

    
  }

  doRedirect() {
    this.setState({doRedirect: true});
  }

  render() {
    return (
      this.state.doRedirect && (<Redirect push={this.props.push || false} rerender={this.state.doRedirect} to={this.props.to} />)
    );
  }
}

RedirectTo.propTypes = {};

export default RedirectTo;

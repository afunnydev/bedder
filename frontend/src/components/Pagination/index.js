/**
 *
 * Pagination
 *
 */

import React from 'react';
import { Button } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class Pagination extends React.Component {

  constructor(props){
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage = page => () => {
    // console.log('page', page, this)
    this.props.changePageFn(page);
  }

  render() {
    const pages = Math.ceil(this.props.numItems / this.props.pp);
    return (
      <div style={{margin: '15px 15px'}}>
        {[...Array(pages)].map((v,i) => {
          let page = i+1;
          return (
          <Button
            key={i}
            style={{margin: 5}}
            variant="contained"
            color={this.props.currentPage == page ? 'primary' : 'default'}
            onClick={this.changePage(page)}
            >
            {page}
          </Button>
            );
        })}
      </div>
      );
  }
}

Pagination.propTypes = {};

export default Pagination;

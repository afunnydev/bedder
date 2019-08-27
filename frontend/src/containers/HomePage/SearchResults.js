import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import BusinessItem from 'components/BusinessItem';

const styles = () => ({
  gridList: {
    marginLeft: '15px !important',
  },
  gridListMobile: {
    padding: '0px 15px',
    overflowY: 'visible',
  },
  gridListMap: {
    marginLeft: '5px !important',
    marginRight: '5px !important',
  },
  gridListTile: {
    // overflow: 'visible',
    margin: 0,
  },
});

const SearchResults = props => {
  const { classes } = props;
  const isMobile = props.width === 'xs' || props.width === 'sm';
  let gridListStyle = props.isMapView ? classes.gridListMap : classes.gridList;
  gridListStyle = isMobile ? classes.gridListMobile : gridListStyle;
  
  return (
    <React.Fragment>
      <GridList
        style={isMobile ? { marginLeft: '0px !important' } : { margin: 0 }}
        cols={props.isMapView || props.width === 'xs' ? 1 : 2}
        cellHeight="auto"
        spacing={20}
        classes={{ root: gridListStyle }}
      >
        {props.results.map((row, i) => (
          <GridListTile
            key={i}
            cols={1}
            classes={{ tile: classes.gridListTile }}
            style={{ padding: 0 }}
          >
            <BusinessItem days={props.days} value={{ ...row }} />
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  );
};

SearchResults.propTypes = {
  days: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,
  isMapView: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withMobileDialog(),
)(SearchResults);

/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import BtnBgImage from './mapButtonBackground.png';

import FilterBy from './FilterBy';
import SortBy from './SortBy';

const styles = theme => ({
  container: {
    padding: '0 35px',
    backgroundColor: 'transparent',
  },
  iconLocation: {
    fontSize: 16,
  },
  mapButton: {
    margin: 'auto',
    width: '100%',
    padding: '5px 40px',
    backgroundImage: `url(${BtnBgImage})`,
    backgroundPosition: 'center',
    backgroundSize: '105%',
    color: theme.palette.primary.main,
    fontSize: 11,
    backgroundColor: 'initial',
  },
  mapButtonActive: {
    // when map is shown
    backgroundImage: 'none',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  filterByButton: {
    borderRadius: 0,
    fontSize: 11,
    width: '50%',
    backgroundColor: '#fff',
    color: '#000',
    '&:hover': {
      backgroundColor: '#fff',
      // color: '#fff',
    },
    // boxShadow: 'none',
  },
  filterByButtonActive: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      // color: '#fff',
    },
  },
});

// const SomeButton = () => withStyles(styles)();

const Filter = props => (
  <React.Fragment>
    <Paper
      className={props.classes.container}
      elevation={0}
      square
      style={{ width: '100%' }}
    >
      {/* <div align="center">
        <Button
          className={
            props.isMapView
              ? props.classes.mapButton + ' ' + props.classes.mapButtonActive
              : props.classes.mapButton
          }
          variant="contained"
          onClick={props.mapViewToggle}
          color="primary"
        >
          <LocationOnIcon className={props.classes.iconLocation} />
          {props.isMapView ? 'Grid' : 'Map'} view
        </Button>
      </div> */}

      <div align="center" style={{ marginTop: 5 }}>
        <Button
          className={
            props.isFilterByActive
              ? `${props.classes.filterByButton} ${props.classes.filterByButtonActive}`
              : props.classes.filterByButton
          }
          variant="contained"
          // onClick={props.mapViewToggle}
          color="primary"
          onClick={props.handleFilterByActive}
        >
          Filter by
        </Button>
        <Button
          className={
            props.isFilterByActive
              ? props.classes.filterByButton
              : `${props.classes.filterByButton} ${props.classes.filterByButtonActive}`
          }
          variant="contained"
          // onClick={props.mapViewToggle}
          color="primary"
          onClick={props.handleSortByActive}
        >
          Sort by
        </Button>
      </div>
      {props.isFilterByActive ? (
        <FilterBy
          onChangeFilterPrice={props.onChangeFilterPrice}
          filterPrice={props.filterPrice}
          onChangeFilter1Star={props.onChangeFilter1Star}
          onChangeFilter2Star={props.onChangeFilter2Star}
          onChangeFilter3Star={props.onChangeFilter3Star}
          onChangeFilter4Star={props.onChangeFilter4Star}
          onChangeFilter5Star={props.onChangeFilter5Star}
          filter1Star={props.filter1Star}
          filter2Star={props.filter2Star}
          filter3Star={props.filter3Star}
          filter4Star={props.filter4Star}
          filter5Star={props.filter5Star}
          filterTypes={props.filterTypes}
          onChangeFilterTypes={props.onChangeFilterTypes}
          isMobile
        />
      ) : (
        <SortBy
          sortBy={props.sortBy}
          onChangeSortBy={props.onChangeSortBy}
        />
      )}
    </Paper>
  </React.Fragment>
);

Filter.propTypes = {};

export default withStyles(styles)(Filter);

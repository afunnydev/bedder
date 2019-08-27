import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { geocodeBySuggestion } from 'mui-places-autocomplete';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Collapse from '@material-ui/core/Collapse';
import Tune from '@material-ui/icons/Tune';
import CircularProgress from '@material-ui/core/CircularProgress';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectFrom,
  makeSelectTo,
  makeSelectLat,
  makeSelectLon,
  makeSelectLocation,
  makeSelectNumBed,
  makeSelectNumPeople,
} from '../../components/SearchBar/SearchBarRedux/selectors';

import {
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectIsMapView,
  makeSelectGridConfig,
  makeSelectIsFilterByActive,
  makeSelectFilterPriceFrom,
  makeSelectFilterPriceTo,
  makeSelectFilterPrice,
  makeSelectFilter1Star,
  makeSelectFilter2Star,
  makeSelectFilter3Star,
  makeSelectFilter4Star,
  makeSelectFilter5Star,
  makeSelectFilterTypes,
  makeSelectSortBy,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changeFromAction,
  changeLocationAction,
  changeNumBedAction,
  changeNumPeopleAction,
  changeToAction,
  submitAction,
  changeLatAction,
  changeLonAction,
  setGridViewAction,
  setMapViewAction,
  setFilterByActiveAction,
  setSortByActiveAction,
  changeFilterPriceAction,
  homepageInitAction,
  changeFilter1StarAction,
  changeFilter2StarAction,
  changeFilter3StarAction,
  changeFilter4StarAction,
  changeFilter5StarAction,
  changeFilterTypesAction,
  changeSortByAction,
} from './actions';

import SearchResults from './SearchResults';
import Filter from './Filter';
import FilterMobile from './FilterMobile';
import Map from './Map';

import BtnBgImage from './mapButtonBackground.png';
import BgImage from './desktop_ban.jpg';

import ErrorNetwork from '../../components/ErrorNetwork';
import ErrorResult from '../../components/ErrorResult';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar/Loadable';


const styles = theme => ({
  headerImageContainer: {
    height: 'calc(100vh - 300px)',
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0,0,0, 0.25)',
    backgroundBlendMode: 'overlay',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 40,
    transition: 'all linear .2s',
  },
  headerImageContainerMobile: {
    height: 'calc(100vh - 100px)',
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0,0,0, 0.25)',
    backgroundBlendMode: 'overlay',
    color: '#fff',
    textAlign: 'center',
    paddingTop: 40,
    transition: 'all linear .2s',
  },
  mobileMapBtn: {
    backgroundImage: `url(${BtnBgImage})`,
    padding: '10px 0px',
    backgroundPosition: -20,
    textAlign: 'center',
    color: theme.palette.primary.main,
    // fontSize: 18,
  },
  mobileMapBtnMap: {
    padding: '10px 0px',
    // backgroundPosition: -20,
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  headerImageContainerCollapsed: {
    // height: 350,
    backgroundPosition: '0px -300px',
  },
  searchBar: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%);',
  },
  searchBarCollapsed: {
    position: 'relative',
    top: '-40px',
  },
  displayNone: {
    display: 'none',
  },
  map: {},
  coverIt: {
    opacity: 0.5,
  },
});

const StyledResultMessage = props => (
  <Typography align="center" variant="subtitle1">
    {props.children}
  </Typography>
);

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      isMobileCollapsed: true,
      isFiltersCollapsed: true,
      isMapCollapsed: true,
      isStart: true,
      doSearch: false,
      searchChangeCounter: 0,
      isWaitingForSearch: true,
    };

    this.mapViewToggle = this.mapViewToggle.bind(this);
    this.changePage = this.changePage.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.showMobileFilters = this.showMobileFilters.bind(this);
    this.showMobileMap = this.showMobileMap.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.showResults = this.showResults.bind(this);
    this.searchTermsChange = this.searchTermsChange.bind(this);
    this.didSearch = this.didSearch.bind(this);

    this.searchBarRef = React.createRef();

    this.changeTimeout = null;
  }

  didSearch() {
    this.setState({ doSearch: false });
  }

  doSearch() {
    this.setState({ doSearch: true });
  }

  searchCallback() {
    this.setState({
      isMobileCollapsed: false,
      isFiltersCollapsed: true,
      isMapCollapsed: true,
      isStart: false,
    });
  }

  showMobileFilters() {
    this.setState({
      isMobileCollapsed: true,
      isFiltersCollapsed: false,
      isMapCollapsed: true,
      isStart: false,
    });
  }

  showMobileMap() {
    this.setState({
      // isMobileCollapsed: true,
      // isFiltersCollapsed: true,
      isMapCollapsed: !this.state.isMapCollapsed,
      isStart: false,
    });
  }

  showResults() {
    this.setState({
      isMobileCollapsed: false,
      isFiltersCollapsed: true,
      isMapCollapsed: true,
      isStart: false,
    });
  }

  submitSearch() {
    // this.props.dispatch(handleSubmitAction());
  }

  changePage(page) {
    // console.log('homepage page ', page);
    this.setState({ page });
    this.props.dispatch(submitAction(page));
  }

  mapViewToggle() {
    if (this.props.isMapView) {
      this.props.dispatch(setGridViewAction());
    } else {
      this.props.dispatch(setMapViewAction());
    }
  }

  componentWillMount() {
    this.props.dispatch(homepageInitAction());
  }

  searchTermsChange() {
    if (
      this.props.width !== 'xs' &&
      this.props.width !== 'sm' &&
      this.state.searchChangeCounter > 0
    ) {
      this.doSearch();
    }

    this.setState({
      searchChangeCounter: this.state.searchChangeCounter + 1,
      isWaitingForSearch: false,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filterPrice !== this.props.filterPrice ||
      prevProps.filter1Star !== this.props.filter1Star ||
      prevProps.filter2Star !== this.props.filter2Star ||
      prevProps.filter3Star !== this.props.filter3Star ||
      prevProps.filter4Star !== this.props.filter4Star ||
      prevProps.filter5Star !== this.props.filter5Star ||
      prevProps.filterTypes !== this.props.filterTypes ||
      prevProps.sortBy !== this.props.sortBy
    ) {
      // this.setState({ isWaitingForSearch: true });
      clearTimeout(this.changeTimeout);
      this.changeTimeout = setTimeout(this.searchTermsChange, 400);
    }
  }

  render() {
    const { classes, gridConfig, filterTypes, ...restProps } = this.props;
    // const gridConfigJS = gridConfig.toJS();
    // console.log('props', this.props, gridConfig.toJS().body);
    // console.log('props homepage', this.props);
    // console.log('state homepage', this.state);
    // console.log('this.this.searchBarRef', this.searchBarRef);
    const pureStart =
      !this.props.submitResult &&
      !this.props.submitError &&
      !this.props.submitting;
    const headerImgClasses = pureStart
      ? classes.headerImageContainer
      : `${classes.headerImageContainer} ${classes.headerImageContainerCollapsed}`;
    const searchBarClasses = pureStart
      ? classes.searchBar
      : classes.searchBarCollapsed;
    // const headerImgClasses = classes.headerImageContainer;

    return (
      <React.Fragment>
        <Helmet>
          <title>Find your next accomodation</title>
        </Helmet>
        <Grid
          container
          spacing={0}
        >
          <React.Fragment>
            {this.state.isMapCollapsed || (
              <Hidden mdUp>
                <Grid
                  container
                  item
                  xs={12}
                  style={{ position: 'absolute', height: '100%' }}
                >
                  <Map
                    result={this.props.submitResult}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lon }}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={
                      <div style={{ height: '100%', width: '100%' }} />
                    }
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </Grid>
              </Hidden>
            )}

            {this.state.isFiltersCollapsed || (
              <Hidden mdUp>
                <React.Fragment>

                  <SearchBar submitting={this.props.submitting} displayFormOnly/>


                  {/* 
                    There is a bug with the slider in the filters,
                    at load time, the slider has a -2% left margin
                  */}
                  <FilterMobile
                    mapViewToggle={this.mapViewToggle}
                    isMapView={this.props.isMapView}
                    isFilterByActive={this.props.isFilterByActive}
                    handleFilterByActive={this.props.handleFilterByActive}
                    handleSortByActive={this.props.handleSortByActive}
                    onChangeFilterPrice={this.props.onChangeFilterPrice}
                    filterPrice={this.props.filterPrice}
                    onChangeFilter1Star={this.props.onChangeFilter1Star}
                    onChangeFilter2Star={this.props.onChangeFilter2Star}
                    onChangeFilter3Star={this.props.onChangeFilter3Star}
                    onChangeFilter4Star={this.props.onChangeFilter4Star}
                    onChangeFilter5Star={this.props.onChangeFilter5Star}
                    filter1Star={this.props.filter1Star}
                    filter2Star={this.props.filter2Star}
                    filter3Star={this.props.filter3Star}
                    filter4Star={this.props.filter4Star}
                    filter5Star={this.props.filter5Star}
                    filterTypes={this.props.filterTypes}
                    onChangeFilterTypes={this.props.onChangeFilterTypes}
                    sortBy={this.props.sortBy}
                    onChangeSortBy={this.props.onChangeSortBy}
                  />

                  <Grid container>
                    <Grid item xs={12} onClick={this.showResults}>
                      <SearchBar submitting={this.props.submitting} displayButtonOnly/>
                    </Grid>
                  </Grid>


                </React.Fragment>
              </Hidden>
            )}
            {this.state.isMobileCollapsed || (
              <Hidden mdUp>
                <React.Fragment>
                  <Grid
                    item
                    sm={10}
                    xs={9}
                    style={{ padding: 15, paddingRight: 0, zIndex: 10 }}
                  >
                    <Paper
                      style={{ padding: 10 }}
                      onClick={this.showMobileFilters}
                    >
                      <TextField
                        fullWidth
                        value={this.props.location}
                        inputProps={{
                          style: {
                            fontSize: 20,
                            paddingTop: 8,
                            paddingLeft: 10,
                          },
                          disableUnderline: true,

                          startAdornment: (
                            <InputAdornment
                              position="start"
                              style={{ paddingTop: '8px' }}
                            >
                              <Tune color="primary" style={{ fontSize: 26 }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item sm={2} xs={3} style={{ padding: 15, zIndex: 10 }}>
                    <Paper
                      className={
                        this.state.isMapCollapsed
                          ? classes.mobileMapBtn
                          : classes.mobileMapBtnMap
                      }
                      onClick={this.showMobileMap}
                    >
                      {this.state.isMapCollapsed ? (
                        <span className="icon-map" style={{ fontSize: 26 }} />
                      ) : (
                        <span className="icon-ads" style={{ fontSize: 26 }} />
                      )}
                    </Paper>
                  </Grid>
                </React.Fragment>
              </Hidden>
            )}

            {this.state.isStart && (
              <Hidden mdUp>
                <Grid item md={12}>
                  <Grid container justify="center">
                    <Grid
                      item
                      xs={12}
                      className={classes.headerImageContainerMobile}
                    >
                      <Typography variant="h1" color="inherit">
                        Let's find a perfect hotel
                      </Typography>
                      {/* <Typography variant="subheading" color="inherit">
                        We have exclusivity among the thousands of hotels
                      </Typography> */}

                      <SearchBar
                        submitting={this.props.submitting}
                        searchCallback={this.searchCallback}
                      />

                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            )}

            <Hidden smDown>
              <Grid item md={12}>
                <Grid
                  container
                  justify="center"
                  style={{ marginBottom: '-1em', position: 'relative' }}
                >
                  <Collapse
                    style={{ width: '100%' }}
                    collapsedHeight="360px"
                    in={pureStart}
                  >
                    <Grid item xs={12} className={headerImgClasses}>
                      <Typography variant="h1" color="inherit">
                        Let's find a perfect hotel
                      </Typography>
                      <Typography variant="h4" color="inherit">
                        We have exclusivity among the thousands of hotels
                      </Typography>
                    </Grid>
                  </Collapse>
                  <Grid item xs={10} className={searchBarClasses}>
                    <SearchBar
                      submitting={this.props.submitting}
                      isHome
                      didSearch={this.didSearch}
                      doSearch={this.state.doSearch}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            {pureStart || (
              <React.Fragment>
                {/* //////////////// PURE START */}

                <Hidden smDown>
                  <Grid item md={3}>
                    <Filter
                      isWaitingForSearch={this.state.isWaitingForSearch}
                      mapViewToggle={this.mapViewToggle}
                      isMapView={this.props.isMapView}
                      isFilterByActive={this.props.isFilterByActive}
                      handleFilterByActive={this.props.handleFilterByActive}
                      handleSortByActive={this.props.handleSortByActive}
                      onChangeFilterPrice={this.props.onChangeFilterPrice}
                      filterPrice={this.props.filterPrice}
                      onChangeFilter1Star={this.props.onChangeFilter1Star}
                      onChangeFilter2Star={this.props.onChangeFilter2Star}
                      onChangeFilter3Star={this.props.onChangeFilter3Star}
                      onChangeFilter4Star={this.props.onChangeFilter4Star}
                      onChangeFilter5Star={this.props.onChangeFilter5Star}
                      filter1Star={this.props.filter1Star}
                      filter2Star={this.props.filter2Star}
                      filter3Star={this.props.filter3Star}
                      filter4Star={this.props.filter4Star}
                      filter5Star={this.props.filter5Star}
                      filterTypes={this.props.filterTypes}
                      onChangeFilterTypes={this.props.onChangeFilterTypes}
                      sortBy={this.props.sortBy}
                      onChangeSortBy={this.props.onChangeSortBy}
                    />
                  </Grid>
                </Hidden>

                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={this.props.isMapView ? 4 : 8}
                  className={
                    this.props.submitting ? classes.coverIt : 'falseClasssss'
                  }
                >
                  <ErrorNetwork error={this.props.submitError} />
                  <ErrorResult result={this.props.submitResult} />

                  {this.props.submitResult &&
                    this.props.submitResult.result &&
                    this.props.submitResult.result.length === 0 && (
                    <StyledResultMessage>No results.</StyledResultMessage>
                  )}

                  {!this.props.submitResult &&
                    !this.props.submitError &&
                    !this.props.submitting && <div>make search!</div>}

                  {this.props.submitResult &&
                    this.props.submitResult.error &&
                    this.props.submitResult.error.code &&
                    this.props.submitResult.error.code == 1001 &&
                    !this.props.submitting && <div> form errors!</div>}

                  {!this.props.submitResult &&
                    !this.props.submitError &&
                    this.props.submitting && (
                    <div align="center">
                      <CircularProgress />
                    </div>
                  )}

                  {this.props.submitResult &&
                    this.state.isMapCollapsed &&
                    this.props.submitResult.result &&
                    this.props.submitResult.result.length > 0 && (
                    <div style={{ padding: 10, paddingTop: 0 }}>
                      <SearchResults
                        days={this.props.submitResult.days}
                        results={this.props.submitResult.result}
                        isMapView={this.props.isMapView}
                      />
                      <Pagination
                        pp={10}
                        currentPage={this.state.page}
                        changePageFn={this.changePage}
                        numItems={this.props.submitResult.count}
                      />
                    </div>
                  )}
                </Grid>

                <Grid
                  item
                  md={4}
                  className={
                    this.props.isMapView ? classes.map : classes.displayNone
                  }
                >
                  <Map
                    result={this.props.submitResult}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lon }}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={
                      <div style={{ height: '400px', width: '100%' }} />
                    }
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </Grid>

              </React.Fragment>
            )}
          </React.Fragment>
        </Grid>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  from: makeSelectFrom(),
  to: makeSelectTo(),
  lat: makeSelectLat(),
  lon: makeSelectLon(),
  maxPersons: makeSelectNumPeople(),
  numBed: makeSelectNumBed(),
  submitError: makeSelectSubmitError(),
  submitResult: makeSelectSubmitResult(),
  submitting: makeSelectSubmitting(),
  isMapView: makeSelectIsMapView(),
  gridConfig: makeSelectGridConfig(),
  isFilterByActive: makeSelectIsFilterByActive(),
  filterPrice: makeSelectFilterPrice(),
  filterPriceFrom: makeSelectFilterPriceFrom(),
  filterPriceTo: makeSelectFilterPriceTo(),
  filter1Star: makeSelectFilter1Star(),
  filter2Star: makeSelectFilter2Star(),
  filter3Star: makeSelectFilter3Star(),
  filter4Star: makeSelectFilter4Star(),
  filter5Star: makeSelectFilter5Star(),
  filterTypes: makeSelectFilterTypes(),
  sortBy: makeSelectSortBy(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    onChangeLocation: evt => dispatch(changeLocationAction(evt.target.value)),
    onChangeFrom: evt => dispatch(changeFromAction(evt.target.value)),
    onChangeTo: evt => dispatch(changeToAction(evt.target.value)),
    onChangeNumPeople: evt => dispatch(changeNumPeopleAction(evt.target.value)),
    onChangeNumBed: evt => dispatch(changeNumBedAction(evt.target.value)),

    handleSubmit: () => dispatch(submitAction()),

    handleFilterByActive: () => dispatch(setFilterByActiveAction()),
    handleSortByActive: () => dispatch(setSortByActiveAction()),

    onChangeFilterPrice: range => {
      dispatch(changeFilterPriceAction(range));
    },
    onChangeFilter1Star: () => dispatch(changeFilter1StarAction()),
    onChangeFilter2Star: () => dispatch(changeFilter2StarAction()),
    onChangeFilter3Star: () => dispatch(changeFilter3StarAction()),
    onChangeFilter4Star: () => dispatch(changeFilter4StarAction()),
    onChangeFilter5Star: () => dispatch(changeFilter5StarAction()),

    onChangeFilterTypes: evt => {
      dispatch(changeFilterTypesAction(evt));
    },

    onChangeSortBy: evt => {
      dispatch(changeSortByAction(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
  withMobileDialog(),
)(HomePage);

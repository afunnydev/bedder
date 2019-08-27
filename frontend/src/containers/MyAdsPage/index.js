import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Grid from '@material-ui/core/Grid';

import BedderLoadingIndicator from 'components/BedderLoadingIndicator';
import PageTitle from 'components/styles/PageTitle';

import reducer from './reducer';
import saga from './saga';
import { mapStateToProps, mapDispatchToProps } from './mapProps';
import BusinessItem from './BusinessItem';

const NbAccomodation = styled.p`
  font-size: 18px;
  line-height: 21px;
  font-weight: 500;
  font-style: italic;
  color: black;
`;

class MyAdsPage extends React.Component {
  componentDidMount() {
    this.props.submit();
  }

  render() {
    const { result } = this.props;
    let draftBusinesses = [];
    let liveBusinesses = [];
    if (result && result.draft && result.draft.length) {
      draftBusinesses = result.draft;
    } 
    if (result && result.live && result.live.length) {
      liveBusinesses = result.live;
    }
    return (
      <div style={{position: 'relative'}}>
        <Helmet>
          <title>My Accomodations</title>
        </Helmet>
        <PageTitle spaced>My Accomodations</PageTitle>

        {this.props.submitting 
          ? <BedderLoadingIndicator full />
          : (
            <Grid container alignItems="center" justify="center" style={{padding: '0px 15px'}}>
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <React.Fragment>
                  <NbAccomodation>{draftBusinesses.length} draft{draftBusinesses.length > 1 ? 's' : ''}</NbAccomodation>
                  {draftBusinesses.map(business => (
                    <BusinessItem key={business.id} business={business} />
                  ))}

                  <NbAccomodation>{liveBusinesses.length} accomodation{liveBusinesses.length > 1 ? 's' : ''} online</NbAccomodation>
                  {liveBusinesses.map(business => (
                    <BusinessItem key={business.id} business={business} />
                  ))}
                </React.Fragment>
              </Grid>
            </Grid>
          )
        }
      </div>
    );
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'myAdsPage', reducer });
const withSaga = injectSaga({ key: 'myAdsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyAdsPage);

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Rooms from './Rooms';

import SearchBar from 'components/SearchBar/Loadable';
import BusinessGeneralInfo from 'components/BusinessGeneralInfo';
import CoverPhotoSlider from 'components/CoverPhotoSlider';
import SupportTicket from 'components/SupportTicket';
import BusinessBadges from 'components/BusinessBadges';
import PaperWithText from 'components/PaperWithText';

const BUSINESS_VIEW_QUERY = gql`
  query BUSINESS_VIEW_QUERY($businessId: Int!) {
    business(businessId: $businessId) {
      id
      status
      name
      mood
      propertyType
      around
      opinionStrong
      opinionWeak
      howToFind
      activities
      amenities
      reviewsNum
      reviewsAvg
      address {
        id
        lat
        lon
        address
      }
      coverPhotos {
        id
        uuid
        url
      }
    }
  }
`;

const BusinessView = ({ match }) => {
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const openSupport = () => setSupportTicketOpen(true);
  const closeSupport = () => setSupportTicketOpen(false);

  return (
    <>
      <Helmet>
        <title>Edit Accomodation</title>
      </Helmet>
      <Grid container>
        <Query
          query={BUSINESS_VIEW_QUERY}
          variables={{
            businessId: parseInt(match.params.id)
          }}
          returnPartialData={true}
        >
          {({ data, loading, error }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading...</p>;
            if (!data || !data.business) return <p>No Business</p>;
            const { id, coverPhotos, activities, opinionStrong, opinionWeak, howToFind } = data.business;
            return <>
              <Hidden smDown><div style={{ width: '100%' }}><SearchBar /></div></Hidden>
              <SupportTicket open={supportTicketOpen} onClose={closeSupport} />
              <CoverPhotoSlider 
                photos={coverPhotos} 
                openSupport={openSupport} 
                roundedCorners={true}
              />
              <Grid container justify="center">
                <Grid item xs={12} md={10} style={{ padding: 20 }}>
                  <BusinessGeneralInfo 
                    {...data.business} 
                    openSupport={openSupport}
                    showReviews={true}
                  />
                  <Rooms businessId={id} />
                  <PaperWithText 
                    texts={[
                      {title: 'Description of the accommodation', text: activities },
                      {title: 'Highlights of the accommodation', text: opinionStrong},
                      {title: 'Weaknesses of the accommodation', text: opinionWeak},
                      {title: 'Directions to the accommodation', text: howToFind},
                    ]}
                    spaced={true}
                  />
                  <BusinessBadges openSupport={openSupport} />
                </Grid>
              </Grid>
            </>;
          }}
        </Query>
      </Grid>
    </>
  );
};

BusinessView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(BusinessView);

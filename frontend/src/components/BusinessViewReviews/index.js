import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MessageError from 'components/MessageError';
import ReviewItem from './ReviewItem.js';

const StyledPaper = styled(Paper)`
  padding: 25px;
`;

const BUSINESS_REVIEWS_QUERY = gql`
  query BUSINESS_REVIEWS_QUERY($businessId: Int!) {
    businessReviews(businessId: $businessId) {
      id
      body
      rating
      date {
        date
      }
      room {
        name
      }
    }
  }
`;

export default class BusinessViewReviews extends React.Component {
  static propTypes = {
    businessId: PropTypes.number.isRequired,
  };

  state = {
    nbShown: 3,
  }

  seeMore = () => this.setState({ nbShown: 9 })

  render() {
    const { businessId } = this.props;
    return (
      <StyledPaper>
        <Typography
          variant="h5"
        >
          Reviews
        </Typography>
        <Grid container spacing={2}>
          <Query
            query={BUSINESS_REVIEWS_QUERY}
            variables={{
              businessId,
            }}
          >
            {({ data, loading, error}) => {
              if (error) return <MessageError error={error} />;
              if (loading) return <Grid item xs={12}><p>Loading...</p></Grid>;
              if (!data || !data.businessReviews || !data.businessReviews.length) return <Grid item xs={12}><p>There&#39;s no review for this accommodation yet.</p></Grid>;
              const reviews = data.businessReviews.slice(0, this.state.nbShown);
              return (
                <React.Fragment>
                  {reviews.map(review => (
                    <ReviewItem body={review.body} date={review.date.date.split(' ')[0]} roomName={review.room.name} rating={review.rating} key={review.body} />
                  ))}
                  {data.businessReviews.length > 3 && this.state.nbShown < 4 && <Grid item xs={12}>
                    <button
                      style={{
                        fontFamily: 'Ubuntu', float: 'right', fontSize: '1rem', color: 'black', cursor: 'pointer', outline: 'none', background: 'none', border: 'none',
                      }}
                      onClick={this.seeMore}
                    >
                      See more reviews &gt;
                    </button>
                  </Grid>}
                </React.Fragment>
              );
            }}
          </Query>
        </Grid>
      </StyledPaper>
    );
  }
}

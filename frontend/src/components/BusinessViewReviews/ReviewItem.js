import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const ReviewGrid = styled(Grid)`
  span.rating {
    background-color: #8f3f3f;
    padding: 4px 10px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    color: white;
  }
  span.date {
    font-weight: 700;
    display: block;
    font-size: 12px;
  }
  span.room {
    display: block;
    font-size: 10px;
    font-style: italic;
  }
`;

const ReviewItem = ({ body, date, roomName, rating }) => (
  <ReviewGrid item xs={12} sm={6} md={4}>
    <p><span className="rating">{rating}</span>{body}</p>
    <span className="date">{date}</span>
    <span className="room">Stayed in {roomName}</span>
  </ReviewGrid>
);

ReviewItem.propTypes = {
  body: PropTypes.string,
  date: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default ReviewItem;
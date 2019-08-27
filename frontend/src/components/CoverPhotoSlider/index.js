import React from 'react';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { withStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';

const styles = {
  photo: {
    width: '100%',
    height: 'auto',
  },
  dotsOn: {
    width: '100%',
    marginBottom: 40,
    position: 'relative',
    '& .alice-carousel__wrapper': {
      boxShadow: '0px 3px 3px rgba(0,0,0,0.35)',
    },
    '& .alice-carousel__dots': {
      margin: '-40px 0 0',
      zIndex: 10,
      position: 'relative',
    },
    '& .alice-carousel__dots-item': {
      transition: '0.4s',
      width: 6,
      height: 6,
      backgroundColor: 'white',
    },
    '& .alice-carousel__dots-item:hover, .alice-carousel__dots-item.__active': {
      width: 10,
      height: 10,
      backgroundColor: 'white',
    }
  },
  roundedCornerSlider: {
    '& .alice-carousel__wrapper': {
      borderRadius: '6px',
      overflowX: 'hidden'
    }
  },
  mobileButton: {
    minWidth: '50px',
    maxWidth: '50px',
    height: 50,
    borderRadius: '0px',
    position: 'absolute',
    right: '20px',
    // There's already a space in the bottom.. I don't have time to debug, this works.
    bottom: '5px',
  },
};

const CoverPhotoSlider = ({ photos, classes, openSupport, roundedCorners }) => {
  const handleOnDragStart = e => e.preventDefault();
  const matches = useMediaQuery('(max-width: 960px)');
  return (
    // This div is only there to apply the class and custom styling. If you prefer another way, please do it.
    <div className={`${classes.dotsOn} ${roundedCorners && !matches ? classes.roundedCornerSlider : ''}`}>
      <AliceCarousel
        buttonsDisabled 
        mouseDragEnabled
      >
        {photos.map(photo => (
          // Here, we use the photo URL directly. However, with Uploadcare, we could make usage of their resize feature better and serve an image of the browser's size.
          <img key={photo.uuid} src={matches ? `https://ucarecdn.com/${photo.uuid}/-/scale_crop/500x400/center/`: photo.url} onDragStart={handleOnDragStart} className={classes.photo} />
        ))}
      </AliceCarousel>
      {matches && <Button
        onClick={openSupport}
        color="primary"
        variant="contained"
        classes={{ root: classes.mobileButton }}
      >
        <span className="icon-chat" />
      </Button>}
    </div>
  );
};

CoverPhotoSlider.defaultProps = {
  roundedCorners: false,
};

CoverPhotoSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
  openSupport: PropTypes.func.isRequired,
  roundedCorners: PropTypes.bool,
};

export default withStyles(styles)(CoverPhotoSlider);
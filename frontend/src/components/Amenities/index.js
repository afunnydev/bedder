import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import BedderConfig from 'bedder/bedderConfig';

const styles = theme => ({
  tooltip: {
    fontSize: 15,
  },
  btnRoot: {
    width: 56,
    height: 56,
    minWidth: 'initial',
    borderRadius: 3,
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  },
  btnContained: {
    backgroundColor: '#fff',
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  btnContainedOrange: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  btnContainedPrimary: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
});

const AmenitiesText = BedderConfig.getAmenitiesText();

const Amenities = ({ changeFn, amenities, classes, noClick, hideNotSelected, orange }) => {
  const containedClass = orange ? classes.btnContainedOrange : classes.btnContained;
  const containedPrimaryClass = hideNotSelected ? containedClass : classes.btnContainedPrimary;
  return (
    <React.Fragment>
      { amenities !== '' && amenities && AmenitiesText.map(amenity => {
        if (hideNotSelected && !amenities[amenity.key]) return null;
        return (
          <Tooltip key={amenity.key} classes={{ tooltip: classes.tooltip }} title={amenity.text}>
            <Button 
              classes={{ 
                root: classes.btnRoot, 
                contained: containedClass, 
                containedPrimary: containedPrimaryClass 
              }} 
              variant="contained" 
              style={{ margin: '4px 4px' }} 
              onClick={() => { if (!noClick) changeFn(amenity.key); }}
              color={amenities[amenity.key] ? 'primary' : 'default'}
              disableRipple={noClick}
            >
              <span className={`icon-${amenity.key}`} style={{ fontSize: 30 }} />
            </Button>
          </Tooltip>
        );
      })}
    </React.Fragment>
  );
};

Amenities.defaultProps = {
  noClick: false,
  hideNotSelected: false,
  orange: false,
};

Amenities.propTypes = {
  changeFn: PropTypes.func,
  amenities: PropTypes.object,
  classes: PropTypes.object.isRequired,
  noClick: PropTypes.bool,
  hideNotSelected: PropTypes.bool,
  orange: PropTypes.bool,
};

export default withStyles(styles)(Amenities);

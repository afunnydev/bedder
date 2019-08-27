import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import calculateProgress from 'utils/calculateProgress';

import RoomButtons from './RoomButtons.js';
import Room from './Room.js';
import ProgressTitle from './ProgressTitle.js';

const BusinessEditBedrooms = (props) => {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const progress = props.units && props.units.length
    ? calculateProgress([
      props.units[0].name, 
      props.units[0].numUnits, 
      props.units[0].maxPersons, 
      props.units[0].bedsKing || props.units[0].bedsQueen || props.units[0].bedsSimple, 
      props.units[0].rate,
      props.units[0].files && props.units[0].files.length
    ])
    : 0;
  return (
    <>
      <Grid container style={{ paddingTop: 50, paddingBottom: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Bedrooms" progress={progress} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RoomButtons
                {...props}
                activeRoomId={activeRoomId || 0}
                roomChosen={setActiveRoomId}
              />
            </Grid>
            <Grid item xs={12}>
              {props.units && props.units.length
                ? props.units.map(unit => (
                  <Room
                    key={unit.id}
                    unitId={unit.id}
                    client={props.client}
                    visible={unit.id === activeRoomId}
                  />
                ))
                : <Typography>Please select or create a room to start.</Typography>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

BusinessEditBedrooms.propTypes = {
  client: PropTypes.object.isRequired,
  units: PropTypes.array
};

export default BusinessEditBedrooms;

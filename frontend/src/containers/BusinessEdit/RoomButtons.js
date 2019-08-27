import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const styles = {
  btnRoot: {
    height: 56,
    minWidth: 'initial',
    borderRadius: 3,
    paddingRight: 30,
    paddingLeft: 30,
    margin: '4px 4px',
  },
  btnContained: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  },
  btnContainedPrimary: {
    color: '#fff',
    backgroundColor: '#4B3F8F',
    '&:hover': {
      backgroundColor: '#4B3F8F',
    },
  },
};

const RoomButtons = (props) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const addRoom = async () => {
    const NEW_ROOM_MUTATION = gql`
      mutation NEW_ROOM_MUTATION($businessId: Int!) {
        addNewRoom(businessId: $businessId) @client(always: true) {
          id
          name
          parentId
          numUnits
          bedsKing
          bedsQueen
          bedsSimple
          maxPersons
          equipment
          files {
            id
            uuid
            url
          }
          rate
          currency
          isDeleted
          isNew
          acceptAutomatically
        }
      }
    `;
    try {
      const res = await props.client.mutate({
        mutation: NEW_ROOM_MUTATION,
        variables: {
          businessId: props.id,
        }
      });
      props.roomChosen(res.data.addNewRoom.id);
    } catch (e) {
      console.log('ERROR WHILE CREATING', e);
    }
  };

  const removeRoom = async (roomId) => {
    const REMOVE_ROOM_MUTATION = gql`
      mutation REMOVE_ROOM_MUTATION($businessId: Int!, $roomId: Int!) {
        removeRoom(businessId: $businessId, roomId: $roomId) @client(always: true) 
      }
    `;
    try {
      await props.client.mutate({
        mutation: REMOVE_ROOM_MUTATION,
        variables: {
          businessId: props.id,
          roomId
        }
      });
    } catch(e) {
      console.log(e);
    }
    setConfirmModalOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={confirmModalOpen}
      >
        <DialogContent>
          Are you sure you want to remove current room?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={async () => await removeRoom(props.activeRoomId)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {props.units && props.units.length 
        ? props.units.map(room => {
          return (
            <Button
              key={room.id}
              variant="contained"
              onClick={() => props.roomChosen(room.id)}
              classes={{ root: props.classes.btnRoot, contained: props.classes.btnContained, containedPrimary: props.classes.btnContainedPrimary }}
              color={room.id == props.activeRoomId ? 'primary' : 'default'}
            >
              {room.name}
            </Button>
          );
        })
        : <Button disabled>Create your first room now</Button>
      }
      <Button
        variant="contained"
        onClick={addRoom}
        style={{ 
          minWidth: 'auto', 
          margin: '0px 4px',
          height: 56,
          backgroundColor: 'white'
        }}
      >
        <AddIcon />
      </Button>
      {props.units && props.units.length 
        ? <Button
          variant="contained"
          onClick={() => setConfirmModalOpen(true)}
          style={{ 
            minWidth: 'auto', 
            margin: '0px 4px',
            height: 56,
            backgroundColor: 'white'
          }}
        >
          <RemoveIcon />
        </Button>
        : null
      }
    </React.Fragment>
  );
};

RoomButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  units: PropTypes.array,
  activeRoomId: PropTypes.number,
  roomChosen: PropTypes.func.isRequired,
};

export default withStyles(styles)(RoomButtons);

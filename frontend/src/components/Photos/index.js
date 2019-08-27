import React from 'react';
import PropTypes from 'prop-types';
import uploadcare from 'uploadcare-widget';
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import AddIcon from '@material-ui/icons/LibraryAdd';
import Clear from '@material-ui/icons/Clear';

import photosStyles from './photosStyles';

const Photos = ({ classes, photos, crop, shrink, id, client, addMutation, removeMutation, label, error, errorText }) => {
  const openUploadcare = () => {
    uploadcare.openDialog(null, {
      crop,
      imagesOnly: true,
      imageShrink: shrink
    }).done((file) => {
      file.promise().done(async (fileInfo) => {
        console.log("FILE INFO", fileInfo);
        await addPhotoApollo(fileInfo);
      });
    }).catch(err => {
      console.log('Err', err);
    });
  };

  const addPhotoApollo = async (fileInfo) => {
    const ADD_PHOTO_MUTATION = gql`
      mutation ADD_PHOTO_MUTATION($modelId: Int!, $uuid: String!, $url: String!) {
        ${addMutation}(modelId: $modelId, uuid: $uuid, url: $url) @client(always: true) {
          uuid
        }
      }
    `;
    await client.mutate({
      mutation: ADD_PHOTO_MUTATION,
      variables: {
        modelId: id,
        uuid: fileInfo.uuid,
        url: fileInfo.cdnUrl,
      }
    });
  };

  const removePhotoApollo = async (index) => {
    const REMOVE_PHOTO_MUTATION = gql`
      mutation REMOVE_PHOTO_MUTATION($modelId: Int!, $index: Int!) {
        ${removeMutation}(modelId: $modelId, index: $index) @client(always: true)
      }
    `;
    await client.mutate({
      mutation: REMOVE_PHOTO_MUTATION,
      variables: {
        modelId: id,
        index,
      }
    });
  };

  return (
    <>
      <InputLabel shrink style={{ marginBottom: 10 }} error={error}>
        {label}
      </InputLabel>
      {photos && photos.length
        ? photos.map((photo, i) => {
          const thumbImgStyle = {
            backgroundImage: `url(${photo.url})`,
          };
          return (
            <Badge
              key={photo.id}
              badgeContent={<Clear classes={{ root: classes.icon }}/>}
              color="primary"
              onClick={async evt => {
                evt.stopPropagation();
                await removePhotoApollo(i);
              }}
              classes={{ badge: classes.badge, colorPrimary: classes.badgeColor }}
            >
              <Button
                variant="contained"
                classes={{ root: classes.thumb }}
                style={thumbImgStyle}
                disableRipple
                disableFocusRipple
              >
                &nbsp;
              </Button>
            </Badge>
          );
        })
        : null
      }
      <Button
        variant="contained"
        onClick={openUploadcare}
        classes={{ root: classes.addButton }}
      >
        <AddIcon />
      </Button>
      {error && <FormHelperText error style={{ marginTop: 15 }}>{errorText}</FormHelperText>}
    </>
  );
};

Photos.defaultProps = {
  shrink: '600x600 90%',
  crop: '1:1',
  label: 'Photos',
  errorText: 'You need at least 1 image.'
};

Photos.propTypes = {
  classes: PropTypes.object.isRequired,
  // photos is not required because a new user or business has undefined
  photos: PropTypes.array,
  addMutation: PropTypes.string.isRequired,
  removeMutation: PropTypes.string.isRequired,
  shrink: PropTypes.string,
  crop: PropTypes.string,
  id: PropTypes.number,
  client: PropTypes.object,
  label: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string
};

export default withStyles(photosStyles)(Photos);
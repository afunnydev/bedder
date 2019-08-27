import React from 'react';
import PropTypes from 'prop-types';
import { Validation } from 'react-validation-framework';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import BedderValidator from 'bedder/bedderValidator';

import Photos from 'components/Photos';
import ProgressTitle from './ProgressTitle';

const BusinessEditGeneralInformationMore = (props) => {
  const onChange = (event) => props.client.writeData(
    { id: `Business:${props.id}`, data: { [event.target.name]: event.target.value } }
  );

  const calculateProgress = (fields) => {
    if (!fields.length) return 0;
    let needed = 0;
    let completed = 0;
    for (let i = 0; i < fields.length; i++) {
      needed += 100;
      if (fields[i]) {
        if (fields[i] === true) {
          completed += 100;
        } else {
          completed += fields[i].length <= 100 ? fields[i].length : 100;
        }
      }
    }
    return Math.round(completed/needed * 100);
  };
  const vs = BedderValidator.getValidators();

  return(
    <React.Fragment>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Tell us more" progress={calculateProgress([props.activities, props.around, props.coverPhotos && props.coverPhotos.length > 0])} />
        </Grid>
   
        <Grid item xs={12} md={6}>
          <Validation
            group="generalInformation"
            componentTag="TextField"
            validators={[vs.notEmpty]}
          >
            <TextField
              name="activities"
              label="Describe this business"
              multiline
              fullWidth
              rows={4}
              defaultValue={props.activities || ''}
              onBlur={onChange}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 30 }}
            />
          </Validation>
          <Validation
            group="generalInformation"
            componentTag="TextField"
            validators={[vs.notEmpty]}
          >
            <TextField
              name="around"
              label="Describe the surroundings"
              multiline
              fullWidth
              rows={4}
              defaultValue={props.around || ''}
              onBlur={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Validation>
        </Grid>
        <Grid item xs={12} md={3}>
          <Validation
            group="generalInformation"
            valueProp="photos"
            onChangeCallback={null}
            componentTag="Photos"
            validators={[vs.arrayNotEmpty]}
          >
            <Photos
              id={props.id}
              photos={props.coverPhotos}
              client={props.client}
              addMutation="addFileToBusiness"
              removeMutation="removeFileFromBusiness"
              crop="1920x705 minimum"
              shrink="1920x705 90%"
              label="Cover Photos*"
              errorText="You need at least 1 cover photo."
            />
          </Validation>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Your opinion" progress={calculateProgress([props.opinionStrong, props.opinionWeak])} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Validation
            group="generalInformation"
            componentTag="TextField"
            validators={[vs.notEmpty]}
          >
            <TextField
              name="opinionStrong"
              label="Strongest points"
              multiline
              fullWidth
              rows={4}
              defaultValue={props.opinionStrong || ''}
              onBlur={onChange}
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginBottom: 30 }}
            />
          </Validation>
          <Validation
            group="generalInformation"
            componentTag="TextField"
            validators={[vs.notEmpty]}
          >
            <TextField
              name="opinionWeak"
              label="Weakest points"
              multiline
              fullWidth
              rows={4}
              defaultValue={props.opinionWeak || ''}
              onBlur={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Validation>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Directions" progress={calculateProgress([props.howToFind])} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Validation
            group="generalInformation"
            componentTag="TextField"
            validators={[vs.notEmpty]}
          >
            <TextField
              name="howToFind"
              label="How can people find this business?"
              multiline
              fullWidth
              rows={4}
              defaultValue={props.howToFind || ''}
              onBlur={onChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Validation>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

BusinessEditGeneralInformationMore.propTypes = {
  id: PropTypes.number.isRequired,
  activities: PropTypes.string,
  around: PropTypes.string,
  opinionStrong: PropTypes.string,
  opinionWeak: PropTypes.string,
  howToFind: PropTypes.string,
  coverPhotos: PropTypes.array,
  client: PropTypes.object.isRequired,
};

export default BusinessEditGeneralInformationMore;

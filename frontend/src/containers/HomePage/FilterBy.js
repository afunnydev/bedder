/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StarIcon from '@material-ui/icons/Star';

import { Slider } from 'material-ui-slider';

const styles = () => ({
  starButton: {
    minWidth: 'auto',
    width: 35,
    margin: 'auto 5px',
  },
  starIcon: {
    fontSize: 14,
  },
  typeButton: {
    margin: '3px 5px',
    fontSize: 11,
    minWidth: 'auto',
    minHeight: 'auto',
    padding: '10px 10px',
  },
});

// const SomeButton = () => withStyles(styles)();

class FilterBy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterPrice: this.props.filterPrice,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    this.setState({ filterPrice: val });
  };

  onChangeComplete = val => {
    this.props.onChangeFilterPrice(val);
  };

  render() {
    const { classes, filterPrice, filterTypes } = this.props;
    // console.log('PROPS', this.props);

    const TypesButtons = filterTypes.map(
      (row, i) => (
        <Button
          key={row.id}
          color={row.isActive ? 'primary' : 'default'}
          onClick={this.props.onChangeFilterTypes.bind(this, i)}
          variant="contained"
          className={classes.typeButton}
        >
          {row.value}
        </Button>
      ),
      this,
    );

    return (
      <React.Fragment>
        <Typography
          variant="caption"
          style={{
            marginTop: this.props.isMobile ? 10 : 30,
            color: 'black',
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          Price
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body1">
              {this.state.filterPrice[0]} USD
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Typography variant="body1">
              {this.state.filterPrice[1]} USD+
            </Typography>
          </Grid>
        </Grid>
        <div style={{ marginLeft: 5, marginRight: 5 }}>
          <Slider
            onChange={this.onChange}
            onChangeComplete={this.onChangeComplete}
            min={0}
            max={300}
            range
          />
        </div>

        <Typography
          variant="caption"
          style={{
            marginTop: 30,
            color: 'black',
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          Establishment type
        </Typography>

        <div align="justify" style={{ marginTop: 10, marginLeft: -5 }}>
          {TypesButtons}
        </div>
      </React.Fragment>
    );
  }
}

FilterBy.propTypes = {};

export default withStyles(styles)(FilterBy);

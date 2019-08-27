import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const style = {
  root: {
    fontSize: 14,
  },
};

const ShrinkedInputLabel = ({ classes, children }) => <InputLabel classes={{ root: classes.root }}>{children}</InputLabel>;

export default withStyles(style)(ShrinkedInputLabel);

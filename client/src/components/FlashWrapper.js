import React, { useContext, } from "react";
import { FlashContext, } from "../providers/FlashProvider";

import { Snackbar, SnackbarContent, Icon, IconButton, } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles( theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const FlashWrapper = () => {
  const flash = useContext(FlashContext);
  const classes = useStyles1();
  const Icon = variantIcon[flash.color ? flash.color : "info"];

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Object.keys(flash).length === 0}
      autoHideDuration={6000}
      // onClose={handleClose}
      >
      <SnackbarContent        
        className={clsx(classes[flash.color], classes.margin)}
        aria-describedby="client-snackbar"
        message={
          <span 
            id="client-snackbar"
            style={{ display: "flex", alignItems: "center", }}
          >
            <Icon style={{ paddingRight: "10px", }} />
            { flash.message }
            </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default FlashWrapper;

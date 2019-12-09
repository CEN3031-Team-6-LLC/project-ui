/**
 *  Author: Lester G Dela Cruz
 * 
 *  Description: 
 * 
 */

import React from "react";
import * as MaterialUI from "@material-ui/core";

const ErrorDialog = props => {
  const { openDialog, onCloseDialog, title, message } = props;
  return (
    <MaterialUI.Dialog
      open={openDialog}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MaterialUI.DialogTitle id="alert-dialog-title">
        <MaterialUI.Typography color="error">{title}</MaterialUI.Typography>
      </MaterialUI.DialogTitle>
      <MaterialUI.DialogContent>
        <MaterialUI.DialogContentText id="alert-dialog-description">
          {message}
        </MaterialUI.DialogContentText>
      </MaterialUI.DialogContent>
      <MaterialUI.DialogActions>
        <MaterialUI.Button onClick={onCloseDialog} color="primary" autoFocus>
          Close
        </MaterialUI.Button>
      </MaterialUI.DialogActions>
    </MaterialUI.Dialog>
  );
};

export default ErrorDialog;

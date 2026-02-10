"use client";

import React, { useState } from "react";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface toastProps {
  open: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

function Toast({ open, message, type, onClose }: toastProps) {


  const toastClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    onClose();
  };

  return (
    <div>
      <div className="p-10">
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={toastClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={toastClose}
            severity={type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Toast;

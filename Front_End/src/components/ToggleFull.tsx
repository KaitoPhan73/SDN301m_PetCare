import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

type FullScreenToggleProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const CustomDialog = styled(Dialog)({
  maxWidth: "none",
  "& .MuiDialogContent-root": {
    overflowY: "auto",
    maxHeight: "calc(100vh - 210px)", // Example: Adjust height as needed
  },
});

const FullScreenToggle = ({
  open,
  onClose,
  title,
  children,
}: FullScreenToggleProps) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      aria-labelledby="fullscreen-dialog-title"
    >
      <DialogTitle id="fullscreen-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default FullScreenToggle;

"use client";
import React, { useRef } from "react";
import { SnackbarProvider, SnackbarKey } from "notistack";
import styled from "@emotion/styled";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Theme, useTheme } from "@mui/material/styles";

// Define your Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

// Styled component for the close button
const StyledCloseButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const SnackbarProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const notistackRef = useRef<SnackbarProvider>(null);
  const themeContext = useTheme<Theme>();

  const handleDismiss = (key: SnackbarKey) => {
    if (notistackRef.current) {
      notistackRef.current.closeSnackbar(key);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        ref={notistackRef}
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        action={(key) => (
          <StyledCloseButton
            theme={themeContext}
            onClick={() => handleDismiss(key)}
          >
            <CloseIcon />
          </StyledCloseButton>
        )}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default SnackbarProviders;

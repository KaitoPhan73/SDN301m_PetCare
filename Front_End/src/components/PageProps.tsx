import React from "react";
import { Typography, Grid, GridProps } from "@mui/material";

type PageProps = {
  title: string;
  children: React.ReactNode;
} & GridProps;

const Page: React.FC<PageProps> = ({ title, children, ...props }) => {
  return (
    <Grid container spacing={2} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid container item xs={12} {...props}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Page;

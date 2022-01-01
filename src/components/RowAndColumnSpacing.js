import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

export default function RowAndColumnSpacing() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 1, md: 34 }}>
        <Grid item xs={4}>
          <Item>1</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>2</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>3</Item>
        </Grid>

        <Grid item xs={4}>
          <Item>4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>4</Item>
        </Grid>

        <Grid item xs={4}>
          <Item>4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </React.Fragment>
  );
}

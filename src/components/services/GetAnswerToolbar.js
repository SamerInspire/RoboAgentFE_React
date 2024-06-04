import { Button, Grid } from "@mui/material";
function GetAnswerToolbar({ loading }) {
  return (
    <Grid container item spacing={4} position={"sticky"} bottom={50}>
      <Grid item xs={12} md={6}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          style={{
            width: "100%",
            color: "white",
          }}
          href="/dash/services"
        >
          back
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          isLoading={loading}
          disableElevation
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default GetAnswerToolbar;

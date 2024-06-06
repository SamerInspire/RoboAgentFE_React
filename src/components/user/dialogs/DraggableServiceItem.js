import { Grid, Typography } from "@mui/material";
import servicesIcons from "constants/servicesIcons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
const DraggableServiceItem = ({ authority }) => {
  return (
    <Grid
      container
      gap={2}
      alignItems={"center"}
      p={2}
      sx={{
        boxShadow: "0px 2px 12px 1px rgba(0,0,0,0.22)",
        cursor: "grabbing",
        borderRadius: "15px",
        position: "relative",
        zIndex: 9,
      }}
    >
      <Grid item color={"inherit"}>
        {servicesIcons[authority.authId]}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1" fontWeight={600}>
          {authority.description}
        </Typography>
      </Grid>
      <Grid item>
        <DragIndicatorIcon />
      </Grid>
    </Grid>
  );
};

export default DraggableServiceItem;

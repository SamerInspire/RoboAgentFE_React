import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
const buttonsStyle = {
  bgcolor: "#f6f6f6",
  height: "40px",
  border: "1px solid",
  borderColor: "primary.light",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#d9ffea",
  },
};
const textTicketStyles = {
  "& fieldset": {
    borderRadius: "0",
    border: "primary.main",
  },
  "&.Mui-focused fieldset": {
    border: "primary.main",
  },
  "&.Mui-focused fieldset": {
    borderColor: "primary.main",
  },
  "& input": {
    textAlign: "center",
    color: "primary.main",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
};
function ServicesCounter() {
  const [ticketsCounter, setTicketsCounter] = useState(0);

  return (
    <Grid container item alignItems={"center"}>
      <Grid
        container
        item
        alignItems={"center"}
        justifyContent={"center"}
        xs={2}
        sx={{
          ...buttonsStyle,
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        }}
        onClick={() =>
          ticketsCounter == 0 ? null : setTicketsCounter((prev) => prev - 1)
        }
      >
        <RemoveIcon />
      </Grid>
      <Grid item xs={4}>
        <TextField
          value={ticketsCounter}
          label={"Tickets"}
          type="number"
          onChange={(e) =>
            e.target.value == ""
              ? setTicketsCounter(0)
              : setTicketsCounter(e.target.value)
          }
          sx={textTicketStyles}
          inputProps={{
            style: {
              fontSize: 14,
              height: 40,
              padding: "0 14px",
              fontWeight: "bold",
            },
          }}
        />
      </Grid>
      <Grid
        container
        item
        alignItems={"center"}
        justifyContent={"center"}
        xs={2}
        sx={{
          ...buttonsStyle,
          borderTopRightRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
        onClick={() => setTicketsCounter((prev) => Number(prev) + 1)}
      >
        <AddIcon />
      </Grid>
    </Grid>
  );
}

export default ServicesCounter;

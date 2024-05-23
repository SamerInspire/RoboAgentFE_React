import {
  CircularProgress,
  TableBody as MuiTableBody,
  Typography,
} from "@mui/material";
import { TableBody, TableBodyCell, TableBodyRow } from "mui-datatables";

const LoadingTableBody = ({ loading, options, columns, ...others }) => {
  const visibleColCnt = columns.filter((c) => c.display === "true").length;
  return loading ? (
    <MuiTableBody sx={{ textAlign: "center" }}>
      <TableBodyRow sx={{ textAlign: "center" }} options={options}>
        <TableBodyCell
          colSpan={
            options.selectableRows !== "none" || options.expandableRows
              ? visibleColCnt + 1
              : visibleColCnt
          }
          options={options}
          colIndex={0}
          rowIndex={0}
        >
          <Typography textAlign={"center"} variant="body1" component={"div"}>
            <CircularProgress />
          </Typography>
        </TableBodyCell>
      </TableBodyRow>
    </MuiTableBody>
  ) : (
    <TableBody options={options} columns={columns} {...others} />
  );
};

export default LoadingTableBody;

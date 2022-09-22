import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { unredeemed } from "../util/constants/voucherStatus";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import styles from "../styles/VoucherTable.module.css";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "charity_selected",
    numeric: false,
    disablePadding: false,
    label: "Charity Selected",
  },
  {
    id: "amount_added",
    numeric: true,
    disablePadding: false,
    label: "Amount Added ($)",
  },
  {
    id: "date_submitted",
    numeric: false,
    disablePadding: false,
    label: "Date Submitted",
  },
];

function EnhancedTableHead(props) {
  const { voucher, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell />

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id == "id" ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(props) {
  const { vouchers, charityMappings } = props;
  const voucherData = [];
  for (let i = 0; i < vouchers.length; i++) {
    const voucher = vouchers[i];
    voucherData.push({
      id: voucher.id,
      status: voucher.status == unredeemed ? "Unredeemed" : "Redeemed",
      charity_selected: voucher.charityId
        ? charityMappings[voucher.charityId]
        : "",
      amount_added: voucher.amountAdded ? parseInt(voucher.amountAdded) : 0,
      date_submitted:
        voucher.status == unredeemed
          ? "-"
          : new Date(voucher.timeSubmitted).toUTCString(),
      message: voucher.message,
    });
  }
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - voucherData.length) : 0;

  return (
    <Paper sx={{ width: "100%", mb: 2 }} className={styles.table}>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"small"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={voucherData.length}
          />
          <TableBody>
            {stableSort(voucherData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <VoucherRow key={row.id} voucher={row} labelId={labelId} />
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={voucherData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

function VoucherRow(props) {
  const { voucher, labelId } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      {/* <TableRow sx={{ "& > *": { borderBottom: "unset" } }}> */}
      <TableRow hover tabIndex={-1} key={voucher.id}>
        <TableCell align="center">
          {voucher.message && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <DraftsIcon /> : <EmailIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none">
          {voucher.id}
        </TableCell>
        <TableCell align="right">{voucher.charity_selected}</TableCell>
        <TableCell align="right">{voucher.amount_added}</TableCell>
        <TableCell align="right">{voucher.date_submitted}</TableCell>
      </TableRow>
      {/* </TableRow> */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                className={styles.messageHeader}
              >
                Message from user:
              </Typography>
              <Typography variant="body2" gutterBottom component="div">
                {voucher.message}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

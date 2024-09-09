import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

import { getPublicForms } from "../../services/dataService";
import { useTheme } from "@mui/material/styles";
import ShareModal from "../Common/ShareModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.firstColor.main,
    color: theme.palette.secondColor.main,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PublicFormTable = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formList, setFormList] = useState([]);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareHash, setShareHash] = useState("");

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  useEffect(() => {
    const fetchPublicForms = async () => {
      try {
        const data = await getPublicForms();
        console.log(data);
        setFormList(data.publicForms);
      } catch (error) {
        window.showToast("error", error.message);
      }
    };

    fetchPublicForms();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredRows = formList.filter(
    (form) =>
      form.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper
      sx={{
        width: "100%",
        height: "70vh",
        padding: "1em",
        backgroundColor: theme.palette.secondColor.main,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={search}
            onChange={handleSearchChange}
            size='small'
            sx={{ flex: 1 }}
          />
      </div>

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">Link</StyledTableCell>
              <StyledTableCell align="center">Share</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((form) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={form.link}>
                  <StyledTableCell align="center">
                    <TextField
                      value={form.title}
                      size="small"
                      margin="dense"
                      variant="outlined"
                      inputProps={{
                        style: { fontSize: "0.875rem", padding: "8px" },
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(form.created_at).toLocaleDateString()} <br />
                    {new Date(form.created_at).toLocaleTimeString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        window.open(`${window.location.origin}/${form.link.split('/').pop()}`, '_blank');
                        // window.location.href = `${window.location.origin}/${form.link.split('/').pop()}`;
                      }}
                    >
                      Open Form
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => {
                        // hash = form.link.split('/').pop()
                        // window.location.href=`${window.location.origin}/live/instance/${instance.hash}`
                        setShareUrl(`${window.location.origin}/${form.link.split('/').pop()}`);
                        setShareHash(form.link.split('/').pop());
                        handleOpenShareModal();
                      }}
                    >
                      SHARE
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            <ShareModal
              open={openShareModal}
              handleClose={handleCloseShareModal}
              shareUrl={shareUrl}
              hash={shareHash}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value, 10))
        }
      />
    </Paper>
  );
};

export default PublicFormTable;

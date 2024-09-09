import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useParams } from "react-router-dom";
import { getInstances, deleteInstance } from "../../services/liveService";
import Blank from "../Common/Blank";
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

export default function FormTable() {
  const [instances, setInstances] = useState([]);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [shareHash, setShareHash] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const data = await getInstances();
        setInstances(data);
      } catch (error) {
        window.showToast("error", error.message);
      }
    };

    fetchInstances();
  }, []);

  const handleDeleteInstance = async (hash) => {
    try {
      if (!sessionStorage.getItem("token")) {
        return;
      }

      await deleteInstance(hash);
      console.log("Instance deleted successfully");

      window.location.href = "/forms";
      window.showToast("success", "Form deleted successfully");
    } catch (error) {
      console.error("Error deleting instance:", error);
      window.showToast("error", `Error deleting instance: ${error.message}`);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInstances = instances.filter((instance) =>
    instance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isLoggedIn ? (
        <div style={{ margin: "1em" }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchTerm}
            onChange={handleSearchChange}
            size='small'
            sx={{ flex: 1 }}
          />

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Created At</StyledTableCell>
                  <StyledTableCell align="center">Link</StyledTableCell>
                  <StyledTableCell align="center">Submissions</StyledTableCell>
                  <StyledTableCell align="center">Share</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {filteredInstances
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((instance) => (
                    <StyledTableRow
                      key={instance.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {instance.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(instance.created_at).toLocaleDateString()}{" "}
                        <br />
                        {new Date(instance.created_at).toLocaleTimeString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => {
                            if (sessionStorage.getItem("token")) {
                              window.location.href = `${window.location.origin}/live/instance/${instance.hash}`;
                            }
                          }}
                        >
                          OpenForm
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center" className="nav-item">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => {
                            if (sessionStorage.getItem("token")) {
                              window.location.href = `${window.location.origin}/live/instance/${instance.hash}`;
                            }
                          }}
                        >
                          RESPONSES
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center" className="nav-item">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => {
                            if (sessionStorage.getItem("token")) {
                              setShareUrl(`${window.location.origin}/${instance.hash}`);
                              setShareHash(instance.hash);
                              handleOpenShareModal();
                            }
                          }}
                        >
                          SHARE
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center" className="nav-item">
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteInstance(instance.hash)}
                        >
                          DELETE
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredInstances.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      ) : (
        <Blank />
      )}
    </>
  );
}

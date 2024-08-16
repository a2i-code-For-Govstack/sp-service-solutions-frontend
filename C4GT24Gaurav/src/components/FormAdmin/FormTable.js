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
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Padding } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { getInstances } from "../../services/liveService";
import { deleteInstance } from "../../services/liveService";
import Blank from "../Common/Blank";
import ShareModal from "../Common/ShareModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:  theme.palette.firstColor.main,
    color:theme.palette.secondColor.main,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FormTable() {
  const [instances, setInstances] = useState([]);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  // const shareUrl = 'https://example.com/form-url'; // Replace with your form URL

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const data = await getInstances();
        setInstances(data);
      
      } catch (error) {
        
        window.showToast('error',error.message);
        
        // You may want to handle the error differently, e.g., redirect to login page
      }
    };

    fetchInstances();
  }, []);

  
  

  const handleDeleteInstance = async (hash) => {
    try {
      if (!sessionStorage.getItem("token")) {
     
        // window.showToast('error','Please login to access this page.');
        // You may want to redirect to login page or handle this case differently
        return;
      }

      await deleteInstance(hash);
      console.log("Instance deleted successfully");
      
     window.location.href = '/forms'
     window.showToast('error','Instance deleted successfully');
      // Handle successful deletion (e.g., update state or UI)
    } catch (error) {
      console.error("Error deleting instance:", error);
  
      window.showToast('error',`Error deleting instance: ${error.message}`);
      // Handle error state if needed
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    
    if (storedToken) {
      setIsLoggedIn(true);}
  
  }, [])
  
  return (<>{isLoggedIn ? (
    <div style={{ margin: "1em 1em 1em 1em" }}>
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
            {instances.map((instance) => (
              <StyledTableRow
                key={instance.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {instance.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {new Date(instance.created_at).toLocaleDateString()} <br />
                  {new Date(instance.created_at).toLocaleTimeString()}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {
                    <Button size="small" variant="contained" color="success" onClick={() => {if(sessionStorage.getItem('token')){window.location.href=`${window.location.origin}/live/instance/${instance.hash}`} }}>
                    OpenForm
                  </Button>
                  }
                </StyledTableCell>
                <StyledTableCell align="center" className="nav-item">
                
                  <Button size="small" variant="contained" color="success" onClick={() => {if(sessionStorage.getItem('token')){window.location.href=`${window.location.origin}/live/instance/${instance.hash}`} }}>
                    RESPONSES
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center" className="nav-item">
                
                  <Button size="small" variant="contained" color="success" 
                  // onClick={() => {if(sessionStorage.getItem('token')){window.location.href=`${window.location.origin}/${instance.hash}`} }}
                  onClick={() => {if(sessionStorage.getItem('token')){  setShareUrl(`${window.location.origin}/${instance.hash}`); handleOpenShareModal()} }}
                 
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
      />
          </TableBody>
        </Table>
      </TableContainer>
    </div>) :  (
          <>
           <Blank/>
          </>
        )}
        </>
  );
}

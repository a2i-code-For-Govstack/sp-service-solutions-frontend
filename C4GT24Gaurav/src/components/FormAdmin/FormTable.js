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

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableFooter from '@mui/material/TableFooter';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import axios from 'axios';
// import { useState , useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// export default function FormTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [instances, setInstances] = useState([]);

//   useEffect(() => {
//       const storedToken = sessionStorage.getItem('token');
//       if (!storedToken) {
//           alert('Please login to access this page.');
//           // You may want to redirect to login page or handle this case differently
//           return;
//       }

//       const config = {
//           headers: {
//               Authorization: `Bearer ${storedToken}`
//           }
//       };

//       axios.get('http://localhost:8000/api/v1/live/instance', config)
//           .then(response => {
//               setInstances(response.data);
//           })
//           .catch(error => {
//               console.error('Error fetching instances:', error);
//               // Handle error state if needed
//           });
//   }, []); // Empty dependency array ensures useEffect runs once on component mount

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
//         <TableBody>
//           {instances.map((instance) => (
//             <TableRow key={instance.name}>
//               <TableCell component="th" scope="row">
//                 {instance.name}
//               </TableCell>
//               <TableCell style={{ width: 160 }} align="right">
//                 {instance.created_at}
//               </TableCell>
//               <TableCell style={{ width: 160 }} align="right">
//                 {<a href={`${window.location.origin}/live/instance/${instance.hash}`} rel="noreferrer" className="link mb-1" >Link</a>}
//               </TableCell>
//               <TableCell style={{ width: 160 }} align="right">
//               <Link to={"/submissions/"} className="nav-item">submissions</Link>
//               </TableCell>
//               <TableCell style={{ width: 160 }} align="right">
//               <span className="nav-item" >delete</span>
//               </TableCell>
//             </TableRow>
//           ))}
//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={3}
//               count={rows.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               slotProps={{
//                 select: {
//                   inputProps: {
//                     'aria-label': 'rows per page',
//                   },
//                   native: true,
//                 },
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
//

import React, { useEffect, useState } from 'react';
import {
    Paper, TextField, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Button
} from '@mui/material';
import { getUsers , deleteUser } from '../../services/liveService';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#9fb3e3",
    color: theme.palette.common.white,
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

const VotersTable = ({hash}) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
      const fetchData = async () => {
          const result = await getUsers(hash);
          setUsers(result);
      };
      fetchData();
  }, [hash]);
    
    const handleDelete = async (username) => {
        await deleteUser(username);
        alert("user deleted successfully")
        setUsers(users.filter(user => user.username !== username));
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredRows = users.filter((user) => 
        user.first_name.toLowerCase().includes(search.toLowerCase()) || 
        user.last_name.toLowerCase().includes(search.toLowerCase())
    );

    return ( 
        <Paper sx={{ width: '100%', height: '70vh', padding: '1em'  , backgroundColor:'#cee5fd' }}>
            <TextField
                id="standard-helperText"
                label="Search by Name"
                value={search}
                onChange={handleSearchChange}
                variant="standard"
                fullWidth
                margin="normal"
            />
            <TableContainer sx={{ maxHeight: 440, height: '70%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align='center'>Name</StyledTableCell>
                            <StyledTableCell align='center'>Last Name</StyledTableCell>
                            <StyledTableCell align='center'>Username</StyledTableCell>
                            <StyledTableCell align='center'>Vote Status</StyledTableCell>
                            <StyledTableCell align='center'>Remove</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={user.username}>
                                    <StyledTableCell align='center'>{user.first_name}</StyledTableCell>
                                    <StyledTableCell align='center'>{user.last_name}</StyledTableCell>
                                    <StyledTableCell align='center'>{user.username}</StyledTableCell>
                                    <StyledTableCell align='center'>{user.has_voted ? 'Voted' : 'Not Voted'}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(user.username)}
                                        >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
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
                onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
        </Paper>
    );
};

export default VotersTable;

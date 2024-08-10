import React, { useEffect, useState } from 'react';
import {
    Paper, TextField, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, Button
} from '@mui/material';
import { getUsers, deleteUser } from '../../services/liveService';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Switch from '@mui/material/Switch';
import { updateUser } from '../../services/liveService';
import Blank from '../Common/Blank';
import { useTheme } from '@mui/material/styles';
import UsersFileUpload from './UsersFileUpload'; // Add appropriate path
import UserAddModal from './UserAddModal'; // Add appropriate path

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const VotersTable = ({ hash }) => {
    const theme = useTheme(); 
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openUserUpload, setOpenUserUpload] = useState(false); // Add state for user upload modal
    const [openAddUser, setOpenAddUser] = useState(false); // Add state for add user modal

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

    const handleUpdate = async (user) => {
        await updateUser(hash, user.username, {
            first_name: user.first_name,
            last_name: user.last_name,
            has_voted: user.has_voted
        });
    };

    const handleInputChange = (event, username, field) => {
        const updatedUsers = users.map(user => 
            user.username === username ? { ...user, [field]: event.target.value } : user
        );
        setUsers(updatedUsers);
    };

    const handleSwitchChange = (event, username) => {
        const updatedUsers = users.map(user => 
            user.username === username ? { ...user, has_voted: event.target.checked } : user
        );
        setUsers(updatedUsers);
    };

    const handleUploadFileOpen = () => {
        setOpenUserUpload(true);
    };

    const handleUploadFileClose = () => {
        setOpenUserUpload(false);
    };

    const handleAddUserOpen = () => {
        setOpenAddUser(true);
    };

    const handleAddUserClose = () => {
        setOpenAddUser(false);
    };

    const filteredRows = users.filter((user) => 
        user.first_name.toLowerCase().includes(search.toLowerCase()) || 
        user.last_name.toLowerCase().includes(search.toLowerCase())
    );

    return ( 
        <Paper sx={{ width: '100%', height: '70vh', padding: '1em 1em 1em 1em', backgroundColor: theme.palette.secondColor.main, }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    id="standard-helperText"
                    label="Search by Name"
                    value={search}
                    onChange={handleSearchChange}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="firstColor"
                    size='small'
                    sx={{ flex: 1 }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleUploadFileOpen}
                    size="small"
                    style={{ margin: '0 10px' }}
                >
                    Upload Users
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={handleAddUserOpen}
                    size="small"
                >
                    Add User
                </Button>
            </div>
            <UsersFileUpload open={openUserUpload} onClose={handleUploadFileClose} />
            <UserAddModal open={openAddUser} onClose={handleAddUserClose} hash={hash} />
            <TableContainer sx={{ maxHeight: 440, height: '70%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align='center'>First Name</StyledTableCell>
                            <StyledTableCell align='center'>Last Name</StyledTableCell>
                            <StyledTableCell align='center'>Username</StyledTableCell>
                            <StyledTableCell align='center'>Vote Status</StyledTableCell>
                            <StyledTableCell align='center'>Update</StyledTableCell>
                            <StyledTableCell align='center'>Remove</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={user.username}>
                                    <StyledTableCell align='center'>
                                        <TextField 
                                            value={user.first_name} 
                                            onChange={(e) => handleInputChange(e, user.username, 'first_name')}
                                            size='small'
                                            margin='dense'
                                            variant='outlined'
                                            inputProps={{ style: { fontSize: '0.875rem', padding: '8px' } }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <TextField 
                                            value={user.last_name} 
                                            onChange={(e) => handleInputChange(e, user.username, 'last_name')}
                                            size='small'
                                            margin='dense'
                                            variant='outlined'
                                            inputProps={{ style: { fontSize: '0.875rem', padding: '8px' } }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>{user.username}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Switch 
                                            checked={user.has_voted} 
                                            onChange={(e) => handleSwitchChange(e, user.username)}
                                            size='small'
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleUpdate(user)}
                                            size='small'
                                        >
                                            Update
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(user.username)}
                                            size='small'
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

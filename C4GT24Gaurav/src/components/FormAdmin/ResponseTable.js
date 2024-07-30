import React, { useEffect, useState } from 'react';
import {
    Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination
} from '@mui/material';
import { getResponses, deleteResponse } from '../../services/dataService';
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

const ResponsesTable = ({ hash }) => {
    const [responses, setResponses] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getResponses(hash);
            setResponses(result);
        };
        fetchData();
    }, [hash]);

    const handleDelete = async (id) => {
        await deleteResponse(hash, id);
        window.showToast('success', "Response deleted successfully");
        // alert("Response deleted successfully");
        setResponses(responses.filter(response => response.id !== id));
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredRows = responses.filter((response) =>
        (response.user || 'Anonymous').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Paper sx={{ width: '100%', height: '70vh', padding: '0em 1em 1em 1em', backgroundColor: '#cee5fd' }}>
            <TextField
                label="Search by Username"
                value={search}
                onChange={handleSearchChange}
                variant="standard"
                fullWidth
                margin="normal"
                size='small'
            />
            <TableContainer sx={{ maxHeight: 440, height: '70%' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align='center'>Username</StyledTableCell>
                            <StyledTableCell align='center'>Submitted At</StyledTableCell>
                            <StyledTableCell align='center'>Answers</StyledTableCell>
                            <StyledTableCell align='center'>Remove</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((response) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={response.id}>
                                    <StyledTableCell align='center'>{response.user || 'Anonymous'}</StyledTableCell>
                                    <StyledTableCell align='center'>{formatDate(response.submitted_at)}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Button variant="contained" color="success" size='small'>View Answers</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(response.id)}
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

export default ResponsesTable;
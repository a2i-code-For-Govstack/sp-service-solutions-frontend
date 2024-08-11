import React, { useEffect, useState } from 'react';
import {
    Paper, TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination
} from '@mui/material';
import { getResponses, deleteResponse } from '../../services/dataService';
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from '@mui/material/styles';
import { downloadCSV } from '../Common/downloadCSV';
import Dashboard from '../Dashboard/Dashboard';
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




const ResponsesTable = ({ hash }) => {
    const theme = useTheme();
    const [responses, setResponses] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dashboard , setDashboard] = useState(0)

    

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

    const openAnswers = (id) => {
        // const hash = hash; // Replace with your actual survey hash
        // /response/:hash/answers/:id
        const url = `/response/${hash}/answers/${id}`;
        const newWindow = window.open(url);
        if (newWindow) newWindow.opener = null;
      };

    return (
        
        <Paper sx={{ width: '100%', padding: '0em 1em 1em 1em', backgroundColor: theme.palette.secondColor.main, }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                { ! dashboard && <><TextField
                    label="Search by Username"
                    value={search}
                    onChange={handleSearchChange}
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="firstColor"
                    size='small'
                />
                <Button
                 variant="contained" 
                 color="secondary" 
                 size="small"
                 style={{ margin: '0 10px' }}
                    onClick={() => downloadCSV(responses)}
                    // size="small"
                >
                    Download_CSV
                </Button></>}
                { dashboard ?  <div style={{width:'100%' , margin:"5px 0px 15px 0px" , border:'solid 1px green' ,padding:'5px' , borderRadius:'4px'}}><Button
                 variant="contained" 
                 color="secondary" 
                 size="small"
                 style={{ margin: '0 10px' }}
                    onClick={() => {setDashboard(0)}}
                    // size="small"
                >
                 Individual
                </Button> </div> : 
                <Button
                 variant="contained" 
                 color="secondary" 
                 size="small"
                 style={{ margin: '0 10px' }}
                    onClick={() =>{setDashboard(1)}}
                    // size="small"
                >
                  Dashboard
                </Button>}
            </div>
            {!dashboard ? <>

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
                                        <Button variant="contained" color="success" size='small' onClick={() => openAnswers(response.id)}>View Answers</Button>
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
            </> : <div >  <Dashboard/></div>}
        </Paper>
    );
};

export default ResponsesTable;

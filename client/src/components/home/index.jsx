import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Iconify from "../Iconify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Button, Container, IconButton, Link, Modal, Stack, Typography } from '@mui/material';
import configData from '../../config.json';
import { deleteDataService, getAllDataService } from "../../services/tableServices";
import Loading from "../loading";
import AlertBanner from "../AlertBanner";
import useWindowDimensions from "../../theme/hook/useWindowDimension";
import useResponsive from "../../theme/hook/useResponsive";
import { transformToStandard } from "../../util/helper";

const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1
};

const CustomButtonComponent = (props) => {
    const action = configData.action;
    const actionEntries = Object.entries(action);
    return (
        <div>
            {actionEntries.map(([key, action]) => (
                <Link component={RouterLink} to={action.url  + props.data._id} key={key}>
                <IconButton>
                    {action.icon ? <Iconify icon={action.icon}/> : action.name}
                </IconButton>
                </Link>
            ))}
        </div>
    );
};

export default function Home () {
    const mdUp = useResponsive('up', 'md');
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const action = query.get('action');
    const id = query.get('id');
    const { height, width } = useWindowDimensions();
    const [loading , setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const deleteConfirmClose = () => {
        window.location.assign('/');
    }

    useEffect(() => {
        console.log(action);
        const getTable = async () => {

            setLoading(true);
            const response = await getAllDataService(setAlert, setAlertMessage);
            console.log("Lengthb : " + response.data.length);
            setRowData(response?.data);
            if(response.data.length != 0) {
            const column = Object.keys(response?.data[0]);
            const filteredcolumn = column.filter((col) => col !== '_id' && col !== '__v'
        );
            const updatedColumnDefs = filteredcolumn.map((col) => ({
                headerName: transformToStandard(col),
                field: col,
                minWidth: 200,
            }));
            updatedColumnDefs.push({ field: "action", cellRenderer: CustomButtonComponent, flex: 1, pinned: 'right' });
            setColumnDefs(updatedColumnDefs);
            console.log(filteredcolumn);
            }else{
                setAlert(true);
                setAlertMessage("No data found, <br/>Do you want to initialize the data? <a href=" + configData.INITIALIZE_URL + "> Initalize Data</a>");
            }
            setLoading(false);
        }
        getTable();
    }, []);
    
    return (
        <Container>
            {loading ? <Loading /> :
        <Container maxWidth="lg" className="ag-theme-quartz"  sx={{py: 5, height : {height}}}>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <AlertBanner showAlert={query.get('delete')} alertMessage={"Item deleted !!"} severity='success' />
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={() => setLoading(false)}
            />
                    <Modal
                        open={action === 'delete'}
                        onClose={deleteConfirmClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modelStyle}  width={mdUp ? 400 : '90%'}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm Delete
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to delete the data? 
                            </Typography>
                            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                            <Stack mt={2} spacing={2} direction={'row'}>
                                <Button startIcon={<Iconify icon='fluent:delete-dismiss-24-filled' />} variant="outlined" color="error" sx={{ width: '100%' }}
                                    onClick={async () => {
                                        const response = await deleteDataService(id, setAlert, setAlertMessage);
                                        if (response) {
                                            window.location.assign(configData.HOME_URL + '?delete=true');
                                        }
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button startIcon={<Iconify icon='material-symbols:cancel' />} variant="outlined" color="primary" sx={{ width: '100%' }}
                                    onClick={deleteConfirmClose}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
        </Container>
        }
        </Container>
    );
};



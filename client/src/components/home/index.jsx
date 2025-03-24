import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Iconify from "../Iconify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Container, IconButton, Link, Stack } from '@mui/material';
import configData from '../../config.json';
import { getAllDataService, searchDataService, filterDataService } from "../../services/tableServices";
import Loading from "../loading";
import AlertBanner from "../AlertBanner";
import { transformToStandard } from "../../util/helper";
import DeleteModel from "./deleteModel";
import Search from "./search";
import Filter from "./filter";

const ActionButtonComponent = (props) => {
    const action = configData.action;
    const actionEntries = Object.entries(action);
    return (
        <div>
            {actionEntries.map(([key, action]) => (
                <Link component={RouterLink} to={action.url + props.data._id} key={key}>
                    <IconButton>
                        {action.icon ? <Iconify icon={action.icon} /> : action.name}
                    </IconButton>
                </Link>
            ))}
        </div>
    );
};

export default function Home() {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const closeAlert = () => {
        setAlert(false);
    }

    const searchTable = async (searchValue) => {
        const searchJson = {
            searchValue: searchValue
        }
        const response = await searchDataService(searchJson, setAlert, setAlertMessage);
        console.log("got response " + response);
        setRowData(response?.data);

    }

    const filterTable = async (filterJson) => {
        const response = await filterDataService(filterJson, setAlert, setAlertMessage);
        setRowData(response?.data);
    }

    const resetFilter = async() => {
        const response = await getAllDataService(setAlert, setAlertMessage);
        setRowData(response?.data);
    }

    useEffect(() => {
        const getTable = async () => {
            setLoading(true);
            const response = await getAllDataService(setAlert, setAlertMessage);
            setRowData(response?.data);
            if (!response)
                return;
            if (response && response.data.length > 0) {
                const column = Object.keys(response?.data[0]);
                const filteredcolumn = column.filter((col) => col !== '_id' && col !== '__v'
                );
                const updatedColumnDefs = filteredcolumn.map((col) => ({
                    headerName: transformToStandard(col),
                    field: col,
                    minWidth: 200,
                }));
                updatedColumnDefs.push({ field: "action", 
                    cellRenderer: ActionButtonComponent, 
                    flex: 1,
                    pinned: 'right' ,
                    });
                setColumnDefs(updatedColumnDefs);
                console.log(filteredcolumn);
            } else {
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
                <Container maxWidth="lg" className="ag-theme-quartz" sx={{ py: 5, height: '90vh' }}>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} closeAlert={closeAlert} severity='error' />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Search onSearch={searchTable} />
                        <Filter columns={columnDefs} handleFormSubmit={filterTable} handleResetFilter={resetFilter}/>
                    </Box>

                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={() => setLoading(false)}
                        pagination={true}
                        paginationPageSize={20}
                    />

                    <DeleteModel />
                </Container>
            }
        </Container>
    );
};



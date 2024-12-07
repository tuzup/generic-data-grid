import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Iconify from "../Iconify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Container, IconButton, Link } from '@mui/material';
import configData from '../../config.json';
import { getAllDataService, searchDataService } from "../../services/tableServices";
import Loading from "../loading";
import AlertBanner from "../AlertBanner";
import useWindowDimensions from "../../theme/hook/useWindowDimension";
import { transformToStandard } from "../../util/helper";
import DeleteModel from "./deleteModel";
import Search from "./search";

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

    const searchTable = async (searchValue) => {
        const searchJson = {
            searchValue: searchValue
        }
        const response = await searchDataService(searchJson, setAlert, setAlertMessage);
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
                updatedColumnDefs.push({ field: "action", cellRenderer: ActionButtonComponent, flex: 1, pinned: 'right' });
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
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                    <AlertBanner showAlert={query.get('delete')} alertMessage={"Item deleted !!"} severity='success' />
                    <Search onSearch = {searchTable} />
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={() => setLoading(false)}
                    />

                    <DeleteModel />
                </Container>
            }
        </Container>
    );
};



import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Iconify from "../Iconify";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Container, IconButton, Link } from '@mui/material';
import configData from '../../config.json';
import { getAllDataService } from "../../services/tableServices";
import Loading from "../loading";
import AlertBanner from "../AlertBanner";
import useWindowDimensions from "../../theme/hook/useWindowDimension";

const CustomButtonComponent = (props) => {
    const action = configData.action;
    const actionEntries = Object.entries(action);
    return (
        <div>
            {actionEntries.map(([key, action]) => (
                <Link component={RouterLink} to={action.url + "/" + props.data._id} key={key}>
                <IconButton>
                    {action.icon ? <Iconify icon={action.icon}/> : action.name}
                </IconButton>
                </Link>
            ))}
        </div>
    );
};

export default function Home () {
    const { height, width } = useWindowDimensions();
    const [loading , setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState();

    useEffect(() => {
        const getTable = async () => {
            setLoading(true);
            const response = await getAllDataService(setAlert, setAlertMessage);
            setRowData(response.data);
            const column = Object.keys(response.data[0]);
            const filteredcolumn = column.filter(column => column !== "_id");
            const updatedColumnDefs = filteredcolumn.map((col) => ({
                headerName: col,
                field: col,
                minWidth: 200,
            }));
            updatedColumnDefs.push({ field: "action", cellRenderer: CustomButtonComponent, flex: 1, pinned: 'right' });
            setColumnDefs(updatedColumnDefs);
            console.log(filteredcolumn);
            setLoading(false);
        }
        getTable();
    }, []);
    
    return (
        <Container>
            {loading ? <Loading /> :
        <Container maxWidth="lg" className="ag-theme-quartz"  sx={{py: 5, height : {height}}}>
            <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={() => setLoading(false)}
            />
        </Container>
        }
        </Container>
    );
};



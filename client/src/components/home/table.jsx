import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Iconify from "../Iconify";
import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Link } from '@mui/material';
import configData from '../../config.json';



export default function Table({ rowData, columnDefs }) {
    return (
        
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
                   
    );
};



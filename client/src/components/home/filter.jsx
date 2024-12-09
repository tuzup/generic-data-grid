import { Box, Button, MenuItem, Paper, Popper, Stack, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from "react";
import Iconify from "../Iconify";
import useResponsive from "../../theme/hook/useResponsive";

Filter.propTypes = {
    columns: PropTypes.array,
    handleFormSubmit: PropTypes.func,
    handleResetFilter: PropTypes.func
}

const filterCriterias = [
    {
        value: 'contains',
        label: 'Contains'
    },
    {
        value: 'equals',
        label: 'Equal'
    }, {
        value: 'start_with',
        label: 'Starts With'
    }, {
        value: 'ends_with',
        label: 'Ends With'
    }, {
        value: 'is_empty',
        label: 'Is Empty'
    }
];

export default function Filter({ columns, handleFormSubmit, handleResetFilter }) {

    const mdUp = useResponsive('up', 'md');
    const [anchorEl, setAnchorEl] = useState(null);
    const [criteria, setCriteria] = useState('');
    const [column, setColumn] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [error, setError] = useState({ column: '', criteria: '', filterValue: '' });
    const [isFilter, setIsFilter] = useState(false);

    const handleCriteriaChange = (event) => {
        setCriteria(event.target.value);
        setError({ ...error, criteria: '' });
    };

    const handleFilterClick = (event) => {
        setIsFilter(true);
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleFilterValueChange = (event) => {
        setFilterValue(event.target.value);
        setError({ ...error, filterValue: '' });
    };

    const handleColumnChange = (event) => {
        setColumn(event.target.value);
        setError({ ...error, column: '' });
    }

    const handleResetFilterClick = () => {
        setIsFilter(false);
        handleResetFilter();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let hasError = false;
        const newError = { column: '', criteria: '', filterValue: '' };
        if (!column) {
            newError.column = 'Column is required';
            hasError = true;
        }
        if (!criteria) {
            newError.criteria = 'Criteria is required';
            hasError = true;
        }
        if (criteria !== 'is_empty' && !filterValue) {
            newError.filterValue = 'Value is required';
            hasError = true;
        }

        setError(newError);
        if (hasError) return;

        const formData = {
            column_name: column,
            criteria: criteria,
            filter_data: filterValue
        };
        handleFormSubmit(formData);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popper' : undefined;

    return (
        <Fragment>
            {mdUp && isFilter ?
                <Button startIcon={<Iconify icon='mdi:filter-off' />} color="warning"
                    aria-describedby={id}
                    onClick={handleResetFilterClick}
                >
                    Reset Filter
                </Button>
                :
                <Button startIcon={<Iconify icon='mdi:filter' />} color="primary"
                    aria-describedby={id}
                    onClick={handleFilterClick}
                >
                    Filter
                </Button>
            }

            
            {mdUp ? 
            isFilter && 
                <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2} direction={"row"} >
                    <TextField
                        id="filter-column-select"
                        size="small"
                        select
                        label="Select Column"
                        variant="outlined"
                        value={column}
                        onChange={handleColumnChange}
                        helperText={error.column}
                        error={!!error.column}
                                FormHelperTextProps={{
                                    sx: {
                                        position: "absolute",
                                        top: "-24px", // Move helper text above the field
                                        left: 0,
                                        fontSize: "12px", // Adjust font size
                                        color: "gray", // Change color if needed
                                    },
                                }}
                                sx={{
                                    position: "relative", // Make the container relative for absolute positioning
                                    mt: 3,
                                    width: 150
                                }}
                    >
                        {columns.map((column) => (
                            (column.field !== 'action') &&
                            <MenuItem key={column.field} value={column.field}>
                                {column.headerName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="filter-criteria-select"
                        size="small"
                        select
                        label="Select Criteria"
                        variant="outlined"
                        value={criteria}
                        onChange={handleCriteriaChange}
                        helperText={error.criteria}
                        error={!!error.criteria}
                                FormHelperTextProps={{
                                    sx: {
                                        position: "absolute",
                                        top: "-24px", // Move helper text above the field
                                        left: 0,
                                        fontSize: "12px", // Adjust font size
                                        color: "gray", // Change color if needed
                                    },
                                }}
                                sx={{
                                    position: "relative", // Make the container relative for absolute positioning
                                    mt: 3,
                                    width: 150
                                }}
                    >
                        {filterCriterias.map((criteria) => (
                            <MenuItem key={criteria.value} value={criteria.value}>
                                {criteria.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="filter-value"
                        size="small"
                        label="Filter"
                        variant="outlined"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        disabled={criteria === 'is_empty'}
                        error={!!error.filterValue}
                        helperText={error.filterValue}
                                FormHelperTextProps={{
                                    sx: {
                                        position: "absolute",
                                        top: "-24px", // Move helper text above the field
                                        left: 0,
                                        fontSize: "12px", // Adjust font size
                                        color: "gray", // Change color if needed
                                    },
                                }}
                                sx={{
                                    position: "relative", // Make the container relative for absolute positioning
                                    mt: 3,
                                    width: 150
                                }}
                    />

                    <Button variant="contained" color="primary" type="submit">
                        Filter
                    </Button>
                </Stack>
                </Box> 
            :                
            <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom-start'>
                <Paper sx={{ p: 2 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                id="filter-column-select"
                                select
                                label="Select Column"
                                variant="outlined"
                                onChange={handleColumnChange}
                                helperText={error.column || "Please select the column you want to filter"}
                                error={!!error.column}
                            >
                                {columns.map((column) => (
                                    (column.field !== 'action') &&
                                    <MenuItem key={column.field} value={column.field}>
                                        {column.headerName}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="filter-criteria-select"
                                select
                                label="Select Criteria"
                                variant="outlined"
                                value={criteria}
                                onChange={handleCriteriaChange}
                                helperText={error.criteria || "Please select the criteria you want to filter"}
                                error={!!error.criteria}
                            >
                                {filterCriterias.map((criteria) => (
                                    <MenuItem key={criteria.value} value={criteria.value}>
                                        {criteria.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                id="filter-value"
                                label="Filter"
                                variant="outlined"
                                value={filterValue}
                                onChange={handleFilterValueChange}
                                disabled={criteria === 'is_empty'}
                                error={!!error.filterValue}
                                helperText={error.filterValue || "Enter the filter value"}
                            />

                            <Button variant="contained" color="primary" type="submit">
                                Filter
                            </Button>
                            {isFilter && 
                                    <Button startIcon={<Iconify icon='mdi:filter-off' />} color="warning"
                                        aria-describedby={id}
                                        onClick={handleResetFilterClick}
                                    >
                                        Reset Filter
                                    </Button>}
                        </Stack>
                    </Box>
                </Paper>
            </Popper>}
        </Fragment>
    );
}
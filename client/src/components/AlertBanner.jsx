
import { Box, Snackbar, Alert, Collapse, IconButton } from '@mui/material'
import PropTypes from 'prop-types';
import useResponsive from '../theme/hook/useResponsive';
import { useEffect, useState } from 'react';
import Iconify from './Iconify';



AlertBanner.propTypes = {
    showAlert: PropTypes.bool,
    alertMessage: PropTypes.string,
    severity: PropTypes.string,
    closeAlert: PropTypes.func
}

export default function AlertBanner({ showAlert, alertMessage, closeAlert, severity = 'error' }) {
    return (
        <>
            {showAlert &&
            <Box mb={3} sx={{ width: '100%' }}>
                    <Collapse in={showAlert}>
                <Alert
                    severity={severity}
                    action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            closeAlert()
                        }}
                    >
                        <Iconify icon='material-symbols:close-rounded' />
                    </IconButton>
                    }
                >
                    <span dangerouslySetInnerHTML={{ __html: alertMessage }} />
                </Alert>
                </Collapse>

            </Box>
            
            }
        </>
        )
}
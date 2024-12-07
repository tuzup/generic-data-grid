import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import AlertBanner from "../AlertBanner";
import { deleteDataService } from "../../services/tableServices";
import Iconify from "../Iconify";
import configData from '../../config.json';
import useResponsive from "../../theme/hook/useResponsive";
import { useLocation } from 'react-router-dom';
import { useState } from "react";


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

export default function DeleteModel() {
    const mdUp = useResponsive('up', 'md');
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const action = query.get('action');
    const id = query.get('id');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const deleteConfirmClose = () => {
        window.location.assign(configData.HOME_URL);
    }

    return(
        <Modal
            open={action === 'delete'}
            onClose={deleteConfirmClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modelStyle} width={mdUp ? 400 : '90%'}>
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
    );
}
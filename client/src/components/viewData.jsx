import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getSingleDataService } from "../services/tableServices";
import { Alert, Box, Button, Container, Divider, Grid2, IconButton, Typography } from "@mui/material";
import Loading from "./loading";
import AlertBanner from "./AlertBanner";
import { transformToStandard } from "../util/helper";
import Iconify from "./Iconify";
import configData from '../config.json';


export default function ViewData() {
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [data, setData] = useState();
    useEffect(() => {
        const getInfo = async () => {
            setLoading(true);
            const response = await getSingleDataService(params.id, setAlert, setAlertMessage);
            if (response) { 
                const filteredData = response.data;
                delete filteredData._id;
                delete filteredData.__v;
                setData(response.data);
        }
            setLoading(false);
        }
        getInfo();
    }, []);
    return (
        <Container sx={{
             pt: 5,
            height: '100vh',
            width: '100%',
        }}>
            {loading ? <Loading /> :
                <Fragment>
                    
                <Container maxWidth='md' disableGutters='true' sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                }}> 
                
                    <Box sx={{
                        bgcolor: "#FEF3E2",
                        color: "#F96E2A",
                        width: '100%',
                        py: 5,
                    }}
                    >
                            
                        <Typography variant='h4' sx={{ px: 3 }}>
                            View Data
                        </Typography>
                            <Link component={Link} to={configData.HOME_URL}>
                                <Button startIcon={<Iconify icon='material-symbols:arrow-back' />} color="primary" sx={{ mb: 1, ml: 3 }}
                                >
                                    Back to Home
                                </Button>
                            </Link>

                    </Box>
                    <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error'/>
                    <Grid2 container spacing={3} p={4}>
                        {data && Object.entries(data).map(([key, value]) => (
                            <Fragment key={key}>
                                <Grid2 size={{ md: 3, xs: 6 }} >
                                    <Typography variant='body1' color="text.secondary"
                                    >
                                        {transformToStandard(key)}  
                                    </Typography>
                                </Grid2>
                                <Grid2 size={{md: 3, xs: 6}}  >
                                    <Typography variant="body1" color="text.primary" sx={{ fontSize: 18, }} 
                                    >
                                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                                        value}
                                    </Typography>
                                </Grid2>
                            </Fragment>
                        ))}
                    </Grid2>
                </Container>
                </Fragment>
            }
        </Container>
    );
}
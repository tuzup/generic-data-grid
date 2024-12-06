import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleDataService } from "../services/tableServices";
import { Alert, Container, Grid2 } from "@mui/material";
import Loading from "./loading";
import AlertBanner from "./AlertBanner";

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
            delete response.data._id;
            setData(response.data);
            setLoading(false);
        }
        getInfo();
    }, []);
    return (
        <Container>
            {loading ? <Loading /> : 
            <Container maxWidth="md">
                <h1>View Data</h1>
                <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />
                <Grid2 container spacing={2}>
                {data && Object.entries(data).map(([key, value]) => ( 
                    <Grid2 size={{ xs: 6, md: 3 }}>
                        {key} : {value}
                    </Grid2>
                ))}
                </Grid2>
            </Container>
            }
        </Container>
    );
}
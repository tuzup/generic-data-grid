
import { CircularProgress, Grid2, Typography } from "@mui/material";


export default function Loading() {

    return (
        <Grid2 container
            direction="column"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minHeight: '200px'
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="h5"  sx={{mt:5}} textAlign={'center'}>
                Loading...
            </Typography>
        </Grid2>
    )
}

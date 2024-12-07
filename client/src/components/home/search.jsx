import { Box, Container, InputAdornment, TextField } from "@mui/material";
import Iconify from "../Iconify";

export default function Search({ onSearch }) {
    const handleKeyPress = (event) => {
            onSearch(event.target.value);
    };

    return (
        <>
            <TextField
                label="Search"
                sx={{ width: '25ch', my: 2 }}
                onKeyUp={handleKeyPress}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Iconify icon="material-symbols:search" sx={{ fontSize: 24 }} />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </>
    );
}
import { AppBar, Typography} from "@mui/material";
import { Box } from "@mui/system";

const Navbar = () => {
    return(
        <Box>
            <AppBar position='sticky' sx={{p:1.6}}>
                <Typography variant='h5'>ToDo App</Typography>
            </AppBar>
        </Box>
    )
}

export default Navbar;
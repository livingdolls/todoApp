import { Box, ListItemText, Typography } from "@mui/material";

const InfoPriority = () => {
    return(
        <Box>
            <Typography variant="button">Priority List</Typography>
                <ListItemText sx={{mt:-1}}
                    secondary={
                    <>
                    <Typography color='error.light' fontWeight={700} variant="overline" sx={{display:'inline'}}>
                        Do    
                    </Typography>
                    {" - Can be done quickly. Do the task now!"}
                    </>
                }                            
                />

            <ListItemText sx={{mt:-2}}
                secondary={
                <>
                <Typography color='warning.light' fontWeight={700} variant="overline" sx={{display:'inline'}}>
                    Defer    
                </Typography>
                {" - Can be done quickly. Do the task now!"}
                </>
            }                            
            />

            <ListItemText sx={{mt:-2}}
                secondary={
                <>
                <Typography color='info.light' fontWeight={700} variant="overline" sx={{display:'inline'}}>
                    Delete
                </Typography>
                {" - Neither urgent, nor important"}
                </>
            }                            
            />
    </Box>
    )
}
export default InfoPriority;
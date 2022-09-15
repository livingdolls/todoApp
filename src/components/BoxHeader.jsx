import { ContentPaste } from "@mui/icons-material";
import { Box, ListItemText } from "@mui/material";

const BoxHeader = ({todoLength}) => {
    return(
        <Box borderRadius={5} p={3} bgcolor={'primary.main'}>
            <Box display="flex" gap={2}>
                <Box width='20%'>
                    <ContentPaste sx={{backgroundColor:'#F5F4FA',color:'#9272C2', fontSize:70, padding:1, borderRadius:3}} />
                </Box>
                <Box width='80%'>
                    {
                        todoLength > 0 ?
                        <ListItemText sx={{color:'#fff'}}
                            primary="Incoming Activity"
                            secondary={`You have ${todoLength} unfinished activities, finish them so you can sleep`}
                        />
                        :
                        <ListItemText sx={{color:'#fff'}}
                            primary="No Activity Found"
                            secondary="You don't have activities, look for activities so that your life is useful"
                        />
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default BoxHeader;
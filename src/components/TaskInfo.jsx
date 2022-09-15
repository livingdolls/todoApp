import { Close } from "@mui/icons-material";
import { Box, Slide, Typography } from "@mui/material"
import dayjs from "dayjs";

const TaskInfo = ({info, openInfo,setOpenInfo}) => {
    const time = dayjs(info.time).format('dddd HH mm A')
    const date = dayjs(info.date).format('D MMM YY')

    const handleClose = () => {
        setOpenInfo(false)
    }

    return(
        <Slide direction="left" in={openInfo}>
            <Box p={1} sx={{width:400, height:200, position:'fixed', top:300, right:50, backgroundColor:'#fff', border:'1px solid #9272C2'}}>
                
                <Box 
                    bgcolor={'primary.main'} 
                    sx={{display:'flex', 
                    justifyContent:'space-between', p:1, m:-1}}>
                    <Typography variant='button' sx={{color:'#fff'}}>{info.title}</Typography>
                    <Close sx={{color:'red'}} onClick={handleClose} />
                </Box>

                <Box sx={{display:'flex', justifyContent:'space-between', mt:2}}>
                    <Typography variant='body2'>{time}</Typography>
                    <Typography variant='body2'>{date}</Typography>
                </Box>

                {
                    info.priority === 'do' 
                    ? <Box width={40} pl={1} pr={1} pt={0.5} sx={{backgroundColor:'#e57373', borderRadius:3}}>
                        <Typography display='inline' variant="button" sx={{color:'#fff'}}>{info.priority} : </Typography></Box>
                    : <></>
                }

                {
                    info.priority === 'defer'
                    ? <Box width={70} pl={1} pr={1} pt={0.5} sx={{backgroundColor:'#ffb74d', borderRadius:3}}>
                        <Typography display='inline' variant="button" sx={{color:'#fff'}}>{info.priority} : </Typography></Box>
                    : <></>
                }
                {
                    info.priority === 'delete' 
                    ? <Box width={70} pl={1} pr={1} pt={0.5} sx={{backgroundColor:'#4fc3f7', borderRadius:3}}>
                        <Typography display='inline' variant="button" sx={{color:'#fff'}}>{info.priority} : </Typography></Box>
                    : <></>
                }

                <Typography variant="body2" sx={{mt:1}}>{info.title}</Typography>
                
            </Box>
        </Slide>
    )
}

export default TaskInfo;
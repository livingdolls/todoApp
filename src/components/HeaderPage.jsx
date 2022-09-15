import { Close, Edit } from "@mui/icons-material";
import { Button, ListItemText, Modal, Slide, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useState } from "react";
import AlertModal from "./AlertModal";

const HeaderPage = () => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("Arunika");
    const [jeneng, setJeneng] = useState(name)
    const [alert, setAlert] = useState(false)
    const [loadButton, setLoadButton] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('success');


    const handleName = (e) => {
        e.preventDefault();
        setMessage("Nama tidak boleh kosong")
        if(!jeneng){
            setSeverity('error')
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 3000);
            return '';
        }
        
        setLoadButton(true)
        setTimeout(() => {
            setMessage("Berhasil mengganti nama")
            setSeverity('success')
            setName(jeneng)
            setOpen(false)
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
                setLoadButton(false)
            }, 3000);
            
        }, 2000);

    }
    const handleModalName = () => {
        setOpen(true)
        setJeneng(name)
    }


    return(
        <Box display='flex' flexDirection='row'  pr={2} p={1} gap={9}>
            <AlertModal pesan={message} severity={severity} alert={alert} setAlert={setAlert} />
            
            <Box>
                <ListItemText 
                    primary={<Typography variant="h5">Welcome, {name}</Typography>} 
                    secondary={dayjs().format('dddd D MMM YYYY')} 
                />
            </Box>
            <Box>
                <Tooltip title="edit" onClick={handleModalName}>
                    <Edit sx={{fontSize:"20px", mt:1}}/>
                </Tooltip>
            </Box>

            <Modal open={open}>
                <Slide direction="down" in={open}>
                    <Box display='flex' flexDirection='column' gap={1}
                        bgcolor={'background.default'} 
                        borderRadius={2} p={1} 
                        sx={{width:'300px',  position:'fixed', top:100, left:80}}>

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant="overline">Change Name</Typography>

                            <Tooltip title="close" onClick={() => setOpen(false)}>
                                <Close sx={{color:'#9272C2'}} />
                            </Tooltip>
                        </Box>
                        <form onSubmit={handleName}>
                            <TextField 
                                value={jeneng}
                                onChange={function(e) {setJeneng(e.target.value)}}
                                fullWidth 
                                label="Name" 
                                size="small" 
                                sx={{mb:1}}/>
                                {loadButton
                                ? 
                                <Button variant="contained" type="submit" fullWidth size="small">Loading...</Button>
                                :
                                <Button variant="contained" type="submit" fullWidth size="small">Change</Button>
                                }
                        </form>
                    </Box>
                </Slide>
            </Modal>
        </Box>
    )
}

export default HeaderPage;
import { Close } from "@mui/icons-material"
import { Button, Modal, Radio, Slide, Stack, styled, TextField, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useState } from "react";
import InfoPriority from "./InfoPriority";
import AlertModal from "./AlertModal";
import { LoadingButton } from "@mui/lab";

const BoxRadio = styled(Box)((({theme}) => ({
    display:'flex',
    width:"33%",
    borderRadius:15,
    padding:1
})))

const TypoMod = styled(Typography)((({theme}) => ({
    color:'#FFF',
    marginTop:'11px',
    marginLeft:-5,
    fontWeight:700,
    letterSpacing:1
})))



const TaskEdit = (
        {
            todo, 
            setTodo, 
            open, 
            setOpen, 
            title, 
            setTitle,
            id,
            setId,
            desc,
            setDesc,
            time,
            setTime,
            date,
            setDate,
            setPriority,
            priority}
            ) => {



    const [alert, setAlert] = useState({
        alert:false,
        pesan : '',
        severity:'warning',
    })
    const [loading, setLoading] = useState(false)

    
    // Handle Radio Button
    const handleChangePriority = (e) => {
        setPriority(e.target.value)
    }

    const controlProps = (item) => ({
        checked: priority === item,
        onChange: handleChangePriority,
        value: item,
        name:'color-priority',
        inputProps:{'arial-label': item}
    })
    // End Handle radio button


    const handleData = (e) => {
        e.preventDefault();
        setLoading(true)

        // Validasi Input
        if(!title){
            setAlert({alert:true,pesan:'Title tidak boleh kosong',severity:'error'})
            setTimeout(() => {
                setAlert({...alert}, {alert:false})
                setLoading(false)
            }, 2000);
            return ''
        }

        if(!desc){
            setAlert({alert:true,pesan:'Deskripsi tidak boleh kosong',severity:'error'})
            setTimeout(() => {
                setAlert({...alert}, {alert:false})
                setLoading(false)
            }, 2000);
            return ''
        }

        const cariId = todo.findIndex(function(t) {
            return id === t.id
        })

        const newUpdate = {
            id,
            title,
            desc,
            time,
            date,
            priority,
            done:false
        }

        const newTodos = [...todo]
        newTodos[cariId] = newUpdate

        setTimeout(() => {
            setTodo(newTodos)            
            
            setAlert({
                alert:true,
                pesan:'Berhasil mengubah activity',
                severity:'info'
            })

            setTimeout(() => {
                setAlert({
                    alert:false,
                    pesan:'Berhasil menambah Activity',
                    severity:'success'
                })
                setLoading(false)

            }, 3000);
            
            handlerClearForm()
        }, 3000);
    }

    const handlerClearForm = () => {
        setOpen(false)
        setLoading(false)
    }

    const clearForm = () => {
        setTitle('')
        setDesc('')
    }


    return(
        <Box>
            <AlertModal pesan={alert.pesan} severity={alert.severity} alert={alert.alert} setAlert={alert.setAlert} />

            <Modal 
                open={open}
                >
                <Slide direction="up" in={open}>
                <Box 
                bgcolor={'background.default'}
                p={3}
                sx={{
                    height:'500px',
                    width:'49.2vh',
                    position:'fixed', 
                    bottom:0,
                    borderRadius:'20px 20px 0 0'
                }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h5" color="text.primary">Edit Task {title}</Typography>
                        <Tooltip title='close' onClick={() => setOpen(false)}>
                            <Close sx={{color:'#9272C2'}} />
                        </Tooltip>
                    </Box>

                <form onSubmit={handleData}>

                    <Box mt={2} sx={{display: 'flex', flexDirection:'column', gap:2}}>
                    
                        <TextField 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth 
                            label="Title" />
                        
                        <TextField 
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            fullWidth 
                            multiline={true} 
                            rows={3} 
                            label="Description" />
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        
                            <Stack direction='row' gap={1}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => {
                                    setDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <MobileTimePicker
                                    label="Time"
                                    value={time}
                                    onChange={(newValue) => {
                                        setTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                        
                        <Box display='flex' flexDirection='row' gap={2} justifyContent='space-between'>
                            <BoxRadio bgcolor="error.light">
                                <Radio {...controlProps('do')} label="Urgent" 
                                    sx={{color: '#FFF',
                                        '&.Mui-checked': {
                                            color: '#ef9a9a',
                                        },}}
                                        onClick={(e) => setPriority(e.target.value)}
                                    />
                                <TypoMod variant="button" >Do</TypoMod>
                            </BoxRadio>
                            <BoxRadio bgcolor={'warning.light'} >
                                <Radio {...controlProps('defer')} label="Slow" 
                                    sx={{color: '#FFF',
                                    '&.Mui-checked': {
                                        color: '#e6ee9c',
                                    },}}
                                    onClick={(e) => setPriority(e.target.value)}
                                />
                                <TypoMod variant="button">Defer</TypoMod>
                            </BoxRadio>
                            <BoxRadio bgcolor='info.light'>
                                <Radio {...controlProps('delete')}  label="Not Priority" 
                                    sx={{color: '#FFF',
                                    '&.Mui-checked': {
                                        color: '#81d4fa',
                                    },}}
                                    onClick={(e) => setPriority(e.target.value)}
                                />
                                <TypoMod variant='button' >Delete</TypoMod>
                            </BoxRadio>
                        </Box>

                        {/* InfoPriority */}
                        <InfoPriority />

                        <Box display='flex' gap={1}>
                            <LoadingButton loading={loading} sx={{width:'80%'}} variant='contained' type='submit'>UPDATE</LoadingButton>
                            <Button sx={{width:"20%"}} color='error' variant='contained' onClick={clearForm}>Clear</Button>
                        </Box>
                    </Box>
                </form>

                </Box>
                </Slide>
            </Modal>
        </Box>
    )
}

export default TaskEdit
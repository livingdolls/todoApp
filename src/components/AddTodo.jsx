import { Add, Close } from "@mui/icons-material"
import { Button, Fab, Modal, Radio, Slide, Stack, styled, TextField, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
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


const AddTodo = ({todo, setTodo}) => {
    const [add, setAdd] = useState(false)
    const [date, setDate] = useState(dayjs().format('MM/DD/YYYY'));


    const [time, setTime] = useState(dayjs('2018-01-01T00:00:00.000Z'));
    const [selectedValue, setSelectedValue] = useState('');
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('')

    const [alert, setAlert] = useState({
        alert:false,
        pesan : '',
        severity:'success',
    })
    const [loading, setLoading] = useState(false)


    const handleChangePriority = (e) => {
        setSelectedValue(e.target.value)
    }

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChangePriority,
        value: item,
        name:'color-priority',
        inputProps:{'arial-label': item}
    })

    const generateId = () => {
        return Date.now();
    }

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


        // Jika Sukses Validasi
        setTimeout(() => {
            setTodo([
                ...todo,
                {
                    id : generateId(),
                    title: title,
                    desc: desc,
                    date: date,
                    time: time,
                    priority: priority,
                    done : false
                }
            ])
            
            setAlert({
                alert:true,
                // setAlert:setAlert,
                pesan:'Berhasil menambah Activity',
                severity:'success'
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
            setAdd(false)
        }, 3000);


    }

    const handlerClearForm = () => {
        setTitle('')
        setDesc('')
    }

    return(
        <Box>
            <AlertModal pesan={alert.pesan} severity={alert.severity} alert={alert.alert} setAlert={alert.setAlert} />
            <Tooltip onClick={() => setAdd(true)}
                title="Add Todo" 
                sx={{
                    position:'fixed',
                    bottom:20,
                    left: {xs:"calc(50% - 25px)",
                    md: 30}
                }}
                >
                <Fab 
                color="primary">
                    <Add/>
                </Fab>
            </Tooltip>

            <Modal 
                open={add}
                >
                <Slide direction="up" in={add}>
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
                        <Typography variant="h5" color="text.primary">Add ToDo</Typography>
                        <Tooltip title='close' onClick={() => setAdd(false)}>
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
                            <LoadingButton loading={loading} sx={{width:'80%'}} variant='contained' type='submit'>ADD</LoadingButton>
                            <Button sx={{width:"20%"}} color='error' variant='contained' onClick={handlerClearForm}>Clear</Button>
                        </Box>
                    </Box>
                </form>

                </Box>
                </Slide>
            </Modal>
        </Box>
    )
}

export default AddTodo
import { CheckBox, CheckBoxOutlined, Circle, Delete,  Edit, Visibility } from "@mui/icons-material";
import { Box, ListItemText, Typography } from "@mui/material";
import dayjs from 'dayjs';

const TaskItems = ({todo,setTodo,setOpenInfo, task, setAlert, setInfo, setOpen, setId, setDate, setPriority,setTime, setDesc, setTitle}) => {

    const handleSelesai = (id) => {

        // Cari Id yang sama
        const cariId = todo.findIndex(function (t) {
            return id === t.id
        })

        const updat = {
            ...todo[cariId],
            done: todo[cariId].done ? false : true
        }

        const newTodos = [ ...todo ]
        newTodos[cariId] = updat;

        setTodo(newTodos)
    }

    const handleDelete = (id) => {
        const filterId = todo.filter(function (t){
            return t.id !== id
        })

        setTodo(filterId)
        setAlert({alert:true,pesan:'Task berhasil dihapus',severity:'success'})
        setTimeout(() => {
            setAlert({alert:false,pesan:'Task berhasil dihapus',severity:'success'})
        }, 2000);
    }

    const handleEdit = (t) => {
        setOpen(true)
        setId(t.id)
        setTitle(t.title)
        setDate(t.date)
        setTime(t.time)
        setDesc(t.desc)
        setPriority(t.priority)
    }

    const handleInfo = (t) => {
        setInfo(t)
        setOpenInfo(true)
    }

    return(
        todo.map((t) => {
            return(
                <Box key={t.id}
                    boxShadow={3} 
                    borderColor={'primary.main'} 
                    mb={1} 
                    display='flex'
                    // flexWrap='wrap'
                    gap={1} 
                    bgcolor='#FFF' 
                    pt={1} pb={1} p={1}  
                    justifyContent="center"
                    sx={{border:'1px solid rgba(146, 114, 194, 0.5)'
                    }}
                    >
                    
                    <Box widht="5%">
                        {
                            t.priority === 'do' 
                            ? <Circle sx={{fontSize:'15px', color:'#e57373', mt:1}} />
                            : <></>
                        }

                        {
                            t.priority === 'defer' 
                            ? <Circle sx={{fontSize:'15px', color:'#ffb74d', mt:1}} />
                            : <></>
                        }

                        {
                            t.priority === 'delete' 
                            ? <Circle sx={{fontSize:'15px', color:'#4fc3f7', mt:1}} />                            
                            : <></>
                        }

                    </Box>

                    <Box width="90%" >
                        <ListItemText
                            primary={
                                <>
                                    {t.done 
                                        ? <Typography sx={{textDecoration:'line-through'}}>{t.title}</Typography>
                                        : <Typography>{t.title}</Typography>
                                    }
                                </>
                            }
                            secondary={dayjs(t.time).format('HH mm A')}

                        />
                    </Box>
                    

                    {task 
                        ? 
                        <Box sx={{display:'flex', flexDirection:'column', gap:0.3}}>
                            <Delete sx={{color:'red', fontSize:'25px'}} onClick={() => handleDelete(t.id)} />
                            <Edit sx={{color:'#9272C2', fontSize:'25px'}} 
                                onClick={() => handleEdit(
                                    {
                                        id:t.id,                     
                                        title: t.title,
                                        desc: t.desc,
                                        date: t.date,
                                        time: t.time,
                                        priority: t.priority,
                                        done : t.done,
                                    })}
                            />
                        </Box>
                    
                        :

                        <Box width="10%" alignSelf='center' sx={{display:'flex'}} >
                            <Visibility onClick={() => handleInfo({
                                                        id:t.id,                     
                                                        title: t.title,
                                                        desc: t.desc,
                                                        date: t.date,
                                                        time: t.time,
                                                        priority: t.priority,
                                                        done : t.done,
                                                    })}
                                                    sx={{color:'gray'}}
                                                    />

                            {t.done 
                                ? 
                                    <CheckBox onClick={() => handleSelesai(t.id)} sx={{color:'#9272C2'}} />
                                :
                                    <CheckBoxOutlined sx={{color:'#9272C2'}} onClick={() => handleSelesai(t.id)} />
                            }
                        </Box>
                }

                    


                </Box>
            )
        })
    )
}

export default TaskItems;
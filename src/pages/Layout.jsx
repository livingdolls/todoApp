import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import BoxHeader from "../components/BoxHeader";
import HeaderPage from "../components/HeaderPage";
import MainContent from "../components/MaintContent";
import Navbar from "../components/Navbar";

const themeMod = createTheme({
    typography: {
          fontFamily: 'Josefin Sans, sans-serif'
    },
    palette: {
        background: {
            default:'#F5F4FA',
            paper:'#F5F4FA',
        },
        primary:{
            main: '#9272C2'
        }
    }
})

const Layout = () => {
    const [todo, setTodo] = useState([])
    const [todoLength, setTodoLength] = useState(0)

    useEffect(() => {
        
        const getData = todo.filter(function(e){
            return e.done === false
        })

        setTodoLength(getData.length)
    },[todo])

    console.log(todo)


    return(
        <ThemeProvider theme={themeMod}>
            <Box width='500px' bgcolor={'background.default'} sx={{height:'100vh'}}>
                <Navbar />
                <Box p={1.5}>
                    <HeaderPage />
                    <BoxHeader todoLength={todoLength} />
                    <MainContent todo={todo} setTodo={setTodo} />
                    <AddTodo todo={todo} setTodo={setTodo} />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default Layout;
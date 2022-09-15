import { EditOff } from "@mui/icons-material";
import { Box, List, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import AlertModal from "./AlertModal";
import TaskEdit from "./TaskEdit";
import TaskInfo from "./TaskInfo";

import TaskItems from "./TaskItems";

const MainContent = ({ todo, setTodo }) => {
  const [task, setTask] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    pesan: "sdsfse",
    severity: "success",
  });

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");

  const [open, setOpen] = useState(false); //Handle modal edit
  const [info, setInfo] = useState({});
  const [openInfo, setOpenInfo] = useState(false); //handle modal info

  return (
    <Box mt={2}>
      {todo.length > 0 ? (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Tasks</Typography>
            <Tooltip title="Action">
              <EditOff
                sx={{ color: "#9272C2" }}
                onClick={() => setTask(!task)}
              />
            </Tooltip>
          </Box>
          <List>
            <TaskItems
              setId={setId}
              setTitle={setTitle}
              setDesc={setDesc}
              setDate={setDate}
              setTime={setTime}
              setPriority={setPriority}
              todo={todo}
              setTodo={setTodo}
              task={task}
              setTask={setTask}
              setAlert={setAlert}
              open={open}
              setOpen={setOpen}
              setInfo={setInfo}
              setOpenInfo={setOpenInfo}
            />
          </List>
        </Box>
      ) : (
        <Box>Tidak ada aktivity</Box>
      )}

      <AlertModal
        pesan={alert.pesan}
        severity={alert.severity}
        alert={alert.alert}
        setAlert={alert.setAlert}
      />

      <TaskEdit
        title={title}
        setTitle={setTitle}
        id={id}
        setId={setId}
        desc={desc}
        setDesc={setDesc}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        priority={priority}
        setPriority={setPriority}
        todo={todo}
        setTodo={setTodo}
        open={open}
        setOpen={setOpen}
      />

      <TaskInfo info={info} openInfo={openInfo} setOpenInfo={setOpenInfo} />
    </Box>
  );
};

export default MainContent;

import { useEffect } from "react";
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Task';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from "react-router-dom";


function NavBar() {
    const [value, setValue] = useState("home");
   
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname);
        setValue(location.pathname);
    }, [location]);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Головна" value="/" icon={<HomeIcon />} onClick={() => navigate("/")} />
                <BottomNavigationAction label="Завдання" value="/tasks" icon={<TaskIcon />} onClick={() => navigate("/tasks")} />
                <BottomNavigationAction label="Аккаунт" value="/account" icon={<AccountBoxIcon />} onClick={() => navigate("/account")} />
            </BottomNavigation>
        </Paper>

    );
}

export default NavBar;
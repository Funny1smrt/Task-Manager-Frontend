import { useEffect } from "react";
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from "react-router-dom";


function NavBar() {
    const [value, setValue] = useState("/"); // Змінив початкове значення на '/'
    
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        // Уникаємо встановлення значення для URL, який не є маршрутом BottomNavigation
        const path = location.pathname.split('/')[1];
        setValue(path === '' ? '/' : `/${path}`);
    }, [location]);
    return (
        <>

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>

                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Головна" value="/" icon={<HomeIcon />} onClick={() => navigate("/")} />                    
                    <BottomNavigationAction label="Календар" value="/calendar" icon={<CalendarMonthIcon />} onClick={() => navigate("/calendar")} />
                    <BottomNavigationAction label="Завдання" value="/tasks" icon={<TaskIcon />} onClick={() => navigate("/tasks")} />
                    <BottomNavigationAction label="Аккаунт" value="/account" icon={<AccountCircleIcon />} onClick={() => navigate("/account")} />
                </BottomNavigation>
            </Paper>

        </>


    );
}

export default NavBar;
import { Box, SpeedDial, SpeedDialAction, Portal } from "@mui/material";
import { styled } from '@mui/material/styles';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useCallback, useMemo, useState } from "react";
import JournalInput from "../journals/JournalInput";
import TaskForm from "../tasks/TaskForm";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function ModalController({ container }) {
    const [showInput, setShowInput] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const handleToggleInput =useCallback( () => setShowInput(prev => !prev), []);
    const handleToggle =useCallback( () => setShowForm(prev => !prev), []);
    console.log("Рендер ModalController");
    const actions = useMemo(() => [{
        name: "Створити запис",
        icon: <NoteAddIcon />,
        handler: () => {
            handleToggleInput(); // Відкриваємо Modal
        },
        component: <JournalInput showInput={showInput} handleShowInput={handleToggleInput} />
    },
    {
        name: "Створити завдання",
        icon: <NoteAddIcon />,
        handler: () => {
            handleToggle(); // Відкриваємо Modal
        },
        component: <TaskForm showForm={showForm} handleShowForm={handleToggle} />
    }
    ], [showInput, showForm, handleToggleInput, handleToggle]);
    const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    }));

    return useMemo(() => (
        // 💡 КОНТЕЙНЕР ДЛЯ ЦЕНТРУВАННЯ ТА ФІКСОВАНОГО ПОЗИЦІОНУВАННЯ
        <Box
            sx={{
                position: "fixed",
                display: "flex",
                // backgroundColor: "primary.main",
                justifyContent: "center",
                alignItems: "center",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: "25px",
                zIndex: 1000,
            }}
        >
            {actions?.map((action) => (
                <Portal container={() => container.current} key={action.name}>
                    {action.component}
                </Portal>
            ))}
            {/* 💡 SPEEDDIAL */}
            <StyledSpeedDial
                ariaLabel="SpeedDial controller"
                icon={<SpeedDialIcon />}

                direction="up" // Напрямок відкриття
                // 💡 Встановлюємо позиціонування 'static' або 'relative' для коректного розміщення всередині центрувального Box
                sx={{ position: 'static' }}
            >
                {actions?.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        onClick={action.handler}
                    />
                ))}
            </StyledSpeedDial>
        </Box>
    ), [actions, container]);
}

export default ModalController;
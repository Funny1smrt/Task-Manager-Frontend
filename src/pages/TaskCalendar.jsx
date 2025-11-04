import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function TaskCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const isToday = (date) => {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isPastDate = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);
        return dateToCheck < today;
    };

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const days = getDaysInMonth(currentDate);
    const monthName = currentDate.toLocaleString('uk-UA', { month: 'long', year: 'numeric' });
    const weekDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    {/* Перемикач місяців */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <IconButton onClick={() => changeMonth(-1)}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
                            {monthName}
                        </Typography>
                        <IconButton onClick={() => changeMonth(1)}>
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    <hr />
                    <Grid container spacing={0.5} size={7} >
                        {/* Сітка календаря */}
                        <Grid spacing={5} size={7}>
                            {/* Дні тижня */}
                            <Grid />
                            {weekDays.map(day => (
                                // Використовуємо Grid item для днів тижня
                                <Grid key={day} size="grow">
                                    <Box sx={{ textAlign: 'center', fontWeight: 'bold', py: 1 }}>
                                        {day}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Дні місяця */}
                        <Grid  spacing={0.5} size={7}>
                            {days.map((day, index) => {
                                return (
                                    <Grid key={index} size={1}>
                                        <Box
                                            sx={{
                                                minHeight: 100,
                                                border: '1px solid #e0e0e0',
                                                borderRadius: 1,
                                                p: 0.5,
                                                bgcolor: '#f5f5f5',
                                                opacity: day && isPastDate(day) ? 0.7 : 1,
                                                cursor: day ? 'default' : 'not-allowed',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {day && (
                                                <>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: isToday(day) ? 'bold' : 'normal',
                                                            mb: 0.5,
                                                            color: isPastDate(day) ? 'text.disabled' : 'text.primary',
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        {day.getDate()}
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>
                                    </Grid>)
                            })}

                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
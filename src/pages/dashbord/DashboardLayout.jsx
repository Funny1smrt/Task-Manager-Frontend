import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const DashboardLayout = () => {
    return (
        <main>
            <NavBar />
            {/* <Outlet /> - це місце, де будуть відображатись ваші сторінки */}
            <Outlet />
        </main>
    );
};

export default DashboardLayout;
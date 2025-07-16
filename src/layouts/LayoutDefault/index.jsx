import './LayoutDefault.scss';
import Header from "../../components/Header";
import { Outlet } from 'react-router-dom';

function LayoutDefault() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default LayoutDefault;
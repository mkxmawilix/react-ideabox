import { Outlet, Navigate } from 'react-router-dom';

/** Hooks **/
import useAuth from '../../hooks/useAuth';

const PrivateRoutes = () => {
    const { auth } = useAuth();
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes;
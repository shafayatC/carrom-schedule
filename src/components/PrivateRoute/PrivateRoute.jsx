
import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
import { dataContextManager } from '../../App';
import { Navigate, Outlet } from 'react-router-dom';
// import { userContextManager } from '../../App';

const PrivateRoute = () => {
    const [getUserInfo] = useContext(dataContextManager); 

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return getUserInfo ? getUserInfo.status_code == 201 ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/" />;
    // return  201 == 201 ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
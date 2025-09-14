
import {  RouteIndex } from "@/helpers/RouteName";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const AdminAuthProtection = () => {
    const user = useSelector(state => state.user)
    //user Authentication
    if(user && user.isLoggedIn && user.user.role ==='admin'){
     return(

        <Outlet/>
    )
    }else{
        return <Navigate to={RouteIndex}/>
    }

 
};

export default AdminAuthProtection;

import React from "react";
import { useCon } from "./context/context";
import { Navigate } from "react-router-dom";


function ProtectRoute({children}) {
    let {user,loading}=useCon()

    if(loading) return <>Loading....</>

    return user?children:<Navigate to={"/login"}/>
}

export default ProtectRoute
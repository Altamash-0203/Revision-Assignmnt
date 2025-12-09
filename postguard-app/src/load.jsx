import React from "react";
import { useCon } from "./context/context";


function LoadCheck(){
    let {over}=useCon()

    if(!over) return null

    return(
        <>
        <div>
            loading.....
        </div>
        </>
    )
}

export default LoadCheck
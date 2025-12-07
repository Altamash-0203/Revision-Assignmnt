import { useEffect } from "react"
import { useState } from "react"

function UseState({id}){
let key=`nebula-${id}`

let load=()=>{
    try{
        return JSON.parse(localStorage.getItem(key))||{}
    }
    catch{
        return {}
    }
}

let [state,setState]=useState(load)

useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(state))
},[state,key])

return [state,setState]
}

export default UseState
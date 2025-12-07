import { useEffect } from "react"
import { useCallback } from "react"
import { useRef } from "react"
import { useState } from "react"
import { db } from "../firebase"
import { push, ref, set } from "firebase/database"


function UseOffline(id){
let [on,setOn]=useState(navigator.onLine)
let que=useRef([])

useEffect(()=>{
    let update=()=>setOn(navigator.onLine)
    window.addEventListener("online",update)
    window.addEventListener("offline",update)

    return()=>{
        window.removeEventListener("online",update)
        window.removeEventListener("offline",update)
    }
},[])


let w=useCallback(
    async data=>{
        if(!on) {
            que.current.push(data)
        return
            }

            try{
                let r=push(ref(db,`universes/${id}`))
                await set(r,data)
            }
            catch{
                que.current.push(data)
            }
    },
    [on,id]
)

useEffect(()=>{
    if(on && que.current.length) {
        let q=[...q.current]
        q.current=[]
        q.forEach(ele => {
            w(ele)
        });
    }
},[on,w])

return w

}

export default UseOffline
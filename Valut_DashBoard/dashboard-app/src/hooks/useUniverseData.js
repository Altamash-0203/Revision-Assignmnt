import { off, onValue, ref } from "firebase/database"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { db } from "../firebase"


function UseData(id,freeze)
{

    let [item,setItem]=useState([])
    let [pulse,setPulse]=useState(false)

    let buffer=useRef([])
    let time=useRef(null)


    useEffect(()=>{
        let r = ref(db, `universes/${id}`)
        let check=onValue(r,s=>{
            let val=s.val()||{}
            let arr=Object.entries(val).map(([id,v])=>({id,...v}))

            if(freeze) {
                buffer.current.push(arr)
                return
            }

            setItem(arr)
            glow()
        })
        return ()=>off(r,"value",check)

    },[id,freeze])


    useEffect(()=>{
        if(!freeze && buffer.current.length) {
            let newI=buffer.current.pop()
            buffer.current=[]
            setItem(newI)
            glow()
        }
    },[freeze])

    let glow=()=>{
        setPulse(true)
        clearTimeout(time.current)
        time.current=setTimeout(()=>setPulse(false),500)
    }

    return {item,pulse}
}

export default UseData
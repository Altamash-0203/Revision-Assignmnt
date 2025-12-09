import { useEffect, useState } from "react";
import { useCon } from "../context/context";
import { onValue, push, ref, remove, set } from "firebase/database";
import { db } from "../firebase";



function Projects(){
    let {user,setOver}=useCon()
    const [data,setData]=useState({})

    useEffect(()=>{

        if(!user) return
        let projectRef=ref(db,`u/${user.uid}/projects`)
        let unsub=onValue(projectRef,(snap)=>{
              setData(snap.val()||{})
        })
    
        return ()=>unsub()
    },[user])


    let add=async()=>{
        setOver(true)
        let p=push(ref(db,`u/${user.uid}/projects`))
        await set(p,{name:"new",text:"---"})
        setOver(false)
    }


   let del = id => remove(ref(db, `u/${user.uid}/projects/${id}`))


    return(
        <>
        <div>
            <h1>Projects</h1>
            <button onClick={add}>Add Project</button>
        </div>

        <div>
            <ul>
                {Object.entries(data).map(([i,p])=>(
                    <li key={i}>
                    <p>{p.name}</p>
                    <button onClick={()=>del(i)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default Projects
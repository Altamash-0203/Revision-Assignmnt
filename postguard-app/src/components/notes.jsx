import { useEffect, useState } from "react";
import { useCon } from "../context/context";
import { onValue, push, ref, remove, set } from "firebase/database";
import { db } from "../firebase";



function Notes(){
    let {user,setOver}=useCon()
    let [notes,setNotes]=useState({})

    useEffect(()=>{
        if(!user) return
        let notesRef=ref(db,`u/${user.uid}/notes`)
        let unSub=onValue(notesRef,(snap)=>setNotes(snap.val()||{}))

        return ()=>unSub()
    },[user])


    let add=async()=>{
        setOver(true)
            let n=push(ref(db,`u/${user.uid}/notes`))
            await set(n,{text:"Notes"})
            setOver(false)
        }
    let del=async(id)=>{
        setOver(true)
        await remove(ref(db,`u/${user.uid}/notes/${id}`))
       setOver(false)
    }
        return(
            <>
            <div>
                <h1>Notes</h1>
                <button onClick={add}>Add Notes</button>
            </div>

            <div>
                <ul>
                    {Object.entries(notes).map(([i,n])=>(
                        <li key={i}>
                        <p>{n.text}</p>
                       <button onClick={()=>del(i)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
            </>
        )
}

export default Notes
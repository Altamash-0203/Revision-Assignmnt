import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";


function LoginPage(){
    let [mail,setMail]=useState("")
    let [pass,setPass]=useState("")


    let login=async ()=>{

        try{
       await signInWithEmailAndPassword(auth,mail,pass)
        }
        catch(err){
            alert(err.message)
        }
    }
    return(
        <>
        <h1>User Login</h1>
        <div>
           <label>Email:
            <input type="text" 
            onChange={e=>setMail(e.target.value)}
            />
           </label>
            <label>Password:
            <input type="text" 
            onChange={e=>setPass(e.target.value)}
            />
           </label>

           <button onClick={login}>Login</button>
        </div>
        </>
    )
}


export default LoginPage
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
        catch (err) {
  console.error("Firebase login error:", err.code, err.message, err);
  alert(err.message);
}

    }
    return(
        <>
        <h1>User Login</h1>
        <div>
           <label>Email:
            <input type="email" 
            onChange={e=>setMail(e.target.value)}
            />
           </label>
            <label>Password:</label>
            <input type="password" 
            onChange={e=>setPass(e.target.value)}
            />
           

           <button onClick={login}>Login</button>
        </div>
        </>
    )
}


export default LoginPage
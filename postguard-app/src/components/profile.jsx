import { auth } from "../firebase";


function Profile(){
    return(
        <div>
            <h1>User profile</h1>

            <button onClick={()=>auth.signOut()}> Logout</button>
        </div>
    )
}

export default Profile
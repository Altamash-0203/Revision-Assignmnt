import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import ContextPro, { useCon } from "./context/context"
import { useEffect } from "react"
import LoadCheck from "./load"
import LoginPage from "./components/login"
import ProtectRoute from "./protected"
import Projects from "./components/Projects"
import Notes from "./components/notes"
import Profile from "./components/profile"
import { Navigate } from "react-router-dom"
  
  function LastUserInfo(){
    let {user,getLast}=useCon()
  let nav=useNavigate()


  useEffect(()=>{
    if(user) {
      let last=getLast()

      if(last) {
        let {section,id}=last
        nav(id ? `/${section}/${id}` : `/${section}`)

      }
    }
  },[user,getLast,nav])
  
  return null
  }

  function AppRoutes() {
    return(
      <>
      <LoadCheck/>
      <LastUserInfo/>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProtectRoute><Projects/></ProtectRoute>}/>
        <Route path="/notes" element={<ProtectRoute><Notes/></ProtectRoute>}/>
        <Route path="/profile" element={<ProtectRoute><Profile/></ProtectRoute>}/>
        </Routes>      
      </>
    )
  }


  function App() {
    return(
      <ContextPro>
        <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter>
      </ContextPro>
    )
  }

export default App

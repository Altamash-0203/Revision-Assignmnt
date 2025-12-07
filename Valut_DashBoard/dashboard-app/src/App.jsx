import { useState } from 'react'
import './App.css'
import UnviverseTab from './components/UniverseTab'
import Tab from './components/Tab'

function App() {
let [tab,setTab]=useState("artifacts")
  return (
    <>
    <Tab curr={tab} onChange={setTab}/>

    {tab=="artifacts" && <UnviverseTab id="artifacts"/>}
    {tab=="creatures" && <UnviverseTab id="creatures"/>}
    {tab=="logs" && <UnviverseTab id="logs"/>}
    </>
  )
}

export default App

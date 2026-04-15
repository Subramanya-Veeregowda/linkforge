import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react"
import Home from "./Pages/Home"
import UnlockPage from "./Pages/UnlockPage";
import ResolvePage from "./Pages/ResolvePage";
import MainLoader from "./features/loader/MainLoader";
import useLoader from "./features/loader/useLoader";
import QRCodePage from "./Pages/QRCodePage";


export default function App() {

  const loading = useLoader(1500);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "true"
  })

  useEffect(() => {

    localStorage.setItem("theme", dark)

    if (dark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

  }, [dark])

  if(loading){
    return <MainLoader dark={dark} setDark={setDark}/>
  }

  return (
    <Router>
    <Routes>
      
      <Route path="/unlock/:shortCode" element={<UnlockPage dark={dark} setDark={setDark}/>}></Route>
      <Route path="/:shortCode" element={<ResolvePage dark={dark} setDark={setDark}/>} />
      <Route path="/qr/:shortCode" element={<QRCodePage dark={dark} setDark={setDark}/>}/>
      <Route path="/" element={<Home dark={dark} setDark={setDark}/>}></Route>
      
    </Routes>
    </Router>
 
  )
}
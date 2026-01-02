import React from "react"
import {Routes,Route} from "react-router-dom"
import Signin from "./Components/Signin"
const App = () => {
  return(
    <>
    <Routes>
      <Route path = "/signin" element = {<Signin/>}/>
    </Routes>
    </>
  )
}
export default App 
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import WarehouseComponent from './components/WarehouseComponent'

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/warehouseUpdate' element={<WarehouseComponent/>}/>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/update/:id' element={<WarehouseComponent/>} />
        </Routes>


    </BrowserRouter>
  )
}

export default App

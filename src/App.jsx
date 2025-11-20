import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import WarehouseComponent from './components/WarehouseComponent'
import Items from './components/Items'
import Warehouse from './components/Warehouse'
import ItemForm from './components/ItemForm'
import ItemForWarehouseForm from './components/ItemForWarehouseForm'

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/warehouseUpdate' element={<WarehouseComponent/>}/>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/update/:id' element={<WarehouseComponent/>} />
          <Route path='/warehouse/:id' element={<Warehouse />} />
          <Route path='/items' element={<Items />} />
          <Route path='/itemForWarehouse' element={<ItemForWarehouseForm />} />
          <Route path='/item' element={<ItemForm />} />
          <Route path='/updateItem/:id' element={<ItemForm />} />
        </Routes>


    </BrowserRouter>
  )
}

export default App

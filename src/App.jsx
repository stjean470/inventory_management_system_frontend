import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './Header'
import Dashboard from './Dashboard'
import WarehouseComponent from './components/warehouse/WarehouseComponent'
import Items from './components/item/Items'
import Warehouse from './components/warehouse/Warehouse'
import ItemForm from './components/item/ItemForm'
import ItemForWarehouseForm from './components/item/ItemForWarehouseForm'
import Item from './components/item/Item'

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
          <Route path='/itemForWarehouse/:id' element={<ItemForWarehouseForm />} />
          <Route path='/item' element={<ItemForm />} />
          <Route path='/item-info/:id' element={<Item />} />
          <Route path='/updateItem/:id' element={<ItemForm />} />
        </Routes>


    </BrowserRouter>
  )
}

export default App

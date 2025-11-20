import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getItemsByWarehouse, getWarehouseById } from '../services/apiFunctions'


const Warehouse = () => {
    const [warehouse, setWarehouse] = useState({})
    const [items, setItems] = useState([])
    const {id} = useParams()
    const navigator = useNavigate()

    const getWarehouse = (id) => {
      getWarehouseById(id).then((response) => {   
        const warehouse = response.data
        console.log(warehouse)
        setWarehouse(warehouse)
      }).catch(error => console.log(error))
    }

    const getItemsForWarehouse = (id) => {
      getItemsByWarehouse(id).then((response) => {
        const items = response.data
        console.log(items)
        setItems(items)
      }).catch(error => console.log(error))
    }

    /*
    */

    useEffect(() => {
        if(id) {
          getWarehouse(id)
          getItemsForWarehouse(id)
        }
        
      }, [id])
  return (
    <div className='container'>
        <div className='row mb-2'>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>{warehouse.name}</h5>
                    <p className='card-text'>{warehouse.max_capacity}</p>
            
                </div>
            </div>
        </div>
        <div className='jumbotron jumbotron-fluid'>
          <h2>All items for warehouse</h2>
        </div>
        <div className='row'>
          <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Storage Location</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.itemName}</td>
                                <td>{item.sku}</td>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{item.storage_location}</td>
                                <td>
                                    <button className='btn btn-primary'>View</button>
                                    <button className='btn btn-success'>Update</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
          </table>
        </div>
        <div className='row'>
          <button type='button' className='btn btn-primary' onClick={() => navigator('/item')}>Add an item</button>
        </div>
    </div>
  )
}

export default Warehouse
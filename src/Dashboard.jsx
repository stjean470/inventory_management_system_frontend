import React, { useEffect, useState } from 'react'
import { deleteWarehouseById, getListWarehouses } from './services/apiFunctions'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [warehouses, setWarehouses] = useState([])

  const navigator = useNavigate()

  const getWarehouses = () => {
    getListWarehouses().then((response) => {
      setWarehouses(response.data)
    })
    .catch(error => console.log(error))
    
  }
  const updateWarehouse = (id) => {
    navigator(`/update/${id}`)
  }

  const viewWarehouse = (id) => {
    navigator(`/warehouse/${id}`)
  }

  const deleteWarehouse = (id) => {
    deleteWarehouseById(id).then((response) => {
      setWarehouses((prevWarehouses) => prevWarehouses.filter(warehouse => warehouse.id !== warehouse.id))
      getWarehouses()
    }).catch(error => console.log(error))
  }
  

  useEffect(() => {
    getWarehouses()
  }, [])
  
  return (
    <div className='container'>
        <h1 className='text-center'>Warehouse Dashboard</h1>
        <div className='row'>
          <div className='card col-lg-6 col-sm-12'>
            <div className='card-body'>
              <h5 className='card-title'>Warehouse Total</h5>
              <p className='card-text'>22</p>
            </div>
          </div>
          <div className='card col-lg-6 col-sm-12'>
            <div className='card-body'>
              <h5 className='card-title'>Warehouse Total</h5>
              <p className='card-text'>{warehouses.length}</p>
            </div>
          </div>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Max_Capacity</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              warehouses.map((warehouse) => {
                return (
                  <tr key={warehouse.id}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.max_capacity}</td>
                    <td>{warehouse.location.city}</td>
                    <td>{warehouse.location.state}</td>
                    <td>{warehouse.location.country}</td>
                    <td><button className='btn btn-primary' onClick={() => viewWarehouse(warehouse.id)}>View</button></td>
                    <td><button className='btn btn-success' onClick={() => updateWarehouse(warehouse.id)}>Update</button></td>
                    <td><button className='btn btn-danger' onClick={() => deleteWarehouse(warehouse.id)}>Delete</button></td>

                  </tr>
                )
                  
              })
            }
          </tbody>
        </table>
        
    </div>
  )
}

export default Dashboard
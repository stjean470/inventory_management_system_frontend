import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getItemById, getWarehousesByItemId } from '../../services/apiFunctions'
import ItemToWarhouseModal from './ItemToWarhouseModal'
import { FiEdit3 } from "react-icons/fi";
import { IoIosTrash } from "react-icons/io";
import { GrView } from "react-icons/gr";
const Item = () => {
    const [item, setItem] = useState({})
    const [warehouses, setWarehouses] = useState([])
    const [showModal, setShowModal] = useState(false)

    const {id} = useParams()

    const navigator = useNavigate()

    const getItem = (id) => {
        getItemById(id).then((response) => setItem(response.data))
        .catch(error => console.log(error))
    }

    const getWarehousesForItem = (id) => {
        getWarehousesByItemId(id).then((response) => setWarehouses(response.data))
        .catch(error => console.log(error))
    }

    const handleModal = () => {
        setShowModal(!showModal)
    }

    const viewWarehouse = (id) => {
        navigator(`/warehouse/${id}`)
    }
    useEffect(() => {
        if(id) {
            getItem(id)
            getWarehousesForItem(id)
        }
    }, [])
  return (
    <div className='container'>
        <div className='card mb-2'>
            <div className='card-header'>
                <h2 className='mb-0'>Item Details</h2>
            </div>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>Item Name</span>
                    <span>{item.itemName}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>SKU</span>
                    <span>{item.sku}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>Description</span>
                    <span>{item.description}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>Storage Location</span>
                    <span>{item.storage_location}</span>
                </li>
            </ul>
        </div>
        <div className='jumbotron jumbotron-fluid mb-3'>
          <h2 className='text-center'>All Warehouses Item Is Availiable</h2>
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
                    <td>
                      <span style={{margin: '5px'}}><GrView style={{cursor: 'pointer'}} onClick={() => viewWarehouse(warehouse.id)}/></span>
                    </td>
                  </tr>
                )
                  
              })
            }
          </tbody>
        </table>

        <div className='row d-flex justify-content-center'>
            <button type='button' className='btn btn-dark' onClick={handleModal}>Allocate Item to a Warehouse</button>
        </div>

        {
            showModal && <ItemToWarhouseModal showModal={showModal} item={item} handleModal={handleModal} warehouses={warehouses}/>
        }
    </div>
  )
}

export default Item
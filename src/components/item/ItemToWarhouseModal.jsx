import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import  Modal  from 'react-bootstrap/Modal'
import { addSpecificItemToWarehouse, getListWarehouses } from '../../services/apiFunctions'
import { BsXLg } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const ItemToWarhouseModal = (props) => {
    console.log(props)
    const {showModal, item, warehouses, handleModal} = props
    const [allWarehouses, setAllWarehouses] = useState([])
    const navigator = useNavigate()
    const getAllWarehouse = () => {
        getListWarehouses().then((response) => {
            setAllWarehouses(response.data)
        })
    }

    const addItemToWarehouse = (itemId, warehouseId) => {
        addSpecificItemToWarehouse(itemId, warehouseId).then((response) => {
            console.log(response.data)
            handleModal()
            navigator(`/warehouse/${warehouseId}`)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getAllWarehouse()
    }, [])
  return (
    <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Which Warehouse you want this Item at?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    allWarehouses.map((warehouse) => {
                        return (
                        <tr key={warehouse.id}>
                            <td>{warehouse.name}</td>
                            <td>{warehouse.max_capacity}</td>
                            <td>{warehouse.location.city}</td>
                            <td>{warehouse.location.state}</td>
                            <td>{warehouse.location.country}</td>
                            <td><button className='btn btn-primary' onClick={() => addItemToWarehouse(item.id, warehouse.id)}>Select</button></td>
                        </tr>
                        )
                        
                    })
                    }
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default ItemToWarhouseModal
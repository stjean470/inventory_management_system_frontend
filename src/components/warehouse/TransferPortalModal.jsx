import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import  Modal  from 'react-bootstrap/Modal'
import { getListWarehouses, transferFromWarehouseToWarehouse } from '../../services/apiFunctions'
import { useNavigate } from 'react-router-dom'
const TransferPortalModal = (props) => {
  const [warehouses, setWarehouses] = useState([])
  const {warehouse, item, showTransferModal, handleTransferPortal} = props

  const navigator = useNavigate();

  const getWarehouses = () => {
      getListWarehouses().then((response) => {
        const retrievedWarehouses = response.data
        const filteredWarehouses = retrievedWarehouses.filter((w) => w.id !== warehouse.id)
        setWarehouses(filteredWarehouses)
      })
      .catch(error => console.log(error))
      
  }

  const transferItem = (presentWarehouseId, itemId, newWarehouseId) => {
    transferFromWarehouseToWarehouse(presentWarehouseId, itemId, newWarehouseId).then(() => {
      handleTransferPortal()
      navigator(`/warehouse/${newWarehouseId}`)
    }).catch(error => console.log(error))
  } 

  useEffect(() => {
    getWarehouses()
  }, [])
  return (
    <Modal show={showTransferModal} onHide={handleTransferPortal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
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
                    warehouses.map((w) => {
                        return (
                        <tr key={w.id}>
                            <td>{w.name}</td>
                            <td>{w.max_capacity}</td>
                            <td>{w.location.city}</td>
                            <td>{w.location.state}</td>
                            <td>{w.location.country}</td>
                            <td><button className='btn btn-primary' onClick={() => transferItem(warehouse.id, item.id, w.id)}>Select</button></td>
                        </tr>
                        )
                        
                    })
                    }
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTransferPortal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTransferPortal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default TransferPortalModal
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteItemInWarehouse, getItemsByWarehouse, getWarehouseById } from '../../services/apiFunctions'
import { BiTransfer } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { IoIosTrash } from "react-icons/io";
import { GrView } from "react-icons/gr";
import TransferPortalModal from './TransferPortalModal';

const Warehouse = () => {
    const [warehouse, setWarehouse] = useState({})
    const [items, setItems] = useState([])
    const [item, setItem] = useState({})
    const [showTransferModal, setShowTranferModal] = useState(false)
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

    const deleteItem = (warehouseId, itemId) => {
      deleteItemInWarehouse(warehouseId, itemId).then(() => getItemsForWarehouse(warehouseId))
      .catch(error => console.log(error))
    }

    const viewItem = (id) => {
        navigator(`/item-info/${id}`)
    }
    const updateItem = (id) => {
        navigator(`/updateItem/${id}`)
    }

    const goToTransferPortal = (item) => {
      setItem(item)
      handleTransferPortal()
    }

    const handleTransferPortal = () => {
      setShowTranferModal(!showTransferModal)
    }

    useEffect(() => {
        if(id) {
          getWarehouse(id)
          getItemsForWarehouse(id)
        }
        
      }, [id])
  return (
    <div className='container'>
        <div className='card mb-2 mt-2'>
            <div className='card-header'>
                <h2 className='text-center'>Warehouse Details</h2>
            </div>
            <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>Company</span>
                    <span>{warehouse.name}</span>
                </li>
                <li className='list-group-item d-flex justify-content-between'>
                    <span className='fw-semibold'>Max Capacity</span>
                    <span>{warehouse.max_capacity}</span>
                </li>
            </ul>
        </div>
        <div className='jumbotron jumbotron-fluid'>
          <h2 className='text-center'>All Items For Warehouse</h2>
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
                                    <BiTransfer style={{cursor: 'pointer', margin: '5px'}} onClick={() => goToTransferPortal(item)} />   
                                    <GrView style={{cursor: 'pointer', margin: '5px'}} onClick={() => viewItem(item.id)}/>
                                    <FiEdit3 style={{cursor: 'pointer', margin: '5px'}} onClick={() => updateItem(item.id)}/>
                                    <IoIosTrash style={{cursor: 'pointer', margin: '5px'}} onClick={() => deleteItem(warehouse.id, item.id)}/>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
          </table>
        </div>
        <div className='row'>
          <button type='button' className='btn btn-primary' onClick={() => navigator(`/itemForWarehouse/${id}`)}>Add an item</button>
        </div>

        {showTransferModal && <TransferPortalModal warehouse={warehouse} item={item} showTransferModal={showTransferModal} handleTransferPortal={handleTransferPortal}/>}
    </div>
  )
}

export default Warehouse
import axios from "axios";
//API calls to warehouse endpoints
const BASE_WAREHOUSE_URL = 'http://localhost:8080/warehouses'
const BASE_ITEMS_URL = 'http://localhost:8080/items'
export const getListWarehouses = () => axios.get(BASE_WAREHOUSE_URL)
export const addWarehouse = (warehouse) => axios.post(BASE_WAREHOUSE_URL + '/new_warehouse', warehouse)
export const getWarehouseById = (id) => axios.get(BASE_WAREHOUSE_URL + '/warehouse/' + id)
export const updateWarehouse = (id, warehouse) => axios.put(BASE_WAREHOUSE_URL + '/update/' + id, warehouse)
export const deleteWarehouseById = (id) => axios.delete(BASE_WAREHOUSE_URL + '/delete/' + id)
export const getItemsByWarehouse = (id) => axios.get(BASE_WAREHOUSE_URL + '/warehouseItems/' + id)
//API Calls for Items
export const getAllItems = () => axios.get(BASE_ITEMS_URL)
export const addItem = (item) => axios.post(BASE_ITEMS_URL + '/item', item)
export const getItemById = (id) => axios.get(BASE_ITEMS_URL + '/item/' + id)
export const updateItem = (id, item) => axios.put(BASE_ITEMS_URL + '/update-item/' + id, item)
export const deleteItemById = (id) => axios.delete(BASE_ITEMS_URL + '/delete/' + id)
import axios from "axios";
const BASE_WAREHOUSE_URL = 'http://localhost:8080/warehouses'
export const getListWarehouses = () => axios.get(BASE_WAREHOUSE_URL)
export const addWarehouse = (warehouse) => axios.post(BASE_WAREHOUSE_URL + '/new_warehouse', warehouse)
export const getWarehouseById = (id) => axios.get(BASE_WAREHOUSE_URL + '/warehouse/' + id)
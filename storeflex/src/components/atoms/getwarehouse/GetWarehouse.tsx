import React, {useState, useEffect} from "react";
import { FormControl, Select, MenuItem } from '@mui/material';
import Api from '../../../api/Api';
import { objectData } from '../../../utils/ResponseSchema';

interface storeWarehouse {
    warehouse?: string;
    onWarehouseChange?(warehouseId?: string): void;
}

const GetWarehouse = (props?: storeWarehouse) => {

    const api = new Api();
    const [warehouseList, setWarehouseList] = useState([]);
    const [warehouseCode, setWarehouseCode] = useState<objectData>({val: 'Select Warehouse'});

    useEffect(() => {
        getWarehouse();
    }, []);

    const getWarehouse =() => {
        api.getActiveWHlist().then((resp) => {
             if(resp?.methodReturnValue) { 
                setWarehouseList(resp.methodReturnValue);
             }
        }).catch((error)=>{
             console.log(' getActiveWarehouselist fail >> ', error);
         });
     };

     const handleChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        setWarehouseCode(obj);
        if(props?.onWarehouseChange) {
            props.onWarehouseChange(obj.val)
        }
    };

    return (
        <>
            <FormControl size="small" fullWidth={true}>
                <Select autoWidth={false} defaultValue="" onChange={handleChange}>
                    {warehouseList.map((item, index) => { 
                        const itemCode = Object.keys(item).toString();
                        const itemName = Object.values(item).toString();
                        return (
                            <MenuItem key={index + 1} value={itemCode}>{itemName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </>
    )

}

export default GetWarehouse;
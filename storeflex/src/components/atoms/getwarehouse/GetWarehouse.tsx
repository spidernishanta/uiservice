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
        const data = {
            page: '0',
            size: '10',
            status: 'ACTIVE',
        }
        api.getWarehouseAdmin(data).then((resp) => {
             if(resp?.methodReturnValue?.warehouseViewBean) {
                setWarehouseList(resp.methodReturnValue.warehouseViewBean);
             }
        }).catch((error)=>{
             console.log(' getWarehouse success >> ', error);
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
                        const itemCode = item['warehouseId'];
                        const itemName = item['warehouseName'];
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
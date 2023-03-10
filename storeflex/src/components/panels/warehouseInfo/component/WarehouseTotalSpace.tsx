import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import WearehousePricing from "./WearehousePricing";

interface WearehousePricingProps {
    onUpdate?: (data: any) => void;
    data?: Warehouseprice[];
    showHeading?: boolean;
}

const minAvailableSpace = 100;
const maxAvailableSpace = 200000; // yet to confirm;
const WarehouseTotalSpace = (props: WearehousePricingProps) => {
    const [defaultData, setDefaultData] = useState<Warehouseprice[]>();
    const [updatedData, setUpdatedData] = useState<Warehouseprice[]>();
    const [totalAvailableSpace, setTotalAvailableSpace] = useState(100);

    useEffect(() => {
        if (props?.data && props?.data.length > 0 ) {
            setDefaultData(props.data);
        }
    }, []);
    useEffect(() => {
        onChangeUpdateInfo();
    }, [updatedData]);

    const onChangeUpdateInfo = () => {
        if (props?.onUpdate) {
            console.log('<<updatedData>>', updatedData);
            // props.onUpdate(updatedData);
        }
    }

    const checkMinAvailableSpace = (space: any ) => {
        if(space >= minAvailableSpace || space >= totalAvailableSpace) {
            console.log(' Avaiable ');
            setTotalAvailableSpace(space);
        } else {
            console.log(' Not Avaiable ');
        }
    }
    const onWearehousePricingUpdate = (pricingInfo?: Warehouseprice) => {
        checkMinAvailableSpace(pricingInfo?.availspace);
    }

    const handlePriceAdd = () => {
        // setPriceList([...priceList, { price:"" }]);
    }
    const handlePriceRemove = (index) => {
        // const list = [...priceList];
        // list.splice(index,1);
        // setPriceList(list);
    }
    const showAddREmove = () => {
        return(
            <>
            <div>
            <Button variant="contained" color="primary" onClick={handlePriceAdd} style={{marginLeft:'20px'}}>Add Pricing</Button>
            </div>
            <Button variant="contained" color="secondary" onClick={()=>handlePriceRemove('index')} style={{marginLeft:'20px'}}>Remove Pricing</Button>
            <div>
            </div>
            </>
        )
    }
    return (
        <>
            <div>
            {props.showHeading && 
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                </div>
            }
            {<WearehousePricing data={{}} onWearehousePricingUpdate={onWearehousePricingUpdate} />}
            {showAddREmove()}
            </div>
        </>
    )
}
export default WarehouseTotalSpace;

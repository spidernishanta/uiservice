import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import WearehousePricing from "./WearehousePricing";

interface WearehousePricingProps {
    onUpdate?: (data: any) => void;
    data?: Warehouseprice[];
    showHeading?: boolean;
}

interface wlList {
    [key: string]: Warehouseprice;
}

const maxWhNo = 5;
const minAvailableSpace = 100;
const maxAvailableSpace = 200000; // yet to confirm;
const WarehouseTotalSpace = (props: WearehousePricingProps) => {
    const [defaultTotalWh, setDefaultTotalWh] = useState<Warehouseprice[]>();
    const [updatedWhList, setUpdatedWhlList] = useState<wlList>({'_1': {}});
    const [totalAvailableSpace, setTotalAvailableSpace] = useState(100);
    const [sendData, setSendData] = useState(false);

    useEffect(() => {
        if (props?.data && props?.data.length > 0 ) {
            setDefaultTotalWh(props.data);
            setWhList(props.data)
        } else {
            setWhList();
        }
    }, []);

    useEffect(() => {
        if(sendData) {
            onChangeUpdateInfo();
        }
    }, [sendData]);

    const onChangeUpdateInfo = () => {
        if (props?.onUpdate) {
            setSendData(false);
            const tempList = Object.entries(updatedWhList);
            const tempArry: Warehouseprice[] = [];
            tempList.map((item) => {
                console.log(item[1]);
                tempArry.push(item[1])
            })
            // console.log('<< updatedWhList send data >>', tempArry);
            props.onUpdate(tempArry);
        }
    }

    const setWhList = (arry?: any) => {
        if(arry && arry.length > 0) {
            // To Do
        } 
    }

    const addNewWhPricing = (action: string) => {
        const tempList = Object.entries(updatedWhList);
        if(action === 'ADD' && updatedWhList && tempList.length < maxWhNo) {
            // const tempList = Object.entries(updatedWhList);
            const objId = `_${tempList.length + 1}`;
            setUpdatedWhlList({...updatedWhList, [objId]: {} as Warehouseprice});
            setSendData(true);
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
    const onWearehousePricingUpdate = (pricingInfo?: Warehouseprice, displayId?: string) => {
        if(pricingInfo && displayId ) {
            setUpdatedWhlList({...updatedWhList, [displayId]: pricingInfo});
            setSendData(true);
        }
    }

    const handleRemove = (index) => {
        // const list = [...priceList];
        // list.splice(index,1);
        // setPriceList(list);
    }

    const showAddREmove = () => {
        return(
            <div className="p-sm">
            <Button variant="contained" color="primary" onClick={()=> addNewWhPricing('ADD')} style={{marginLeft:'20px'}}>Add Pricing</Button>
            </div>
        )
    }

    const showWhPricing = () => {
        if(updatedWhList) {
            const tempList = Object.entries(updatedWhList);
            return tempList.map((whItem, index) => {
                const keyId = whItem[0]
                return (
                    <div key={keyId}>
                        <div className='p-md sf-box-shadow-blue'>
                            <div className="f-24px p-bot-sm align-c"> Availability {index + 1}</div>
                            {<WearehousePricing data={{}} displayId={keyId} onWearehousePricingUpdate={onWearehousePricingUpdate} />}
                            <div className="align-rigth">
                            <Button variant="contained" color="secondary" onClick={()=>handleRemove('index')} style={{marginLeft:'20px'}}>Remove Pricing</Button>
                            </div>
                        </div>
                    </div>
                )
            })
        }
         else {
            return (<> </>)
         }
    }
    return (
        <>
            <div>
            {props.showHeading && 
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                </div>
            }
            {showWhPricing()}
            {showAddREmove()}
            </div>
        </>
    )
}
export default WarehouseTotalSpace;

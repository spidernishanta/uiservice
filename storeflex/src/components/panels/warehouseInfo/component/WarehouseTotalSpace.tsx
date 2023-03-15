import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import WearehousePricing from "./WearehousePricing";

interface WearehousePricingProps {
    onUpdate?: (data: any) => void;
    data?: Warehouseprice[];
    showAddBtn?: boolean;
    showRemoveBtn?: boolean;
}

interface wlList {
    [key: string]: Warehouseprice;
}

const maxWhNo = 5;
const minAvailableSpace = 100;
const maxAvailableSpace = 200000; // yet to confirm;
let isUpdate = false;
const WarehouseTotalSpace = (props: WearehousePricingProps) => {
    const [defaultTotalWh, setDefaultTotalWh] = useState<Warehouseprice[]>();
    const [updatedWhList, setUpdatedWhlList] = useState<Array<Warehouseprice>>([{}]);
    const [totalAvailableSpace, setTotalAvailableSpace] = useState(100);
    const [sendData, setSendData] = useState(false);
    const [disableAddBtn, setDisableAddBtn] = useState(false);
    const [disableRemoveBtn, setDisableRemoveBtn] = useState(true);

    useEffect(() => {
        if (props?.data && props?.data.length > 0 ) {
            setDefaultTotalWh(props.data);
            setUpdatedWhlList(props.data);
            setWhList(props.data)
        } else {
            setWhList();
        }
    }, []);

    useEffect(() => {
        // if(sendData) {
        //     onChangeUpdateInfo();
        // }
        if(isUpdate && updatedWhList?.length > 0) {
            isUpdate = false;
            onChangeUpdateInfo();
            let wlLishLengh = updatedWhList.length;
            wlLishLengh >= maxWhNo ? setDisableAddBtn(true) : setDisableAddBtn(false);
            wlLishLengh > 1 ? setDisableRemoveBtn(false) : setDisableRemoveBtn(true);
        }
        
    }, [updatedWhList]);

    const onChangeUpdateInfo = () => {
        if (props?.onUpdate) {
            const arryList = [...updatedWhList];
            arryList.forEach((item) => {
                item.idforui = undefined;
            })
            console.log(updatedWhList, '<< updatedWhList send data >>', arryList);
           props.onUpdate(arryList);
        }
    }

    const setWhList = (arry?: any) => {
        if(arry && arry.length > 0) {
            // To Do
        } 
    }

    const addNewWhPricing = (action: string) => {
        const tempList = updatedWhList;
        if(action === 'ADD' && updatedWhList && tempList.length < maxWhNo) {
            const objId = `_${tempList.length}`;
            const obj = {} as Warehouseprice;
            obj.idforui = objId;
            setUpdatedWhlList([...updatedWhList, obj]);
        } 
    }

    const handleRemove = (objectId) => {
        console.log(' handleRemove >>>>> ', objectId);
        if(objectId) {
            setUpdatedWhlList(updatedWhList.filter( item => item.idforui !== objectId));
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
            isUpdate = true;
            console.log(' displayId >>>  ', displayId);
            const updateArry = updatedWhList.map((item) => {
                if(item.idforui === displayId) {
                    console.log('  displayIddisplayId ' , displayId);
                    // item = pricingInfo;
                    return pricingInfo;
                } else {
                    return item;
                }
            });
            setUpdatedWhlList(updateArry);
        }
    }

    const showWhPricing = () => {
        if(updatedWhList) {
            const tempList = updatedWhList;
            return tempList.map((whItem, index) => {
                whItem.idforui = `_${index}`;
                const keyId = whItem.idforui
                return (
                    <div key={keyId}>
                        <div className='p-md sf-box-shadow-blue'>
                            <div className="f-24px p-bot-sm align-c"> Availability {index + 1}</div>
                            {<WearehousePricing data={whItem} displayId={keyId} onWearehousePricingUpdate={onWearehousePricingUpdate} />}
                            { props.showRemoveBtn && 
                                <div className="align-rigth">
                                <Button variant="contained" disabled={disableRemoveBtn} color="secondary" onClick={()=>handleRemove(keyId)} style={{marginLeft:'20px'}}>Remove Pricing</Button>
                                </div>
                            }
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
            {!props.showAddBtn &&
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                </div>
            }
            {showWhPricing()}
            {props.showAddBtn && 
                <div className="p-sm">
                <Button variant="contained" disabled={disableAddBtn} color="primary" onClick={()=> addNewWhPricing('ADD')} style={{marginLeft:'20px'}}>Add Pricing</Button>
                </div>
            }
            </div>
        </>
    )
}
export default WarehouseTotalSpace;

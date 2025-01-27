import React, { useEffect, useState, useContext } from 'react';
import { Button } from '@mui/material';
import swal from 'sweetalert';
import { CmsContext } from '../../../context/ContextProvider';
import Api from '../../../../src/api/Api';
import { LoaderFull } from '../../atoms/loader/loader';
import WearehouseAddress from './component/WearehouseAddress';
// import WearehousePricing from './component/WearehousePricing';
import WarehouseTotalSpace from './component/WarehouseTotalSpace';
import WarehouseHours from './component/WarehouseHours';
import WarehouseLayout, { WarehouseLayoutObj } from './component/WarehouseLayout';
import WarehouseDetails from './component/WarehouseDetails';
import { WarehousePostData } from '../../../api/ApiConfig';
import { WhDetail } from './component/WarehouseDetails';
import { Address, objectData, Warehouseprice, WhsHours } from '../../../utils/ResponseSchema';
import Accordion from 'react-bootstrap/Accordion';



const AddWarehouse = () => {

    const api = new Api();
    const [isLoader, setIsLoader] = useState(false);
    const [whDetails, setWhDetails] = useState<WhDetail>({});
    const [whAddress, setWhAddress] = useState<Address>({});
    const [pricing, setPricing] = useState<Warehouseprice>({});
    const [whHours, setWhHours] = useState<WhsHours>({});
    const [whLayout, setLayout] = useState<WarehouseLayoutObj>({});
    const [whPriceList, setWhPriceList] = useState<Warehouseprice[]>();

    const [priceList, setPriceList] = useState([{ price: "" }]);

    const handlePriceAdd = () => {
        setPriceList([...priceList, { price: "" }]);
    }

    const onWarehouseDetailsUpdate = (data: WhDetail) => {
        setWhDetails(data);
        console.log(' onWarehouseDetailsUpdate >>> ', data);
    }
    const onWearehouseAddressUpdate = (data: Address) => {
        setWhAddress(data);
        console.log(' onWearehouseAddressUpdate >>> ', data);
    }
    const onWearehousePricingUpdate = (data: any) => {
        setWhPriceList(data);
        console.log(' onWearehousePricingUpdate >>> ', data);
    }
    const onWarehouseHoursUpdate = (data: any) => {
        setWhHours(data);
        console.log(' onWarehouseHoursUpdate >>> ', data);
    }
    const onWarehouseLayoutUpdate = (data: any) => {
        setLayout(data);
        console.log(' onWarehouseLayoutUpdate >>> ', data);
    }

    const addWarehouse = () => {

        if (!whDetails?.warehouseName) {
            alert('Warehouse Name is Required');
        }
        else if (!whDetails?.descp) {
            alert('Warehouse Description is required');
        }
        else if (!whDetails?.warehouseTaxId) {
            alert('gst is required');
        }
        else if (!whDetails?.clientId) {
            alert('Client id is required');
        }
        else if (!whAddress?.plotNo) {
            alert('Plot No is required');
        }
        else if (!whAddress?.houseNo) {
            alert('House No is required');
        }
        else if (!whAddress?.streetDetails) {
            alert('Street No is required');
        }
        else if (!whAddress?.state) {
            alert('State is required');
        }
        else if (!whAddress?.city) {
            alert('City is required');
        }
        else if (!whAddress?.country) {
            alert('country is required');
        }
        else if (!whAddress?.pincode) {
            alert('Pincode is required');
        }
        else if (!whLayout?.dockhighdoors) {
            alert('Dock high door is required');
        }
        else if (!whLayout?.atgradedoors) {
            alert('At grade door is required');
        }
        else if (!whLayout?.ceillingheight) {
            alert('Clear Ceilling Height is required');
        }
        else if (!whLayout?.forkliftcapacity) {
            alert('Max Forklift Capacity is required');
        }
        // else if (!pricing?.availspace) {
        //     alert('Total Available Space is required');
        // }
        // else if (!pricing?.ratesqtft) {
        //     alert('Rate(Rs)/sq.ft/month is required');
        // }
        // else if (!pricing?.minordersqt) {
        //     alert('Minimum Order Quantity is required');
        // }
        else if (!whHours?.starttime) {
            alert('Facility houres is required');
        }
        else if (!whLayout?.facilitiesId) {
            alert('Facility qualifications is required');
        }
        else if (!whLayout?.storagesId) {
            alert('Storage layout is required');
        }
        else if (!whLayout?.industryId) {
            alert('Industries served is required');
        }


        else {
            const buildPostData = {} as WarehousePostData;
            buildPostData.clientId = whDetails?.clientId;
            buildPostData.warehouseName = whDetails?.warehouseName;
            buildPostData.warehouseTaxId = whDetails?.warehouseTaxId;
            buildPostData.descp = whDetails?.descp;
            buildPostData.address = [whAddress];
            buildPostData.hours = whHours;
            buildPostData.warehousepriceList = whPriceList;
            buildPostData.facilitiesId = whLayout.facilitiesId;
            buildPostData.industryId = whLayout.industryId;
            buildPostData.storagesId = whLayout.storagesId;
            buildPostData.dockhighdoors = whLayout.dockhighdoors;
            buildPostData.atgradedoors = whLayout.atgradedoors;
            buildPostData.ceillingheight = whLayout.ceillingheight;
            buildPostData.forkliftcapacity = whLayout.forkliftcapacity;

            setIsLoader(true);
            api.addWarehouse(buildPostData).then((resp) => {
                setIsLoader(false);
                if (resp && resp.methodReturnValue.clientId) {
                    // upladPhoto(imageData, resp.methodReturnValue.clientId);
                }
                swal('Success! Your warehouse has been added successfully!', {
                    icon: "success",
                    buttons: {
                        buttonOne: {
                            text: "OK",
                            visible: true,
                            className: "sf-btn",
                        }
                    }
                });
            }).catch((error) => {
                setIsLoader(false);
                console.log(' addWarehouse creation erroor ', error);
            });
        }
    }

    const cmsContent = useContext(CmsContext);
    const warehouseContent = cmsContent['warehouse'];

    return (
        <>
            {isLoader && <LoaderFull />}
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='sf-ac'>
                        <div className='primary-gradient w100'>
                            <div className='font-white p-sm f-18px f-bold'>{warehouseContent?.warehouseInfoText}</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <> {<WarehouseDetails onWarehouseDetailsUpdate={onWarehouseDetailsUpdate} />}</>
                        <> {<WearehouseAddress onWearehouseAddressUpdate={onWearehouseAddressUpdate} />}</>
                        <> {<WarehouseHours onWarehouseHoursUpdate={onWarehouseHoursUpdate} />}</>
                        <> {<WarehouseLayout onWarehouseLayoutUpdate={onWarehouseLayoutUpdate} />}</>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header className='sf-ac'>
                        <div className='primary-gradient w100'>
                            <div className='font-white p-sm f-18px f-bold'>{warehouseContent?.warehousePricingText}</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        {<WarehouseTotalSpace showAddBtn={true} showRemoveBtn={true} onUpdate={onWearehousePricingUpdate} />}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='p-top-md align-c'>
                <Button className='sf-btn' variant="contained" onClick={() => window.history.back()}> Cancel </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button className="btn primary-btn sf-btn" variant="contained" onClick={() => { addWarehouse() }}> Save </Button>
            </div>
        </>
    )
}

export default AddWarehouse;

import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Button } from '@mui/material';
import swal from 'sweetalert';
import Api from '../../../../src/api/Api';
import { LoaderFull } from '../../atoms/loader/loader';
import WearehouseAddress from './component/WearehouseAddress';
import WearehousePricing from './component/WearehousePricing';
import WarehouseHours from './component/WarehouseHours';
import WarehouseLayout, { WarehouseLayoutObj } from './component/WarehouseLayout';
import WarehouseDetails from './component/WarehouseDetails';
import { WarehousePostData } from '../../../api/ApiConfig';
import { WhDetail } from './component/WarehouseDetails';
import { Address, Warehouseprice, EditWarehouseDetails, 
    WarehouseInfo, WhsHours } from '../../../utils/ResponseSchema';

interface EditWarehouseProps {
    profileData?: EditWarehouseDetails;
    onSave?(isSaved: boolean): void;
    action?: string;
}
const EditWarehouse = (props: EditWarehouseProps) => {

    const location = useLocation();
    // const navigate = useNavigate();
    const api = new Api();
    const [warehouseGetData, setWarehouseGetData] = useState<WarehouseInfo>({});
    const [isLoader, setIsLoader] = useState(false);
    const [whDetails, setWhDetails] = useState<WhDetail>({});
    const [whAddress, setWhAddress] = useState<Address>({});
    const [whPricing, setWhPricing] = useState<Warehouseprice[]>();
    const [whHours, setWhHours] = useState<WhsHours>({});
    const [whLayout, setLayout] = useState<WarehouseLayoutObj>({});
    const [warehouseStatus, setWarehouseStatus] = useState('');
    const [warehouseStatusTypeInfo, setWarehouseStatusTypeInfo] = useState('');

    useEffect(() => {
        const whId = location.state.editRecord;
        getWarehouseDataById(whId);
    }, []);

    const getWarehouseDataById = (whId: string) => {
        setIsLoader(true);
        api.getWarehouseById(whId).then((resp) => {
            setIsLoader(false);
            if (resp.methodReturnValue) {
                warehouseDataFormatter(resp);
            }
        }).catch((error) => {
            setIsLoader(false);
            console.log(' updateWarehouse creation erroor ', error);
        });
    }

    const warehouseDataFormatter = (whInfo: WarehouseInfo) => {
        const data = whInfo.methodReturnValue;
        const whDetailObj = {} as WhDetail;
        whDetailObj.clientId = data?.clientId;
        whDetailObj.clientName = data?.clientName;
        whDetailObj.warehouseId = data?.warehouseId;
        whDetailObj.warehouseName = data?.warehouseName;
        whDetailObj.warehouseTaxId = data?.warehouseTaxId;
        whDetailObj.descp = data?.descp;
        onWarehouseDetailsUpdate(whDetailObj);

        const address = data?.address?.[0];
        const whAddressObj = {} as Address;
        whAddressObj.addressId = address?.addressId;
        whAddressObj.addressType = address?.addressType;
        whAddressObj.city = address?.city;
        whAddressObj.country = address?.country;
        whAddressObj.houseNo = address?.houseNo;
        whAddressObj.pincode = address?.pincode;
        whAddressObj.plotNo = address?.plotNo;
        whAddressObj.state = address?.state;
        whAddressObj.streetDetails = address?.streetDetails;
        onWearehouseAddressUpdate(whAddressObj);

        const warehousepriceList = [
            {
              "priceId": "389116d6-beef-4785-b0f8-4a97670772d3",
              "availspace": "2000",
              "ratesqtft": "100",
              "minordersqt": "1000",
              "createBy": "ADMIN",
              "createDate": "2023-01-06",
              "updateDate": null,
              "startLease": "2023-01-06",
              "endLease": "2023-12-06"
            },
            {
              "priceId": "a41236f8-d6af-49c1-8235-c7ef6112cb10",
              "availspace": "2000",
              "ratesqtft": "100",
              "minordersqt": "1000",
              "createBy": "ADMIN",
              "createDate": "2023-01-06",
              "updateDate": null,
              "startLease": "2023-01-06",
              "endLease": "2023-12-06"
            }
          ]
        onWearehousePricingUpdate(warehousepriceList);
        onWarehouseHoursUpdate(data?.hours || {});
        setWarehouseGetData(whInfo);
        setWarehouseStatus(data?.status || '');
    };

    const onWarehouseDetailsUpdate = (data: WhDetail) => {
        setWhDetails(data);
        console.log(' onWarehouseDetailsUpdate >>> ', data);
    }
    const onWearehouseAddressUpdate = (data: Address) => {
        setWhAddress(data);
        console.log(' onWearehouseAddressUpdate >>> ', data);
    }
    const onWearehousePricingUpdate = (data: any) => {
        setWhPricing(data);
        console.log(' onWearehousePricingUpdate >>> ', data);
    }
    const onWarehouseHoursUpdate = (hrs: WhsHours) => {
        setWhHours(hrs);
        console.log(' onWarehouseHoursUpdate >>> ', hrs);
    }
    const onWarehouseLayoutUpdate = (data: any) => {
        setLayout(data);
        console.log(' onWarehouseLayoutUpdate >>> ', data);
    }

    const updateWarehouse = () => {
        const buildPostData = {} as WarehousePostData;
        buildPostData.clientId = whDetails?.clientId || warehouseGetData.methodReturnValue?.clientId;
        buildPostData.warehouseId = whDetails.warehouseId || warehouseGetData.methodReturnValue?.warehouseId;
        buildPostData.warehouseName = whDetails?.warehouseName;
        buildPostData.warehouseTaxId = whDetails?.warehouseTaxId;
        buildPostData.descp = whDetails?.descp;
        buildPostData.address = [whAddress];
        buildPostData.hours = whHours;
        buildPostData.facilitiesId = whLayout.facilitiesId;
        buildPostData.industryId = whLayout.industryId;
        buildPostData.storagesId = whLayout.storagesId;
        buildPostData.dockhighdoors = whLayout.dockhighdoors;
        buildPostData.atgradedoors = whLayout.atgradedoors;
        buildPostData.ceillingheight = whLayout.ceillingheight;
        buildPostData.forkliftcapacity = whLayout.forkliftcapacity;
        buildPostData.warehousepriceList = whPricing;
        buildPostData.status = warehouseStatusTypeInfo; console.log(warehouseStatusTypeInfo);

        console.log('<< buildPostData >>', buildPostData);
        // setIsLoader(true);
        // api.addWarehouse(buildPostData).then((resp) => {
        //     setIsLoader(false);
        //     if (resp && resp.methodReturnValue.clientId) {
        //         // upladPhoto(imageData, resp.methodReturnValue.clientId);
        //     }
        //     swal('Success! Your warehouse has been added successfully!', {
        //         icon: "success",
        //         buttons: {
        //             buttonOne: {
        //                 text: "OK",
        //                 visible: true,
        //                 className: "sf-btn",
        //             }
        //         }
        //     });
        // }).catch((error) => {
        //     setIsLoader(false);
        //     console.log(' updateWarehouse creation erroor ', error);
        // });
    }

    const selectWarehouseStatusType = (event: any) => {
        const val = event.target.value || '';
        setWarehouseStatusTypeInfo(val);
    }
    return (
        <>
            {isLoader && <LoaderFull />}
            <div className='m-bot-lg'>
                <div className='primary-gradient m-bot-md'>
                    <div className='font-white p-sm f-18px f-bold'>Status</div>
                </div>
                <div className='p-md'>
                    <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                        <Grid item xs={9}>
                            <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                                <Grid item xs={4}>
                                    <div style={{ marginBottom: '8px' }}>
                                        <div className='pb-2'><i>Select Status</i></div>
                                        <select name="addresstype" className="form-control" onChange={selectWarehouseStatusType}>
                                            <option value={warehouseStatus}>{warehouseStatus}</option>
                                            {!(warehouseStatus === 'ACTIVE') ? <option value="ACTIVE">ACTIVE</option> : ''}
                                            {!(warehouseStatus === 'IN-PROGRESS') ? <option value="IN-PROGRESS">IN-PROGRESS</option> : ''}
                                            {!(warehouseStatus === 'IN-ACTIVE') ? <option value="IN-ACTIVE">IN-ACTIVE</option> : ''}
                                        </select>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            { warehouseGetData?.status === 'SUCCESS' && 
                <>
                    {<WarehouseDetails data={whDetails} onWarehouseDetailsUpdate={onWarehouseDetailsUpdate} isDisabled={true} />}
                    {<WearehouseAddress editMode={true} data={whAddress} onWearehouseAddressUpdate={onWearehouseAddressUpdate} />}
                    {<WarehouseHours data={whHours} onWarehouseHoursUpdate={onWarehouseHoursUpdate} />}
                    {<WarehouseLayout onWarehouseLayoutUpdate={onWarehouseLayoutUpdate} />}
                    {<WearehousePricing data={whPricing} onWearehousePricingUpdate={onWearehousePricingUpdate} />}
                </>
            }
            <div className='p-top-md align-c'>
                <Button className='sf-btn' variant="contained" onClick={() => { alert('Cancel') }}> Cancel </Button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Button className="btn primary-btn sf-btn" variant="contained" onClick={() => { updateWarehouse() }}> Update </Button>
            </div>
        </>
    )
}

export default EditWarehouse;

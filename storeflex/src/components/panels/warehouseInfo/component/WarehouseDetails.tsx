import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import InputBox from '../../../atoms/textfield/InputBox';
import { InputError } from '../../../atoms/textfield/InputError';
import GetCompany from "../../../atoms/company/GetCompany";
import { objectData } from '../../../../utils/ResponseSchema';
import { validateCharacterLength, validateGst } from "../../../../utils/CommonUtils";
import { UploadImage } from "../../../atoms/image/image";


interface WarehouseDetailsProps {
    onWarehouseDetailsUpdate?: (data: WhDetail) => void;
    isDisabled?: boolean;
    data?: WhDetail;
}

export interface WhDetail {
    clientName?: string;
    clientId?: string;
    warehouseName?: string;
    descp?: string;
    warehouseTaxId?: string;
    warehouseId?: string;
}

const errMsgObj = {} as WhDetail;

const WarehouseDetails = (props: WarehouseDetailsProps) => {
    const [imageData, setImageData] = useState<File>();
    const [defaultData, setDefaultData] = useState<WhDetail>({});
    const [updatedData, setUpdatedData] = useState<WhDetail>({});
    
    useEffect(() => {
        if (props?.data?.clientId && (props?.data?.clientId !== defaultData?.clientId)) {
            setDefaultData(props.data);
        }
    }, [props?.data?.clientId]);

    useEffect(() => {
        onChangeUpdateInfo();
    }, [updatedData]);

    const onChangeUpdateInfo = () => {
        if (props?.onWarehouseDetailsUpdate) {
            props.onWarehouseDetailsUpdate(updatedData);
        }
    }

    const companyChange = (companyId: string) => {
        // setCompanyCode(companyId);
        const data: WhDetail = defaultData;
        data.clientId = companyId;
        setDefaultData(data);
    }

    const validateWarehouseName = (event: any) => {
        const obj = {
            val: event.target.value,
            error: '',
            isUpdated: true,
        } as objectData;
        if (!obj.val) {
            obj.error = 'This field can not be empty';
        } else if (validateCharacterLength(obj.val, 4, 50)) {
            obj.error = '';
        } else {
            obj.error = 'Please enter valid name ';
        }
        errMsgObj.warehouseName = obj.error;
        setUpdatedData({...updatedData, warehouseName: obj.val});
    }

    const onGstIdChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        if (!obj.val) {
            obj.error = "*GST number is mandatory"
        } else if (!validateGst(obj.val)) {
            obj.error = "Enter a valid GST number"
        } else {
            obj.error = '';
        }
        errMsgObj.warehouseTaxId = obj.error;
        setUpdatedData({...updatedData, warehouseTaxId: obj.val});
    }

    const validateWarehouseDec = (event: any) => {
        const obj = {
            val: event.target.value,
            error: '',
            isUpdated: true,
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 100)) {
            obj.error = '';
        } else {
            obj.error = 'Please enter description ';
        }

        errMsgObj.descp = obj.error;
        setUpdatedData({...updatedData, descp: obj.val});
    }

    const onPhotoUploadChange = (file: any) => {
        if (file) {
            setImageData(file);
        }
    }

    return (
        <>
            <div className='m-bot-lg'>
                {/* <div className='primary-gradient m-bot-md'>
                    <div className='font-white p-sm f-18px f-bold'>Warehouse Details</div>
                </div> */}
                <div className='p-md'>
                    <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                        <Grid item xs={9}>
                            <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                                <Grid item xs={6}>
                                    {props.isDisabled &&
                                        <InputBox data={{
                                            name: 'company', label: 'Company*',
                                            value: defaultData?.clientName, isDisabled: props.isDisabled
                                        }}
                                        />
                                    }
                                    {!props.isDisabled &&
                                        <div>
                                            <div> Company* </div>
                                            <div className='p-top-sm'>
                                                {<GetCompany onCompanyChange={companyChange} />}
                                            </div>
                                        </div>
                                    }
                                </Grid>
                                <Grid item xs={6}>
                                    <InputBox data={{
                                        name: 'clientid', label: 'Client ID*',
                                        value: defaultData?.clientId, isDisabled: true
                                    }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                                <Grid item xs={6}>
                                    <InputBox data={{
                                        name: 'cityname', label: 'Warehouse Name*',
                                        value: defaultData?.warehouseName
                                    }}
                                        onChange={validateWarehouseName}
                                    />
                                    <InputError errorText={errMsgObj.warehouseName} />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputBox data={{
                                        name: 'gstid', label: 'GST Number*',
                                        value: defaultData?.warehouseTaxId, isDisabled: props.isDisabled
                                    }}
                                        onChange={onGstIdChange}
                                    />
                                    <InputError errorText={errMsgObj?.warehouseTaxId} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                                {props.isDisabled &&
                                    <Grid item xs={6}>
                                        <InputBox data={{
                                            name: 'Warehouseid', label: 'Warehouse Id*',
                                            value: defaultData?.warehouseId, isDisabled: props.isDisabled
                                        }}
                                            onChange={validateWarehouseDec}
                                        />
                                        <InputError errorText={errMsgObj.descp} />
                                    </Grid>
                                }
                                <Grid item xs={6}>
                                    <InputBox data={{
                                        name: 'whdescription', label: 'Warehouse Description*',
                                        value: defaultData?.descp
                                    }}
                                        onChange={validateWarehouseDec}
                                    />
                                    <InputError errorText={errMsgObj.descp} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <UploadImage name={'companyphoto'} onImageChange={onPhotoUploadChange} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default WarehouseDetails;
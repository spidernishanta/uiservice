import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import InputBox from '../../../atoms/textfield/InputBox';
import { validateAreaSpace, validateRate } from '../../../../utils/CommonUtils';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import { InputError } from '../../../atoms/textfield/InputError';

interface WearehousePricingProps {
    onWearehousePricingUpdate?: (data: any, displayId?: string) => void;
    data?: Warehouseprice;
    displayId?: string;
}

const errMsgObj = {} as Warehouseprice;
const WearehousePricing = (props: WearehousePricingProps) => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [defaultData, setDefaultData] = useState<Warehouseprice>();
    const [updatedData, setUpdatedData] = useState<Warehouseprice>();
    // const t = defaultData?.availspace
    useEffect(() => {
        // console.log('  WearehousePricing >> >>>> >>> >> ', props.data);
        setDefaultData(props.data);
    }, [props.data?.priceId]);
    useEffect(() => {
        if(updatedData) {
            onChangeUpdateInfo();
        }
    }, [updatedData]);

    const onChangeUpdateInfo = () => {
        if (props?.onWearehousePricingUpdate) {
            console.log('<<updatedData>>', updatedData);
            props.onWearehousePricingUpdate(updatedData, props?.displayId);
        }
    }

    const validateSpaceInfo = (event: any, id: string) => {
        const obj = {
            val: event.target.value,
            error: '',
            isUpdated: true,
            id,
            attributeName: 'availspace'
        } as objectData;
        if (!obj.val) {
            obj.error = " *This can not be empty ";
        } else if (!validateAreaSpace(obj.val)) {
            obj.error = " Available Space should be between 100-2,00,000 sq.ft";
        } else {
            obj.error = '';
        }
        errMsgObj.availspace = obj.error;
        // updateNewValue(obj);
        setUpdatedData({...updatedData, availspace: obj.val});
    }

    const validateRateInfo = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
            id,
            attributeName: 'ratesqtft'
        } as objectData;
        if (!obj.val) {
            obj.error = " *This can not be empty ";
        } else if (!validateRate(obj.val)) {
            obj.error = " Rate should be between 10-5000 Rs/sq.ft/month"
        } else {
            obj.error = '';
        }
        errMsgObj.ratesqtft = obj.error;
        // updateNewValue(obj);
        setUpdatedData({...updatedData, ratesqtft: obj.val} )
    }
    const validateQuantityInfo = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
            id,
            attributeName: 'minordersqt',
        } as objectData;
        // if (!obj.val) {
        //     obj.error = " *Company Name is required. ";
        // // } else if (!validateCharacterLength(obj.val, 4, 50)) {
        // //     obj.error = " Company Name must be between 4 characters to 50 characters."
        // } else {
        //     obj.error = '';
        // }
        errMsgObj.minordersqt = obj.error;
        // updateNewValue(obj);
        setUpdatedData({...updatedData, minordersqt: obj.val});
    }

    const onUpdateLoadingPrice = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
            id,
            attributeName: 'loading',
        } as objectData;

        errMsgObj.loading = obj.error;
        // updateNewValue(obj);
        setUpdatedData({...updatedData, loading: obj.val});
    }
    const onUpdateUnLoadingPrice = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
            id,
            attributeName: 'unloading',
        } as objectData;
        errMsgObj.unloading = obj.error;
        // updateNewValue(obj);
        setUpdatedData({...updatedData, unloading: obj.val});
    }

    const onChageStartDate = (evt: any, id: string) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            let startDate;
            if (name === 'fromdate') {
                startDate = Date.parse(evt.target.value);
                const obj = {
                    val: startDate,
                    error: '',
                    isUpdated: true,
                    id,
                    attributeName: 'startLease',
                } as objectData;
                setUpdatedData({...updatedData, startLease: obj.val});
            }
            diffInDays(startDate, updatedData?.endLease);
        }
    }

    const onChageEndDate = (evt: any, id: string) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            let endDate;
            if (name === 'todate') {
                endDate = Date.parse(evt.target.value);
                const obj = {
                    val: endDate,
                    error: '',
                    isUpdated: true,
                    id,
                    attributeName: 'endLease',
                } as objectData;
                // updateNewValue(obj);
                setUpdatedData({...updatedData, endLease: endDate});
            }
            diffInDays(updatedData?.startLease, endDate);
        }
    }

    const diffInDays = (startDate, endDate) => {
        var msDiff = Math.floor(( endDate - startDate) / (1000 * 60 * 60 * 24));
        console.log(msDiff);
        if (msDiff < 30 && msDiff >= 0) {
            setErrorMessage('Please select a range of 30 days or more');
        }
        else if (msDiff < 0) {
            setErrorMessage('From Date cannot be after To Date');
        }
        else {
            setErrorMessage('');
        }
    }

    const displayPricingList = () => {
        const keyId =  '0';
        const item = defaultData;
        return (
            <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 12 }}>
                <Grid item xs={4}>
                    <InputBox data={{ name: 'availablespace', label: 'Total Available Space (Sq.Ft)*', value: item?.availspace}}
                        onChange={(e) => validateSpaceInfo(e, keyId)}
                    />
                    <InputError errorText={ errMsgObj.availspace} />
                </Grid>
                <Grid item xs={4}>
                    <InputBox data={{ name: 'rate', label: 'Rental Rate(Rs)/Sq.Ft/30 days *', value: item?.ratesqtft}}
                        onChange={(e) => validateRateInfo(e, keyId)}
                    />
                    <InputError errorText={errMsgObj.ratesqtft} />
                </Grid>
                <Grid item xs={4}>
                    <InputBox data={{ name: 'quantity', label: 'Minimum Order Quantity (Sq.Ft)', value: item?.minordersqt}}
                        onChange={(e) => validateQuantityInfo(e, keyId)}
                    />
                    <InputError errorText={errMsgObj.minordersqt} />
                </Grid>
                <Grid item xs={4}>
                    <InputBox data={{ name: 'loading', label: 'Loading Price/Pallet', value: item?.loading }}
                        onChange={(e) => onUpdateLoadingPrice(e, keyId)} 
                    />
                    <InputError errorText={errMsgObj.loading} />
                </Grid>
                <Grid item xs={4}>
                    <InputBox data={{ name: 'unloading', label: 'Unloading Price/Pallet', value: item?.unloading}}
                        onChange={(e) => onUpdateUnLoadingPrice(e, keyId)} 
                    />
                    <InputError errorText={errMsgObj.unloading} />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <InputBox data={{ type: 'date', name: 'fromdate', label: 'From' }} onChange={(e) => onChageStartDate(e, keyId)} />
                    {errorMessage && <div className="text-red"> {errorMessage} </div>}
                </Grid>
                <Grid item xs={4}>
                    <InputBox data={{ type: 'date', name: 'todate', label: 'To' }} onChange={(e) => onChageEndDate(e, keyId)} />
                    {errorMessage && <div className="text-red"> {errorMessage} </div>}
                </Grid>
            </Grid>
        )
    }
    return (
        <div>
            {displayPricingList()}
        </div>
    )
}
export default WearehousePricing;

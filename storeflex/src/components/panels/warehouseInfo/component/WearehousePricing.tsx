import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import InputBox from '../../../atoms/textfield/InputBox';
import { validateAreaSpace, validateRate } from '../../../../utils/CommonUtils';
import { objectData, Warehouseprice } from '../../../../utils/ResponseSchema';
import { InputError } from '../../../atoms/textfield/InputError';

interface WearehousePricingProps {
    onWearehousePricingUpdate?: (data: any) => void;
    data?: Warehouseprice[];
}

const errMsgObj = {} as Warehouseprice;
const WearehousePricing = (props: WearehousePricingProps) => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [defaultData, setDefaultData] = useState<Warehouseprice[]>();
    const [updatedData, setUpdatedData] = useState<Warehouseprice[]>();
    // const t = defaultData?.availspace
    useEffect(() => {
        if (props?.data && props?.data.length > 0 ) {
            setDefaultData(props.data);
        }
    }, []);
    useEffect(() => {
        if (updatedData) {
            onChangeUpdateInfo();
        }
    }, [updatedData]);

    const onChangeUpdateInfo = () => {
        if (props?.onWearehousePricingUpdate) {
            // const obj = {} as Warehouseprice;
            // obj.availspace = getVal(spaceInfo);
            // obj.ratesqtft = getVal(rateInfo);
            // obj.minordersqt = getVal(quantityInfo);
            console.log('<<updatedData>>', updatedData);
            // props.onWearehousePricingUpdate(updatedData);
        }
    }

    const updateNewValue = (updatedItem: objectData) => {
        const updatedInfo = 
            updatedData?.map((item) => {
                const attributeName = updatedItem?.attributeName;
                if(item.priceId === updatedItem?.id && attributeName) {
                    item[attributeName] = updatedItem.val;
                    return item;
                } else {
                    return item;
                }
            });

        setUpdatedData(updatedInfo);

    }
    const validateSpaceInfo = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
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
        updateNewValue(obj);
        // setUpdatedData({...updatedData, availspace: obj.val} )
    }

    const validateRateInfo = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        if (!obj.val) {
            obj.error = " *This can not be empty ";
        } else if (!validateRate(obj.val)) {
            obj.error = " Rate should be between 10-5000 Rs/sq.ft/month"
        } else {
            obj.error = '';
        }
        errMsgObj.ratesqtft = obj.error;
        // setUpdatedData({...updatedData, ratesqtft: obj.val});
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
        // setUpdatedData({...updatedData, minordersqt: obj.val});
    }

    const onUpdateLoadingPrice = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;

        errMsgObj.loading = obj.error;
        // setUpdatedData({...updatedData, loading: obj.val});
    }
    const onUpdateUnLoadingPrice = (event: any, id: string) => {
        const obj = {
            val: event.target.value || '',
            error: '',
            isUpdated: true,
        } as objectData;
        errMsgObj.unloading = obj.error;
        // setUpdatedData({...updatedData, unloading: obj.val});
    }

    const onChageStartDate = (evt: any) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            let startDate;
            if (name === 'fromdate') {
                startDate = Date.parse(evt.target.value);
                // setUpdatedData({...updatedData, startLease: startDate});
            }
            // diffInDays(startDate, updatedData.endLease);
        }
    }

    const onChageEndDate = (evt: any) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            let endDate;
            if (name === 'todate') {
                endDate = Date.parse(evt.target.value);
                // setUpdatedData({...updatedData, endLease: endDate});
            }
            // diffInDays(updatedData.startLease, endDate);
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
        console.log(' >>>>> ##### >>', defaultData);
        return defaultData?.map((item, index) => {
            const keyId = `priceList${index}`;
            console.log(' >>>>> #####', item);
            return (
                <div className='p-md sf-box-shadow-blue' key={keyId}>
                    <div className="f-24px p-bot-sm align-c"> Availability {index + 1}</div>
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
                            <InputBox data={{ type: 'date', name: 'fromdate', label: 'From' }} onChange={onChageStartDate} />
                            {errorMessage && <div className="text-red"> {errorMessage} </div>}
                        </Grid>
                        <Grid item xs={4}>
                            <InputBox data={{ type: 'date', name: 'todate', label: 'To' }} onChange={onChageEndDate} />
                            {errorMessage && <div className="text-red"> {errorMessage} </div>}
                        </Grid>
                    </Grid>
                </div>
            )
        })

    }
    return (
        <>
            <div>
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>Pricing</div>
                </div>
                {displayPricingList()}
            </div>
        </>
    )
}
export default WearehousePricing;

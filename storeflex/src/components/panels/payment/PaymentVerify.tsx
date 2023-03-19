import React, {useState} from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { objectData } from '../../../utils/ResponseSchema';
import InputBox from '../../atoms/textfield/InputBox';
import { InputError } from '../../atoms/textfield/InputError';
import Api from '../../../../src/api/Api';
import { BankInfo } from '../../../../src/api/ApiConfig';
import LoaderSpinner from '../../atoms/spinner/spinner';
import { validateCharacterLength, validateCharacterOnly, validatePhone } from '../../../utils/CommonUtils';
import { PaymentGatewayModal } from './PaymentGateway';


const PaymentVerify = () => {

    const api = new Api();

     // Contact Information 
     const [nameInfo, setNameInfo] = useState<objectData>({});
     const [mobileNoInfo, setMobileNoInfo] = useState<objectData>({});
     const [accountNoInfo, setAccountNoInfo] = useState<objectData>({});
     const [ifscInfo, setIfscInfo] = useState<objectData>({});
     const [isLoader, setLoaderState] = useState(false);
     const [openPayment, setPopenPayment] = useState(false);

    const ontNameChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = 'This field can not be empty';
        } else if (validateCharacterOnly(obj.val)) {
            obj.error = 'Alphabets Only';
        } else if (!validateCharacterLength(obj.val, 4, 30)) {
            obj.error = 'Contact Name should be between 4 to 30 character';
        }
        setNameInfo(obj);
    }

    const onMobileNoChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = "This Field can not be empty";
        } else if (validatePhone(obj.val)) {
            obj.error = '';
        } else {
            obj.error = '10 Digit Number only'
        }
        setMobileNoInfo(obj);
    }

    const onAccountNoChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = 'This field can not be empty';
        }
        setAccountNoInfo(obj);
    }

    const onIfscChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = 'This field can not be empty';
        }
        setIfscInfo(obj);
    }

    const verifyAc = () => {
        console.log(' ###### ');
        const bankInfo: BankInfo = {};
        bankInfo.bankAccount = accountNoInfo.val;
        bankInfo.ifsc = ifscInfo.val;
        bankInfo.name = nameInfo.val;
        bankInfo.phone = mobileNoInfo.val;
        //  api.asyncValidationBankDetails(bankInfo).then((resp) => {
        api.getAuthorisationBank(bankInfo).then((resp) => {
            setLoaderState(false);
            console.log(' ##### >>> ', resp);
            // console.log(' Company creation res >>>>>> ', resp);
        }).catch((error) => {
            setLoaderState(false);
            console.log(' Company creation erroor ', error);
        });
    }

    const Payment = (isOpen = false) => {
        setPopenPayment(isOpen);
    }

    return (
        <>
            {isLoader && (
                <LoaderSpinner />
            )}

<div className='c-box-shadow-blue'>
            <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>
                        Bank Account Verification 
                    </div>
                </div>
            <Typography component="p" sx={{mt:1}}>Please enter bank account details</Typography>
            <Grid container spacing={2} sx={{ mt: 0 }}>
                <Grid item xs={6}>
                <InputBox data={{ name: 'contactname', label: 'Contact Name*', value: '' }}
                    onChange={ontNameChange}
                />
                <InputError errorText={nameInfo.error} />
                </Grid>
                <Grid item xs={6}>
                    <InputBox data={{ name: 'mobilenumber', label: 'Mobile number *', value: '' }}
                        onChange={onMobileNoChange}
                    />
                    <InputError errorText={mobileNoInfo.error} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                    <InputBox data={{ name: 'accountnumber', label: 'Account Number *', value: '' }}
                        onChange={onAccountNoChange}
                    />
                    <InputError errorText={accountNoInfo.error} />
                </Grid>
                <Grid item xs={6}>
                    <InputBox data={{ name: 'ifscnumber', label: 'IFSC', value: '' }}
                        onChange={onIfscChange}
                    />
                    <InputError errorText={ifscInfo.error} />
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <Button variant="contained" sx={{backgroundColor: '#fb8c00'}} onClick={() => { verifyAc()}}>Verify</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <Button variant="contained" sx={{backgroundColor: '#fb8c00'}} onClick={() => { Payment(true)}}>Pay</Button>
                </Grid>
            </Grid>
            </Box>
            {<PaymentGatewayModal openModal={openPayment} onModalClose={Payment}/>}
        </div>
        </>
    )
}

export default PaymentVerify;
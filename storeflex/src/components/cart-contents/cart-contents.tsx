import React, { useState, useEffect } from 'react';
//import { useState, useEffect } from 'react';
import { Button, Grid, Box, Container, styled, Paper, Divider, TextField } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './cart-content.scss';
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import InputBox from '../atoms/textfield/InputBox';
//import OrderReview from '../atoms/payment/orderReview';
import CustomizedSteppers from '../../pages/Steps';
import { Terminal } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PriceDetailsHeader = () => {
    return (
        <>
            <br />
            <Box sx={{
                p: 1,
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                fontSize: '1rem',
                fontWeight: '700',

            }}>
                <span>
                    Price Details
                </span>
            </Box>
        </>
    )
}

const CartContents = () => {

    const [data, setData] = useState<Array<any>>([]);
    const [hourData, setHourData] = useState<Array<any>>([]);
    const [priceData, setPriceData] = useState(0);
    const [addressData, setAddressData] = useState(0);
    const [valueId, setValueId] = useState(false);
    const { state } = useLocation();
    useEffect(() => {
        const warehouseData: any = state; console.log(warehouseData);
        setData(warehouseData);
        setHourData(warehouseData.hours);
        setAddressData(warehouseData.address);
        setPriceData(warehouseData.pricebean);
        // if (warehouseData.address) {
        //     setAddData(warehouseData.address);
        //     setValueId(true);
        // }

        // console.log(warehouseData.warehousepriceList[0].minordersqt)

    }, []);

    // const [inputField, setInputField] = useState({
    //     orderId: '1211',
    //     orderAmount: '100',
    //     customerName: 'a',
    //     customerEmail: 'a@a.a',
    //     paymentType: 'MERCHANTHOSTED',
    //     customerPhone: '1234512345'

    // });


    // const handaleInput = (Event) => {
    //     console.log(Event.target.value);
    //     setInputField({ ...inputField, [Event.target.name]: Event.target.value })

    // }

    // const handleSubmit = async (e) => {
    //     const url = "http://127.0.0.1:8000/test";
    //     console.log(JSON.stringify({ inputField }));
    //     e.preventDefault();

    //     Axios.post(url, {
    //         orderId: inputField.orderId,
    //         orderAmount: inputField.orderAmount,
    //         customerName: inputField.customerName,
    //         customerEmail: inputField.customerEmail,
    //         paymentType: inputField.paymentType,
    //         customerPhone: inputField.customerPhone
    //     })
    //         .then(res => {
    //             console.log(res.data);

    //         })

    // };

    const [spaceOrdered, setSpaceOrdered] = useState('');
    // const [nopUnload, setNopUnload] = useState('');
    // const [nopLoad, setNopLoad] = useState('');
    // const [startLease, setStartLease] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    // const [errorMessage0, setErrorMessage0] = React.useState("");
    const [onUpdateInfo, setonUpdateInfo] = useState(false);

    const navigate = useNavigate();
    // const goToNextPage = (pagePath: string) => {
    //     navigate(pagePath);
    // }

    const validateSpaceOrdered = (evt: any) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            const value = evt.target.value;
            if (name === 'sporder') {
                setSpaceOrdered(value);
                if (value > 20000 || value < 9425)
                    setErrorMessage("Space Ordered should be between 9,425 Sq. Ft.-20,000 Sq. Ft.")
                else {
                    setErrorMessage("")
                }
            }
            else {
                return false;
            }
            setonUpdateInfo(true);
        }
    }

    // const validateNopUnload = (evt: any) => {
    //     if (evt?.target?.value) {
    //         const name = evt.target.name;
    //         const value = evt.target.value;
    //         if (name === 'nopu') {
    //             setNopUnload(value);
    //         }
    //         else {
    //             return false;
    //         }
    //         setonUpdateInfo(true);
    //     }
    // }






    // const validateNopLoad = (evt: any) => {
    //     if (evt?.target?.value) {
    //         const name = evt.target.name;
    //         const value = evt.target.value;
    //         if (name === 'nopl') {
    //             setNopLoad(value);
    //         }
    //         else {
    //             return false;
    //         }
    //         setonUpdateInfo(true);
    //         console.log('Value:', value);
    //     }
    // }

    const viewStartDate = (evt: any) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            const value = evt.target.value;
            if (name === 'startdata') {
                console.log('Start Date:', value);
            }
            else {
                return false;
            }
            setonUpdateInfo(true);
        }
    }


    const [conter, setCounter] = useState(0);
    const [sameText, setSameText] = useState('');
    const sampleText = (evt: any) => {
        setCounter(0);
        setSameText(evt.target.value);
    }
    const [texting, setTexting] = useState('');
    const unloading = (evt: any) => {
        setCounter(1);
        setTexting(evt.target.value);
    }

    const viewEndDate = (evt: any) => {
        if (evt?.target?.value) {
            const name = evt.target.name;
            const value = evt.target.value;
            if (name === 'enddata') {
                console.log('End Date:', value);
            }
            else {
                return false;
            }
            setonUpdateInfo(true);
        }
    }

    const goToPayments = (e: any, selectedItem: any) => {
        navigate('/paymentstatus', { state: selectedItem });
    }

    return (
        <>
            <CustomizedSteppers />
            <Box className='p-top-xl' sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Container maxWidth="xl">
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            borderRadius: 1,
                        }}>

                            <Grid item xs={9} sx={{ pl: 1 }}>
                                <Item sx={{ mb: 1 }}>
                                    <Grid item xs={12} sx={{ p: 2 }}>
                                        <div className='text-center'>
                                            <div className='header'> {data['warehouseName']} </div>
                                        </div><hr />
                                        <Grid container spacing={2}>
                                            <Grid item sm={3}>
                                                <div className='card'>
                                                    <div className='text-left'>
                                                        <img className='img-200x150'
                                                            src='../static/images/store1.jpg'
                                                        />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className='card p-top-xl'>
                                                    <div className='text-left'>
                                                        <div className='sub-header'> {data['warehouseId']} </div>
                                                        <div className='sub-header'> { } </div>
                                                        <div><b>From Date:</b>{priceData['startLease']}&nbsp;
                                                            <b>To Date:</b>{priceData['endLease']}</div>
                                                        {valueId ? <div><b>Address:</b>{addressData[0]['streetDetails']}, {addressData[0]['houseNo']}, {addressData[0]['plotNo']}, {addressData[0]['pincode']}, {addressData[0]['city']}, {addressData[0]['state']}</div> :
                                                            <div><b>Address:</b>{data['streetAddrs']}, {data['houseNo']}, {data['plotNo']}, {data['pincode']}, {data['city']}, {data['state']}</div>
                                                        }
                                                        <div><b>Available Days:</b>{hourData['openday']}</div>
                                                        <div><b>Min. Space</b> :{priceData['minordersqt']} &nbsp;&nbsp;
                                                            <b>Available Space</b> : {priceData['availspace']}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid item sm={3}>
                                                <div className='card p-top-xl'>
                                                    <div className='sub-header'> Rate </div>
                                                    <div className='text-left'>
                                                        <span><b>Rental:&nbsp;&nbsp;</b>&#x20B9;{ Number(priceData['minordersqt']) * Number(priceData['ratesqtft']) }<i>&nbsp;/month  </i></span>
                                                        <span><b>Unloading:&nbsp;&nbsp;</b>&#x20B9;{priceData['unloading']}<i>&nbsp;/month  </i></span>
                                                        <span><b>Loading:&nbsp;&nbsp;</b>&#x20B9;{priceData['loading']}<i>&nbsp;/month  </i></span>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'sporder', label: 'Space Required (Sq. Ft.)', value: '', type: "number" }}
                                                    onChange={validateSpaceOrdered}
                                                />
                                                {errorMessage && <div className="text-red"> {errorMessage} </div>}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'startdata', label: 'Start Lease', value: '', type: 'date' }} onChange={viewStartDate} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'enddata', label: 'End Lease', value: '', type: 'date' }} onChange={viewEndDate} />
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item sm={3}>

                                                {/* <InputBox data={{ name: 'nop', label: 'No. of Pallets (Loading/Unloading)', value: '', type: 'number'}} /> */}
                                                <TextField type="text" onKeyUp={sampleText} label="No. of Pallets (Unloading)" />
                                            </Grid>
                                            <Grid item sm={3}>
                                                {/* <InputBox data={{ name: 'nopl', label: 'No. of Pallets (Loading)', value: '', type: 'number' }}
                                                    onChange={validateNopLoad} />
                                                {errorMessage0 && <div className="text-red"> {errorMessage0} </div>} */}



                                                {/* <InputBox data={{ name: 'nop', label: 'No. of Pallets (Loading/Unloading)',value:sameText, type: 'number' }}  /> */}
                                                <TextField type="text" value={conter === 0 ? sameText : texting} onChange={unloading} label="No. of Pallets (Loading)" />

                                            </Grid>
                                            {/* <Grid item sm={3}>
                                                <InputBox data={{ name: 'nopl', label: 'No. of Pallets (Loading)', value: '', type: 'number' }}
                                                    onChange={validateNopLoad} />
                                                {errorMessage0 && <div className="text-red"> {errorMessage0} </div>}

                                            </Grid>
                                            </Grid> */}

                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <InputBox data={{ name: 'NotestoWarehouse', label: 'Notes to Warehouse (Optional)', value: '' }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Item>
                                {/* {<OrderReview />} */}
                            </Grid>

                            <Grid item xs={3} sx={{ pl: 3 }}>

                                <Item sx={{ p: 0 }}>
                                    <Grid item xs={12}>
                                        {PriceDetailsHeader()}
                                        {/* <form id="merchantHostedForm">
                                            <table className="mainForm">
                                                <tbody>
                                                    <tr>
                                                        
                                                        <td><input type="hidden" onChange={handaleInput} name="orderId" value={inputField.orderId} /></td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td><input type="hidden" onChange={handaleInput} name="orderAmount" value={inputField.orderAmount} /></td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td><input type="hidden" onChange={handaleInput} name="customerName" value={inputField.customerName} /></td>
                                                    </tr>
                                                    <tr>
                                                       
                                                        <td><input type="hidden" onChange={handaleInput} name="customerEmail" value={inputField.customerEmail} /></td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td><input type="hidden" onChange={handaleInput} name="paymentType" value={inputField.paymentType} /></td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <td><input type="hidden" onChange={handaleInput} name="customerPhone" value={inputField.customerPhone} /></td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </form> */}
                                        <Grid container spacing={2} sx={{ p: 1 }}>
                                            <Grid item sm={12}>
                                                <div className='card'>
                                                    <div className='text-left'>
                                                        <span className='text-left'>Total Rental:</span> <span className='text-right'>{ Number(priceData['minordersqt']) * Number(priceData['ratesqtft']) }</span><p />
                                                        <span className='text-left'>Unloading:</span> <span className='text-right'>{Number(priceData['unloading'])}</span><p />
                                                        <span className='text-left'>Loading:</span> <span className='text-right'>{Number(priceData['loading'])}</span>
                                                        <Divider sx={{ m: 2 }} />
                                                        <span className='text-left'>Tax:</span> <span className='text-right'>{(Number(18) * (Number(priceData['minordersqt']) * Number(priceData['ratesqtft'])+Number(priceData['unloading'])+Number(priceData['loading'])))/Number(100)}</span>
                                                        <Divider sx={{ m: 2 }} />
                                                        <span className='text-left'>Total:</span> <span className='text-right'>{(Number(priceData['minordersqt']) * Number(priceData['ratesqtft']))+Number(priceData['unloading'])+Number(priceData['loading'])+((Number(18) * (Number(priceData['minordersqt']) * Number(priceData['ratesqtft'])+Number(priceData['unloading'])+Number(priceData['loading'])))/Number(100))}</span>
                                                        <Divider sx={{ m: 2 }} />

                                                    </div>


                                                    {/* <form id="merchantHostedForm">
                                                        <table className="mainForm">
                                                            <tbody>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="orderId" value={inputField.orderId} /></td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="orderAmount" value={inputField.orderAmount} /></td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerName" value={inputField.customerName} /></td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerEmail" value={inputField.customerEmail} /></td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="paymentType" value={inputField.paymentType} /></td>
                                                                </tr>
                                                                <tr>
                                                                    
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerPhone" value={inputField.customerPhone} /></td>
                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </form> */}
                                                    <div >
                                                        <Button variant="contained" color="warning" size="small" onClick={(e) => { goToPayments(e, data) }}>Review Order</Button>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Item>

                            </Grid>

                        </Box>
                    </Container>
                </Grid>
            </Box>
        </>

    )

}


export default CartContents;
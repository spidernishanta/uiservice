import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, Container, styled, Paper, TextField } from '@mui/material';
import './cart-content.scss';
import { useNavigate, useLocation } from "react-router-dom";
import InputBox from '../atoms/textfield/InputBox';
import CustomizedSteppers from '../../pages/Steps';
import { AddOrderPostData } from '../../api/ApiConfig';
import { LoadUnloadAmount } from '../../utils/ResponseSchema';
import Api from '../../api/Api';
import { getUserId } from '../../utils/CommonUtils'

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
    const navigate = useNavigate();
    // const [startLease, setStartLease] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    // const [errorMessage0, setErrorMessage0] = React.useState("");
    const [onUpdateInfo, setonUpdateInfo] = useState(false);

    const [conter, setCounter] = useState(0);
    const [spaceOrdered, setSpaceOrdered] = useState(0);
    const [totalRental, setTotalRental] = useState(0);
    const [noOfUnlodingPallets, setNoOfUnlodingPallets] = useState(0);
    const [totalUnloadingPrice, setTotalUnloadingPrice] = useState(0);
    const [noOfLodingPallets, setNoOfLodingPallets] = useState(0);
    const [totalLoadingPrice, setTotalLoadingPrice] = useState(0);
    const [totalTaxPrice, setTotalTaxPrice] = useState(0);
    const [grandTotalPrice, setGrandTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    
    const userId = getUserId();
    const api = new Api();

    const { state } = useLocation();
    useEffect(() => {
        const warehouseData: any = state; 
        setData(warehouseData);
        setHourData(warehouseData.hours);
        setAddressData(warehouseData.address);
        setPriceData(warehouseData.pricebean);
        calculateRental(spaceOrdered);
        calculateUnloadingTotal(noOfUnlodingPallets);
        calculateLoadingTotal(noOfLodingPallets);
        calculateTax(totalRental, totalUnloadingPrice, totalLoadingPrice);
        calculateGrandTotal(totalRental, totalUnloadingPrice, totalLoadingPrice, totalTaxPrice);
        
    }, [spaceOrdered,noOfUnlodingPallets,noOfLodingPallets,totalRental,totalUnloadingPrice,totalLoadingPrice,totalTaxPrice]);

    const calculateRental = (spaceOrdered: Number) => {
        if(spaceOrdered !== 0) {
            setTotalRental(Number(spaceOrdered) * Number(priceData['ratesqtft']));
        } else {
            setTotalRental(0);
        }
    };
    const calculateUnloadingTotal = (noOfUnlodingPallets: Number) => {
        if(noOfUnlodingPallets !== 0) {
            setTotalUnloadingPrice(Number(noOfUnlodingPallets) * Number(priceData['unloading']));
        } else {
            setTotalUnloadingPrice(0);
        }
    };
    const calculateLoadingTotal = (noOfLodingPallets: Number) => {
        if(noOfLodingPallets !== 0) {
            setTotalLoadingPrice(Number(noOfLodingPallets) * Number(priceData['loading']));
        } else {
            setTotalLoadingPrice(0);
        }
    };
    const calculateTax = (totalRental: Number, totalUnloadingPrice: Number, totalLoadingPrice: Number) => {
        if(totalRental !== 0 && totalUnloadingPrice !== 0 && totalLoadingPrice !== 0) {
            setTotalTaxPrice((Number(18)*((Number(totalRental))+(Number(totalUnloadingPrice))+(Number(totalLoadingPrice))))/Number(100));
        } else {
            setTotalTaxPrice(0);
        }
    };
    const calculateGrandTotal = (totalRental: Number, totalUnloadingPrice: Number,totalLoadingPrice: Number, totalTaxPrice: Number) => {
        if(totalRental !== 0 && totalUnloadingPrice !== 0 && totalLoadingPrice !== 0 && totalTaxPrice !== 0) {
            setGrandTotalPrice(Number(totalRental)+Number(totalUnloadingPrice)+Number(totalLoadingPrice)+Number(totalTaxPrice));
        } else {
            setGrandTotalPrice(0);
        }
    };
    const unloadingPallets = (evt: any) => {
        setCounter(0);
        setNoOfUnlodingPallets(evt.target.value);
        setNoOfLodingPallets(evt.target.value);
    };
    const loadingPallets = (evt: any) => {
        setCounter(1);
        setNoOfLodingPallets(evt.target.value);
    };
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
        } else {
            setSpaceOrdered(0);
        }
    };
    const loadUnloadAmount = () => {
        const amount = {} as LoadUnloadAmount;
        amount.loadamt = totalLoadingPrice;
        amount.unloadamt = totalUnloadingPrice;
        return amount;
    }
    const onReviewOrder = () => {
        const orderPostData = {} as AddOrderPostData;
        orderPostData.orderById = userId;
        orderPostData.warehouseId = data['warehouseId'];
        orderPostData.spaceSize = spaceOrdered;
        orderPostData.formDate = startDate;
        orderPostData.toDate = endDate;
        orderPostData.unitPrice = priceData['ratesqtft'];
        orderPostData.overhead = [loadUnloadAmount()];
        api.postOrder(orderPostData).then((response)=>{
            //console.log(response);
            if(response.message === 'Order Submitted') {
                const orderData = response.methodReturnValue
                navigate('/paymentstatus', { state: orderData })
            }
        }
        ).catch((error)=>{
            console.log(error);
        })
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
        setStartDate(evt.target.value);
    };
    const viewEndDate = (evt: any) => {
        setEndDate(evt.target.value);
        // if (evt?.target?.value) {
        //     const name = evt.target.name;
        //     const value = evt.target.value;
        //     if (name === 'enddata') {
        //         //console.log('End Date:', value);
        //         setEndDate(value);
        //     }
        //     else {
        //         return false;
        //     }
        //     setonUpdateInfo(true);
        // }
    };

    // const goToPayments = (e: any, selectedWarehouse: any, spaceOrdered: any, selectedGrandTotal: any) => {
    //     navigate('/paymentstatus', { state: [selectedWarehouse, spaceOrdered, selectedGrandTotal] });
    // }

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
                                                        <table className="table table-responsive">
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Rental</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{priceData['ratesqtft']}<i>&nbsp;/sq. ft.</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Unloading</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{priceData['unloading']}<i>&nbsp;/pallets</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Loading</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{priceData['loading']}<i>&nbsp;/pallets</i></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
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
                                                <label>Start Lease:</label>
                                                <input className='form-control' type="date" min={priceData['startLease']} value={startDate || priceData['startLease']} onChange={(e)=>{viewStartDate(e)}}/>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <label>End Lease:</label>
                                                <input className='form-control' type="date" max={priceData['endLease']} value={endDate || priceData['endLease']} onChange={(e)=>{viewEndDate(e)}}/>
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item sm={3}>
                                                <TextField type="text" onKeyUp={unloadingPallets} label="No. of Pallets (Unloading)" />
                                            </Grid>
                                            <Grid item sm={3}>
                                                {/* <InputBox data={{ name: 'nopl', label: 'No. of Pallets (Loading)', value: '', type: 'number' }}
                                                    onChange={validateNopLoad} />
                                                {errorMessage0 && <div className="text-red"> {errorMessage0} </div>} */}
                                                {/* <InputBox data={{ name: 'nop', label: 'No. of Pallets (Loading/Unloading)',value:sameText, type: 'number' }}  /> */}
                                                <TextField type="text" value={conter === 0 ? noOfUnlodingPallets : noOfLodingPallets} onChange={loadingPallets} label="No. of Pallets (Loading)" />

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
                                        <Grid container spacing={2} sx={{ p: 1 }}>
                                            <Grid item sm={12}>
                                                <div className='card'>
                                                    <div className='text-left'>
                                                        <table className="table table-responsive">
                                                            <tbody>
                                                                <tr>
                                                                    <td><b>Total Rental</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{totalRental}<i>&nbsp;/month</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Unloading</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{totalUnloadingPrice}<i>&nbsp;/month</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Loading</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{totalLoadingPrice}<i>&nbsp;/month</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><b>Tax</b></td>
                                                                    <td>:</td>
                                                                    <td>&#x20B9;{totalTaxPrice}<i>&nbsp;/month</i></td>
                                                                </tr>
                                                                <tr style={{backgroundColor: '#e6e3e3'}}>
                                                                    <td><b>Payable Amount</b></td>
                                                                    <td>:</td>
                                                                    <td><b>&#x20B9;{grandTotalPrice}<i>&nbsp;/month</i></b></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div >
                                                        {/* <Button variant="contained" color="warning" size="small" onClick={(e) => { goToPayments(e, data, spaceOrdered ,grandTotalPrice) }}>Review Order</Button> */}
                                                        <Button variant="contained" color="warning" size="small" onClick={() => { onReviewOrder() }}>Review Order</Button>
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
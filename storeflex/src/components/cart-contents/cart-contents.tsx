import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Grid, Box, Container, styled, Paper, Divider } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './cart-content.scss';
import Axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import InputBox from '../atoms/textfield/InputBox';
//import OrderReview from '../atoms/payment/orderReview';

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
    const [addData, setAddData] = useState(0);
    const [valueId, setValueId] = useState(false);
    const { state } = useLocation();
    useEffect(() => {
        const warehouseData: any = state;
        setData(warehouseData);
        setHourData(warehouseData.hours);
        if (warehouseData.address) {
            setAddData(warehouseData.address);
            setValueId(true);
        }

    }, []);

    const [inputField, setInputField] = useState({
        orderId: '1211',
        orderAmount: '100',
        customerName: 'a',
        customerEmail: 'a@a.a',
        paymentType: 'MERCHANTHOSTED',
        customerPhone: '1234512345'

    });


    const handaleInput = (Event) => {
        console.log(Event.target.value);
        setInputField({ ...inputField, [Event.target.name]: Event.target.value })

    }

    const handleSubmit = async (e) => {
        const url = "http://127.0.0.1:8000/test";
        console.log(JSON.stringify({ inputField }));
        e.preventDefault();

        Axios.post(url, {
            orderId: inputField.orderId,
            orderAmount: inputField.orderAmount,
            customerName: inputField.customerName,
            customerEmail: inputField.customerEmail,
            paymentType: inputField.paymentType,
            customerPhone: inputField.customerPhone
        })
            .then(res => {
                console.log(res.data);

            })

    };

    const [spaceOrdered, setSpaceOrdered] = useState('');
    const [errorMessage, setErrorMessage] = React.useState("");
    const [onUpdateInfo, setonUpdateInfo] = useState(false);

    const navigate = useNavigate();
    const goToNextPage = (pagePath: string) => {
        navigate(pagePath);
    }

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


    return (
        <>
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
                                        <div className='text-left'>
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
                                            <Grid item sm={7}>
                                                <div className='card p-top-xl'>
                                                    <div className='text-left'>
                                                        <div className='sub-header'> {data['warehouseId']} </div>
                                                        <div className='sub-header'> { } </div>
                                                        <div><b>From Date:</b>{data['startLease']}</div>
                                                        <div><b>To Date:</b>{data['endLease']}</div>
                                                        {valueId ? <div><b>Address:</b>{addData[0]['streetDetails']}, {addData[0]['houseNo']}, {addData[0]['plotNo']}, {addData[0]['pincode']}, {addData[0]['city']}, {addData[0]['state']}</div> :
                                                            <div><b>Address:</b>{data['streetAddrs']}, {data['houseNo']}, {data['plotNo']}, {data['pincode']}, {data['city']}, {data['state']}</div>
                                                        }
                                                        <div><b>Available Days:</b>{hourData['openday']}</div>
                                                        <div><b>Minimum Space</b> : { }</div>
                                                        <div><b>Available Space</b> : { }</div>
                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid item sm={2}>
                                                <div className='card p-top-xl'>
                                                    <div className='text-left'>
                                                        <span>&#x20B9;{ }<i>&nbsp;/ month</i></span>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'sporder', label: 'Space Ordered', value: '' }}
                                                    onChange={validateSpaceOrdered}
                                                />
                                                {errorMessage && <div className="text-red"> {errorMessage} </div>}
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'startdata', label: 'Start Date', value: '', type: 'date' }} />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <InputBox data={{ name: 'enddata', label: 'End Date', value: '', type: 'date' }} />
                                            </Grid>
                                            <Grid item sm={3}>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <InputBox data={{ name: 'NotestoWarehouse', label: 'Notes to Warehouse', value: '' }} />
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
                                                        <form id="merchantHostedForm">
                                                            <table className="mainForm">
                                                                <tbody>
                                                                    <tr>
                                                                        {/* <td>order id</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="orderId" value={inputField.orderId} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        {/* <td>order amount</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="orderAmount" value={inputField.orderAmount} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        {/* <td>customer name</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="customerName" value={inputField.customerName} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        {/* <td>customer email</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="customerEmail" value={inputField.customerEmail} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        {/* <td>MERCHANTHOSTED</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="paymentType" value={inputField.paymentType} /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        {/* <td>customer phone</td> */}
                                                                        <td><input type="hidden" onChange={handaleInput} name="customerPhone" value={inputField.customerPhone} /></td>
                                                                    </tr>


                                                                </tbody>
                                                            </table>
                                                        </form>
                                        <Grid container spacing={2} sx={{ p: 1 }}>
                                            <Grid item sm={12}>
                                                <div className='card'>
                                                    <div className='text-left'>
                                                        <span className='text-left'>Price(2 Items):</span> <span className='text-right'> 45000.00</span>
                                                        <Divider sx={{ m: 2 }} />
                                                        Discount: 0.00
                                                        <Divider sx={{ m: 2 }} />
                                                        {/* Total Amount: &#x20B9;{parseFloat(data.clientId) + 0.18 * parseFloat(data.clientId)} */}
                                                        <Divider sx={{ m: 2 }} />

                                                    </div>


                                                    <form id="merchantHostedForm">
                                                        <table className="mainForm">
                                                            <tbody>
                                                                <tr>
                                                                    {/* <td>order id</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="orderId" value={inputField.orderId} /></td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td>order amount</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="orderAmount" value={inputField.orderAmount} /></td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td>customer name</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerName" value={inputField.customerName} /></td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td>customer email</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerEmail" value={inputField.customerEmail} /></td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td>MERCHANTHOSTED</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="paymentType" value={inputField.paymentType} /></td>
                                                                </tr>
                                                                <tr>
                                                                    {/* <td>customer phone</td> */}
                                                                    <td><input type="hidden" onChange={handaleInput} name="customerPhone" value={inputField.customerPhone} /></td>
                                                                </tr>


                                                            </tbody>
                                                        </table>
                                                    </form>
                                                    <div >
                                                        <Button variant="contained" color="warning" size="small" onClick={() => { goToNextPage('/paymentstatus') }}>Review Order</Button>
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
import React from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import swal from 'sweetalert';

const OrderReview = (props: any) => {

    // const [startDate, setStartDate] = useState();
    // const [endDate, setEndDate] = useState();
    // useEffect(()=>{
    //     convertedDate();
    // },[]);
    
    const columns = [
        { field: "paymentId", headerName: "Payment Id", width: 150 },
        { field: "month", headerName: "Month/Year", width: 150 },
        { field: "monthlyBalance", headerName: "Monthly Balance", width: 150 },
        { field: "monthlyPayment", headerName: "Monthly Payment", width: 150 },
        { field: "paymentBalance", headerName: "Payment Balance", width: 150 },
        { field: "paymentDone", headerName: "Payment Done", width: 150 },
        { field: "payout", headerName: "Payout", width: 150 },
        { field: "tax", headerName: "Tax", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "paytype", headerName: "Pay Type", witdh: 150 },
    ];

    // const convertedDate = () => {
    //     let date: any, month: any, year: any;
    //     date = props.orderReviewData.fromDate.slice(8,10);
    //     month = props.orderReviewData.fromDate.slice(5,7);
    //     year = props.orderReviewData.fromDate.slice(0,4);
    //     console.log(`${date}/${month}/${year}`);
    //     setStartDate(date+month+year)
    // }

    const orderPaymentData = () => {
        let list : any[] = [];
        console.log(props.orderReviewData.orderPaymentDetails);
        if(props.orderReviewData.orderPaymentDetails) {
            list = props.orderReviewData.orderPaymentDetails.map((item, index) => { 
                console.log(item); 
            return {
                id: index,
                paymentId: item.paymentId,
                month: item.month+' '+item.year,
                monthlyBalance: item.monthlyBalance,
                monthlyPayment: item.monthlyPayment,
                paymentBalance: item.paymentBalance,
                paymentDone: item.paymentDone,
                payout: item.payout,
                tax: item.tax,
                status: item.status,
                paytype: item.paytype
            }
          })
          return list;
        } else {
          return list;
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
                            <div className='card'>
                                <div className='card-header'><Typography align='center' variant='h5'>Review Order</Typography></div>
                                <Typography align='center'>Order Id: {props.orderReviewData.orderId} </Typography>
                                <Typography align='center'>Warehouse Id: {props.orderReviewData.warehouseId}</Typography>
                                <Typography align='center'>Start Date: {props.orderReviewData.fromDate}</Typography>
                                <Typography align='center'>End Date: {props.orderReviewData.toDate}</Typography>
                                <Typography align='center'>Initial Amount: {props.orderReviewData.initialAmt}</Typography>
                                <Typography align='center'>Total Amount: {props.orderReviewData.totalAmt}</Typography>
                                <Typography align='center'>Required Space: {props.orderReviewData.spaceSize}&nbsp;sq.ft.</Typography>
                                <Typography align='center'>Unit Price: &#x20B9;{props.orderReviewData.unitPrice}&nbsp;/sq.ft</Typography>
                                <Grid item sm={12}>
                                <div style={{ height: 370, width: "100%" }}>
                                <DataGrid getRowHeight={() => 'auto'}
                                // rows={[
                                //     { id: '1', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                                //     { id: '2', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                                //     { id: '3', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                                // ]}
                                rows={orderPaymentData()}
                                componentsProps={{}}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                />
                                </div>
                                <Button variant="contained" sx={{ backgroundColor: '#fb8c00', marginTop: '20px', left: '50%' }} onClick={() => {
                                swal({
                                icon: "success",
                                title: "Payment Successful!",
                                text: "Your 100 RS payment has been received with reference number 123456 and Order ID 987654.\n\nThank You",
                                buttons: {
                                    buttonOne: {
                                        text: "My Orders",
                                        value: "mo",
                                        visible: true,
                                        className: "sf-btn",
                                    }
                                }
                                }).then(function (value) {
                                if (value === "mo") { window.location.href = "/myorders"; }
                                else { window.location.href = "/myorders"; }

                                });
                            }}>Make Payment</Button>
                            </Grid>
                            </div>          
                        </Box>
                    </Container>
                </Grid>
            </Box>
        </>
    )
};

export default OrderReview;
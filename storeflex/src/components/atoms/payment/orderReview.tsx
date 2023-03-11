import React from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import swal from 'sweetalert';

const OrderReview = (props: any) => {
    
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
                                <div className='card-body'>
                                    <Grid container spacing={2} >
                                        <Grid item sm={4}><Typography>Order Id: {props.orderReviewData.orderId} </Typography></Grid>
                                        <Grid item sm={4}><Typography>Warehouse Id: {props.orderReviewData.warehouseId} </Typography></Grid>
                                        <Grid item sm={4}><Typography>Start Date: {props.orderReviewData.fromDate} </Typography></Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item sm={4}><Typography>End Date: {props.orderReviewData.toDate}</Typography></Grid>
                                        <Grid item sm={4}><Typography>Initial Amount: {props.orderReviewData.initialAmt}</Typography></Grid>
                                        <Grid item sm={4}><Typography>Total Amount: {props.orderReviewData.totalAmt}</Typography></Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item sm={4}><Typography>Total Amount: {props.orderReviewData.totalAmt}</Typography></Grid>
                                        <Grid item sm={4}><Typography>Required Space: {props.orderReviewData.spaceSize}&nbsp;sq.ft.</Typography></Grid>
                                        <Grid item sm={4}><Typography>Unit Price: &#x20B9;{props.orderReviewData.unitPrice}&nbsp;/sq.ft</Typography></Grid>
                                    </Grid>
                                    <Grid item sm={12}>
                                        <div style={{ height: 480, width: "100%" }}>
                                        <DataGrid getRowHeight={() => 'auto'}
                                            rows={orderPaymentData()}
                                            componentsProps={{}}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            disableSelectionOnClick
                                        />
                                        </div>
                                    </Grid>
                                </div> 
                                <div className='card-footer'>
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
                                </div>
                            </div>          
                        </Box>
                    </Container>
                </Grid>
            </Box>
        </>
    )
};

export default OrderReview;
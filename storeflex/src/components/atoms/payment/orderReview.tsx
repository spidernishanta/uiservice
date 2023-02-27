import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
//import PaymentMsg from '../../atoms/payment/paymentMsg';
import swal from 'sweetalert';

const OrderReview = (props: any) => {
    console.log(props.warehouseData.warehouseId);
    const columns = [
        {
            field: "actions",
            headerName: "ACTIONS",
            width: 100,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                    </Box>
                );
            },
        },
        { field: "orderId", headerName: "Order Id", width: 80 },
        { field: "monthYear", headerName: "Month/Year", width: 100 },
        { field: "qty", headerName: "Qty", width: 150 },
        { field: "unitPrice", headerName: "Unit Price", width: 250 },
        { field: "price", headerName: "Price", width: 100 },
        { field: "tax", headerName: "Tax", width: 100 },
        { field: "totalPrice", headerName: "Total Price", width: 150 },
        { field: "paidAmount", headerName: "Paid Amount", width: 100 },
        { field: "balance", headerName: "Balance", width: 100 },
        { field: "status", headerName: "Status", width: 100 },
        { field: "payout", headerName: "Payout", witdh: 100 },
        { field: "paid", headerName: "Paid", witdh: 100 },
        { field: "balPayout", headerName: "Bal Payout", witdh: 100 },
    ];

    return (
        <>
            <Box>
                <Typography component="p">Your Order Details</Typography>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={6}>
                        <p>Warehouse Name : {props.warehouseData.warehouseName}</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Order By: {props.warehouseData.clientId}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <p>Order Date: {Date()}</p>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <p>Start Date:</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>End Date: 01/01/2024</p>
                    </Grid>
                </Grid>
                <div style={{ height: 370, width: "100%" }}>
                    <DataGrid getRowHeight={() => 'auto'}
                        rows={[
                            { id: '1', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                            { id: '2', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                            { id: '3', orderId: '123', monthYear: '1270001', qty: '12-10-2022', unitPrice: '12-11-2022', price: 'UP, Noida', tax: '', totalPrice: '$90 million USD', paidAmount: '', balance: 'Active', status: '', payout: '', paid: '', balPayout: '' },
                        ]}
                        componentsProps={{}}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <Button variant="contained" sx={{ backgroundColor: '#fb8c00' }} onClick={() => {
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
                </Grid>
            </Box>
        </>
    )
};

export default OrderReview;
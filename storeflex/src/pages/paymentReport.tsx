import React, {useState} from 'react';
import { Box, Grid } from '@mui/material';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';
import { DataGrid } from "@mui/x-data-grid";
import InputBox from '../components/atoms/textfield/InputBox';

const PaymentReport = () => {

    const columns = [
        // {
        //   field: "actions",
        //   headerName: "ACTIONS",
        //   width: 100,
        //   sortable: false,
        //   disableColumnMenu: true,
        //   renderCell: (params) => {
        //     return (
        //       <Box
        //         sx={{
        //           width: "100%",
        //           height: "100%",
        //           display: "flex",
        //           justifyContent: "center",
        //           alignItems: "center",
        //         }}
        //       >
        //       </Box>
        //     );
        //   },
        // },
        { field: "orderId", headerName: "Order Id", width: 80 },
        { field: "monthYear", headerName: "Month/Year", width: 100 },
        { field: "qty", headerName: "Qty", width: 100 },
        { field: "unitPrice", headerName: "Unit Price", width: 100 },
        { field: "price", headerName: "Price", width: 100 },
        { field: "tax", headerName: "Tax", width: 100 },
        { field: "totalPrice", headerName: "Total Price", width: 100 },
        { field: "paidAmount", headerName: "Paid Amount", width: 100 },
        { field: "balance", headerName: "Balance", width: 100 },
        { field: "status", headerName: "Status", width: 100 },
        { field: "payout", headerName: "Payout", witdh: 100},
        { field: "paid", headerName: "Paid", witdh: 100, editable: true},
        { field: "balPayout", headerName: "Bal Payout", witdh: 100},
      ];

    return (
        <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()} />}
                right={
                    <div className='c-box-shadow-blue'>
                        <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                            <div className='primary-gradient'>
                                <div className='font-white p-sm f-18px f-bold'>
                                    Payment Report
                                </div>
                            </div>
                            <Grid container spacing={2} sx={{ mt: 0 }}>
                                <Grid item xs={6}>
                                <InputBox data={{
                                            name: 'Warehouse_name', label: 'Warehouse Name',
                                            value: ''
                                        }}
                                        />
                                </Grid>
                                <Grid item xs={6}>
                                    <p>Order:</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <p>Order By: Mehboob Alam</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <p>Order Date: 01/01/2023</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={6}>
                                    <p>Start Date: 01/01/2012</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <p>End Date: 01/01/2024</p>
                                </Grid>
                            </Grid>
                            <div style={{ height: 370, width: "100%" }}>
                                <DataGrid getRowHeight={() => 'auto'}
                                    rows={[
                                        {id:'1', orderId: 'WH1', monthYear: '12/2022', qty: '50', unitPrice: 'Rs.400', price: 'Rs.25,000', tax: 'Rs.1,000', totalPrice: '$90 million USD', paidAmount:'Rs.2000' ,balance: 'Rs.5000', status:'Active', payout:'NA',paid:'NA', balPayout:'Rs.5000'},
                                        {id:'2', orderId: 'WH87', monthYear: '12/2020', qty: '100', unitPrice: 'Rs.1000', price: 'Rs.25,000', tax: 'Rs.1,000', totalPrice: '$90 million USD', paidAmount:'Rs.10000' ,balance: 'NA', status:'Close', payout:'NA',paid:'NA', balPayout:'NA'},
                                        {id:'3', orderId: 'WH3', monthYear: '01/2019', qty: '2000', unitPrice: 'Rs.20000', price: 'Rs.25,000', tax: 'Rs.1,000', totalPrice: '$90 million USD', paidAmount:'Rs.10000' ,balance: 'Rs.6000', status:'Active', payout:'NA',paid:'NA', balPayout:'Rs.6000'},
                                        ]}
                                    componentsProps={{}}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                />
                            </div>
                        </Box>
                    </div>
                }
            />
            <Footer />
        </AppContainer>
    )
}

export default PaymentReport;
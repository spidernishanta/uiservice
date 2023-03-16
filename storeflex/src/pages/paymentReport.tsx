import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';
import { DataGrid  } from "@mui/x-data-grid";
import GetWarehouse from '../components/atoms/getwarehouse/GetWarehouse';
import Api from '../api/Api';
import { FormControl, Select, MenuItem } from '@mui/material';

const PaymentReport = () => {

    const api = new Api();
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
    const [warehouseOrderListData, SetWarehouseOrderListData] = useState([]);
    const [orderCode, setOrderCode] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [orderPaymentDetails, setOrderPaymentDetails] = useState([]);
    
    const onWarehouseChange = (id: string) => {
        setSelectedWarehouseId(id);
        setOrderCode('');
    };

    useEffect(()=>{
        getOrderList(selectedWarehouseId);
        getOrderDetails(orderCode);   
    },[selectedWarehouseId,orderCode]);

    const getOrderList = (selectedWarehouseId: any) => {
        api.getWarehouseOrdersList(selectedWarehouseId).then((resp) => {
            if(resp?.status === 'SUCCESS') {
                SetWarehouseOrderListData(resp.methodReturnValue);
            }
       }).catch((error)=>{
            console.log(' getWarehouse error >> ', error);
        });
    };

    const getOrderDetails = (orderCode: any) => {
        if(orderCode === '') {
            return;
        } else {
            api.getOrderListByOrderId(orderCode).then((resp)=>{ 
                if(resp.status === 'SUCCESS') { 
                    setOrderDetails(resp?.methodReturnValue); 
                    setOrderPaymentDetails(resp?.methodReturnValue.orderPaymentDetails);
                }
            }).catch((error)=>{
                console.log(' getOrderDetails >> ', error)
            })
        }
    }

    const handleChangeOrderId = (event: any) => {
        setOrderCode(event.target.value);
    };
    const GetOrderListByWareId = () => {
        return(
            <FormControl size="small" fullWidth={true}>
                <Select autoWidth={false} defaultValue="" value={orderCode} onChange={handleChangeOrderId}>
                    {warehouseOrderListData.map((item, index) => {
                        const itemCode = item;
                        const itemName = item;
                        return (
                            <MenuItem key={index + 1} value={itemCode}>{itemName}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        );   
    }
   
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

    const OrderPaymentInfo = () => {
        let list : any[] = [];
        if(orderPaymentDetails) {
            list = orderPaymentDetails.map((item, index) => { 
            return {
                id: index,
                paymentId: item['paymentId'],
                month: item['month']+' '+item['year'],
                monthlyBalance: item['monthlyBalance'],
                monthlyPayment: item['monthlyPayment'],
                paymentBalance: item['paymentBalance'],
                paymentDone: item['paymentDone'],
                payout: item['payout'],
                tax: item['tax'],
                status: item['status'],
                paytype: item['paytype']
            }
          })
          return list;
        } else {
          return list;
        }
    }


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
                                    <p>Warehouse Name:</p>
                                    <div className='p-top-md'>
                                        {<GetWarehouse onWarehouseChange={onWarehouseChange}/>}
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <p>Order:</p>
                                    <div className='p-top-md'>
                                       <GetOrderListByWareId />
                                    </div>
                                </Grid>
                            </Grid>
                            {selectedWarehouseId&&orderCode ? 
                            <>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={4}>
                                    <p>Warehouse Id: {orderDetails['warehouseId']}</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p>Order Date: {orderDetails['createDate']}</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p>Order Id: {orderDetails['orderId']}</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                    <p>Start Date: {orderDetails['fromDate']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>End Date: {orderDetails['toDate']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>Total Amount: {orderDetails['totalAmt']}</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                    <p>Initial Amount: {orderDetails['initialAmt']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>Status: {orderDetails['status']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>Unit Price: {orderDetails['unitPrice']}</p>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={4}>
                                    <p>Amount Remaining: {orderDetails['amtRemain']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <p>Requird Space Size: {orderDetails['spaceSize']}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    
                                </Grid>
                            </Grid>
                            <div style={{ height: 480, width: "100%", marginTop: '10px'}}>
                                    <DataGrid getRowHeight={() => 'auto'}
                                            rows={OrderPaymentInfo()}
                                            componentsProps={{}}
                                            columns={columns}
                                            pageSize={5}
                                            rowsPerPageOptions={[5]}
                                            disableSelectionOnClick
                                    />
                            </div>
                            </>:''}
                        </Box>
                    </div>
                }
            />
            <Footer />
        </AppContainer>
    )
}

export default PaymentReport;
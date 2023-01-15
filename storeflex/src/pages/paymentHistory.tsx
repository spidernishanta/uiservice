import React, {useState} from 'react';
import { Box, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ViewWarehouse = () => {
    const navigate = useNavigate();
    const goToNextPage = (pagePath: string) => {
        navigate(pagePath);
    }
    

    

    
    const [hoveredRow, setHoveredRow] = useState(null);
    const onMouseEnterRow = (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        setHoveredRow(id);
    };
    const onMouseLeaveRow = () => {
        setHoveredRow(null);
    };
    const [deleteLogoStatus, setDeleteLogoStatus] = useState(false);
    const [editLogoStatus, setEditLogoStatus] = useState(false);
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
                        <Tooltip
                            title="Edit"
                            placement="left"
                            arrow
                            enterDelay={100}
                            leaveDelay={100}
                        >
                            <IconButton
                                style={{
                                    backgroundColor:
                                        editLogoStatus && params.id === hoveredRow ? "#008CBA" : "",
                                    color:
                                        editLogoStatus && params.id === hoveredRow ? "white" : "",
                                }}
                                onMouseEnter={() => {
                                    setEditLogoStatus(true);
                                }}
                                onMouseLeave={() => {
                                    setEditLogoStatus(false);
                                }}
                                onClick={() => {
                                    // editBusiness(params.id);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Delete"
                            placement="top"
                            arrow
                            enterDelay={100}
                            leaveDelay={100}
                        >
                            <IconButton
                                style={{
                                    backgroundColor:
                                        deleteLogoStatus && params.id === hoveredRow
                                            ? "#f44336"
                                            : "",
                                    color:
                                        deleteLogoStatus && params.id === hoveredRow ? "white" : "",
                                }}
                                onMouseEnter={() => {
                                    setDeleteLogoStatus(true);
                                }}
                                onMouseLeave={() => {
                                    setDeleteLogoStatus(false);
                                }}
                                onClick={() => {
                                    
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
        { field: "OrderId", headerName: "Order Id", width: 100 },
        { field: "PaymentDate", headerName: "Payment Date", width: 120 },
        { field: "LeasePeriodFromTo", headerName: "Lease Period From To", width: 170 },
        { field: "PaymentMode", headerName: "Payment Mode", width: 150 },
        { field: "LeaseAmount", headerName: "Lease Amount", width: 120, },
        { field: "PaymentAmount", headerName: "Payment Amount", width: 130 },
        { field: "Balance", headerName: "Balance",width: 120 },
        { field: "Tax", headerName: "Tax", width: 100},
        { field: "Invoice", headerName: "Invoice", width: 100},
        { field: "Status", headerName: "Status", width: 100},
    ];
    return (
        <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()} />}
                right={
                    <div className='c-box-shadow-blue'>
                        <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                            <div>
                                <div className='primary-gradient'>
                                    <div className='font-white p-sm f-18px f-bold'>
                                        Payment History
                                        {/* <button className="primary-btn-outline" style={{ fontSize: '14px', float: 'right', borderRadius: 20, paddingLeft: '12px', paddingRight: '12px' }}><i className='mdi mdi-plus menu-icon'></i> Add New</button> */}
                                    </div>
                                </div>
                                {/* <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Payment Date</th>
                                            <th>Lease Period from-to</th>
                                            <th>Payment Mode</th>
                                            <th>Lease Amount</th>
                                            <th>Payment Amount</th>
                                            <th>Balance</th>
                                            <th>Tax</th>
                                            <th>Invoice</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ORD-101</td>
                                            <td>1/1/2023</td>
                                            <td>1/1/2023-31/1/2023</td>
                                            <td>Bank Transfer</td>
                                            <td>Rs.50000</td>
                                            <td>Rs.40000</td>
                                            <td>Rs.10000</td>
                                            <td></td>
                                            <td><a href='/document/sample.pdf'> Download </a></td>
                                            <td>Active</td>

                                        </tr>
                                        <tr>
                                            <td>ORD-102</td>
                                            <td>1/12/2022</td>
                                            <td>1/12/2022-31/1/2022</td>
                                            <td>Cheque</td>
                                            <td>Rs.75000</td>
                                            <td>Rs.75000</td>
                                            <td>Rs.0</td>
                                            <td></td>
                                            <td><a href='/downloadInvoice'> Download </a></td>
                                            <td>Active</td>

                                        </tr>
                                    </tbody>
                                </Table>  */}
                                <div style={{ height: 370, width: "100%" }}>
                    <DataGrid 
                        rows={[
                            {id:'123', OrderId:'ORD-101', PaymentDate:'1/1/2023', LeasePeriodFromTo: '1/1/2023-31/1/2023',PaymentMode:'Bank Transfer', LeaseAmount:'Rs.50000', PaymentAmount:'Rs.40000', Balance:'Rs.10000',Tax:'', Invoice:'Download',Status:'Active' },
                            {id:'124', OrderId:'ORD-!02', PaymentDate:'1/12/2022', LeasePeriodFromTo:'1/12/2022-31/1/2022',PaymentMode:'Cheque',LeaseAmount:'Rs.75000', PaymentAmount:'Rs.75000',Balance:'Rs.0', Tax:'', Invoice:'Download',Status:'Active'},

                        ]}
                        
                        componentsProps={{
                            row: {
                                onMouseEnter: onMouseEnterRow,
                                onMouseLeave: onMouseLeaveRow,
                            },
                        }}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
                            </div>
                        </Box>
                    </div>
                }
            />
            <Footer />
        </AppContainer>
    )
}

export default ViewWarehouse;

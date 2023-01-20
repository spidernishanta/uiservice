import React, { useState } from "react";
import { Box, Tooltip } from '@mui/material';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import TopNavBar from "../../navbar/TopNavBar";
import SideNavBar from "../../navbar/SideNavBar";
import { AppContainer, SplitPaneContainer } from "../../containers/containers";
import Footer from "../../footer/footer";
import { getUserType } from "../../../utils/CommonUtils";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";





const OrderTable = () => {
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
        { field: "Order", headerName: "Order", width: 100 },
        { field: "ProductName", headerName: "Product Name", width: 120 },
        { field: "AreaSize", headerName: "Area Size", width: 170 },
        { field: "Price", headerName: "Price", width: 150 },
        { field: "OrderDate", headerName: "Order Date", width: 120, },
        { field: "FromTo", headerName: "From To", width: 230 },
        { field: "Status", headerName: "Status", width: 100 },
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
                                        My Orders
                                        {/* <button className="primary-btn-outline" style={{ fontSize: '14px', float: 'right', borderRadius: 20, paddingLeft: '12px', paddingRight: '12px' }}><i className='mdi mdi-plus menu-icon'></i> Add New</button> */}
                                    </div>
                                </div>
                                <div style={{ height: 370, width: "100%" }}>
                                    <DataGrid
                                        rows={[
                                            { id: '123', Order: '12387', ProductName: 'ABC House', AreaSize: '12*12', Price: '1500', OrderDate: '12-02-2022', FromTo: '10th Jan,20-20th Jan,20', Status: 'Success' },
                                            { id: '124', Order: '12678', ProductName: 'JHCD House', AreaSize: '14*17', Price: '1100', OrderDate: '17-01-2022', FromTo: '14th Jan,20-27th Jan,20', Status: 'Failed' },
                                            { id: '124', Order: '4552', ProductName: 'KUJT House', AreaSize: '12*12', Price: '1900', OrderDate: '12-01-2022', FromTo: '14th Jan,20-27th Jan,20', Status: 'Success' },
                                            { id: '124', Order: '12387', ProductName: 'JHCD House', AreaSize: '14*17', Price: '1100', OrderDate: '17-01-2022', FromTo: '14th Jan,20-27th Jan,20', Status: 'Success' },
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



export default OrderTable;
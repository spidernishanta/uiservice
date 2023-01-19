import React,{useState} from 'react';
import { Box, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";


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
        { field: "ID", headerName: "ID", width: 100 },
        { field: "StartDate", headerName: "Start Date", width: 120 },
        { field: "EndDate", headerName: "End Date", width: 170 },
        { field: "Address", headerName: "Address", width: 150 },
        { field: "Size", headerName: "Size", width: 120, },
        { field: "Cost", headerName: "Cost", width: 230 },
        { field: "Invoice", headerName: "Invoice", width: 100 },
        { field: "Status", headerName: "Status", width: 100},
    ];
        return (
        <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()}/>}
                right={
                    <div className='c-box-shadow-blue'>
                        <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                            <div>
                                <div className='primary-gradient'>
                                    <div className='font-white p-sm f-18px f-bold'>
                                        Bookings
                                        <button  className="primary-btn-outline" style={{fontSize:'14px',float:'right',borderRadius:20,paddingLeft:'12px',paddingRight:'12px'}}><i className='mdi mdi-plus menu-icon'></i> Add New</button>
                                    </div>
                                </div>
                                <div style={{ height: 370, width: "100%" }}>
                                    <DataGrid
                                        rows={[
                                            { id: '123', ID: '1270001', StartDate: '12-10-2022', EndDate: '12-11-2022', Address: 'UP, Noida', Size: '', Cost: '$90 million USD', Invoice:'' ,Status: 'Active' },
                                            { id: '124', ID: '1270002', StartDate: '12-10-2022', EndDate: '12-11-2022', Address: 'UP, Noida', Size: '', Cost: '$90 million USD', Invoice:'', Status:'Active' },
                                            { id: '124', ID: '1270003', StartDate: '12-10-2022', EndDate: '12-11-2022', Address: 'UP, Noida', Size: '', Cost: '$90 million USD', Invoice:'' ,Status:'Active' }, 
                                            
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

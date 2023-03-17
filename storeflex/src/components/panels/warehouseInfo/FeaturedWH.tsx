import React, { useState, useEffect } from "react";
import { Box, ToggleButtonGroup, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { RadioGroup } from "@mui/material";
import Api from "../../../api/Api";
import { Button } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Radio } from "@mui/material";
import { MoveToFeatureWHPost, viewWarehouseAdminProps } from "../../../api/ApiConfig";
import { ToggleButton } from "@mui/material";
import { LoaderFull } from "../../atoms/loader/loader";
import { AppContainer } from "../../containers/containers";
import { DataGrid } from "@mui/x-data-grid";
import TopNavBar from "../../navbar/TopNavBar";
import { SplitPaneContainer } from "../../containers/containers";
import SideNavBar from "../../navbar/SideNavBar";
import { getUserType } from "../../../utils/CommonUtils";
import Footer from "../../footer/footer";
import { Switch } from "@mui/material";
import { CurrencyExchange, PanoramaSharp } from "@mui/icons-material";

let recordLabel = '';

const FeaturedWH = () => {
    const warehouseView = window.location.hash;
    const api = new Api();
    const navigate = useNavigate();
    const [myWarehouse, setMyWarehouse] = useState<Array<any>>([]);
    const [isLoader, setIsLoader] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const label = { inputProps: { 'aria-label': 'Switch demo' } };


    var page: any = "0";
    var size: any = "10";

    useEffect(() => {
        getWarehouseAdmin(page, size);
        setCurrentView(warehouseView);
    }, [warehouseView]);

    const getWarehouseAdmin = (page, size) => {
        let warehouseStatus = 'ACTIVE'
        recordLabel = 'Active Warehouses'
        setIsLoader(true);

        const data: viewWarehouseAdminProps = { page: page, size: size, status: warehouseStatus };
        api.getWarehouseAdmin(data).then((response) => {
            setIsLoader(false);
            setMyWarehouse(response.methodReturnValue.warehouseViewBean);

        }).catch((error) => {
            setIsLoader(false);
            console.log('getMyWarhouses', error);
        });
    };

    const goToEditPage = (warehouse: any) => {
        const pagePath = '/warehouse/edit'
        navigate(pagePath,
            {
                state: { editRecord: warehouse },
            }
        );
    }

    const DeleteWarehouse = (warehouse: any) => {
        swal({
            title: "Are you sure?",
            text:
                ' You are about to delete the warehouse "' +
                warehouse.warehouseName +
                "(" +
                warehouse.id +
                ')". Once deleted, you will not be able to recover this warehouse!',
            icon: "success",
            buttons: [true, true],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal(
                    'Success! Your warehouse "' +
                    warehouse.warehouseName +
                    "(" +
                    warehouse.id +
                    ')" has been deleted!',
                    {
                        icon: "success",
                        buttons: {
                            buttonOne: {
                                text: "OK",
                                visible: true,
                                className: "sf-btn",
                            }
                        }
                    }
                );
                let extractedArr = myWarehouse.filter((item, index) => {
                    return item.warehouseId != warehouse.id;
                });
                setMyWarehouse(extractedArr);
            } else {
                // do something if required
            }
        });
    };

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
    const [alignment, setAlignment] = React.useState('yes');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const [searches, setSearches] = useState([]);

    const func = (params: any) => {
        setSearches(searches => searches.concat(params.id));
        console.log("Testing:", searches);
    }

    const columns = [

        { field: "id", headerName: "ID", width: 350 },
        {
            field: "warehouseName", headerName: "Warehouse Name", width: 350
        },
        {
            field: "actions",
            headerName: "ACTIONS",
            width: 350,
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
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="no"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" onClick={(e) => func(params)} />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Box>
                );
            },
        },
    ];

    const showWarehouseList = () => {
        return (
            <div className="c-box-shadow-blue">
                <Box className="m-top-md m-bot-md m-left-md m-right-md">
                    <div className="primary-gradient">
                        <div className="font-white p-sm f-18px f-bold">{recordLabel}</div>
                    </div>
                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid getRowHeight={() => 'auto'}
                            rows={myWarehouse && myWarehouse.map((item: any) => ({
                                id: item.warehouseId,
                                clientId: item.clientId,
                                warehouseName: item.warehouseName,
                                descp: item.descp,
                                houseNo: item.houseNo,
                                plotNo: item.plotNo,
                                streetAddrs: item.streetAddrs,
                                city: item.city,
                                state: item.state,
                                pincode: item.pincode,
                                itemObj: item,
                            }))}
                            componentsProps={{
                                row: {
                                    onMouseEnter: onMouseEnterRow,
                                    onMouseLeave: onMouseLeaveRow,
                                },
                            }}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                    </div>
                </Box>
            </div>
        );
    }

    let whIds = ''

    const submitList = (searches) => {
        console.log("WarehouseId:", searches);
        const data: MoveToFeatureWHPost = {
            whIds: searches
        }
        api.MoveToFeatureWH(data).then((response) => {
            if (response.statusCode === 600) {
                swal({
                    title: "Success",
                    text: "Selected warehouses are added successfully",
                    icon: "success",
                    dangerMode: true,
                    closeOnClickOutside: true,
                });
            }
        })
    }

    return (
        <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()} />}
                right={
                    <div className='c-box-shadow-blue'>
                        {myWarehouse.length > 0 && showWarehouseList()}
                        <div className='p-top-md align-c'>
                            <Button className='sf-btn' variant="contained" onClick={(e) => { submitList(searches) }}> Save </Button>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <Button className="btn primary-btn sf-btn" variant="contained" onClick={() => window.history.back()}> Exit </Button>
                        </div>
                    </div>
                }
            />
            <Footer />
        </AppContainer>

    )
}

export default FeaturedWH;

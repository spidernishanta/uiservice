import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import swal from 'sweetalert';
import Api from '../../../../src/api/Api';
import { ViewCompaniesProps } from '../../../api/ApiConfig';
import { LoaderFull } from '../../atoms/loader/loader';
import { getClientId, getLogInType } from '../../../utils/CommonUtils';

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


let recordLabel = '';

const ViewBusiness = () => {
    const companyView = window.location.hash;
    const api = new Api();
    const navigate = useNavigate();
    const [myCompanies, setMyCompanies] = useState<Array<any>>([]);
    const [isLoader, setIsLoader] = useState(false);
    const [currentView, setCurrentView] = useState('');

    const [totalRecords, setTotalRecords] = useState(0);
    const [pageNo, setPageNo] = useState(0);
    const numberOfRecord = '10';

    useEffect(() => {
        if (companyView !== currentView) {
            getMyCompanies(pageNo, numberOfRecord);
            setCurrentView(companyView);
        }
        getMyCompanies(pageNo, numberOfRecord);
    }, [companyView, pageNo])


    const getMyCompanies = (curentPage, numberOfRecords) => {
        // IN-PROGRESS , IN-ACTIVE , ACTIVE
        let companyStatus = 'ACTIVE'
        if (companyView === '#inactive') {
            companyStatus = 'IN-ACTIVE';
            recordLabel = ' Inactive Companies'
        } else if (companyView === '#pending') {
            companyStatus = 'IN-PROGRESS';
            recordLabel = ' Pending Companies '
        } else {
            companyStatus = 'ACTIVE';
            recordLabel = ' Companies Onboared '
        }
        setIsLoader(true);

        const data: ViewCompaniesProps = {
            page: curentPage,
            size: numberOfRecords,
            status: companyStatus,
            clientId: getClientId()
        }
        api.getMyCompanies(data).then((response) => {
            setIsLoader(false);
            setMyCompanies(response.methodReturnValue.clientList);
            setTotalRecords(response.methodReturnValue.totalRecords);
        }).catch((error) => {
            setIsLoader(false);
            console.log(' getMyCompanies  ', error);
        });
    }

    const editBusiness = (companyId: any) => {
        const pagePath = '/business/edit'
        navigate(pagePath,
            {
                state: { editRecord: companyId },
            }
        );
    }
    const deleteBusiness = (company: any) => {
        swal({
            title: "Are you sure?",
            text: 'You are about to delete the company "' + company.compyName + '(' + company.clientId + ')" . Once deleted, you will not be able to recover this company!',
            icon: "warning",
            buttons: [true, true],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                if (company.clientId) {
                    setIsLoader(true);
                    api.deleteCompany(company.clientId).then((response) => {
                        setIsLoader(false);
                        swal('Success! Your company "' + company.compyName + '(' + company.clientId + ')" has been deleted!', {
                            icon: "success",
                            buttons: {
                                buttonOne: {
                                    text: "OK",
                                    value: "ok",
                                    visible: true,
                                    className: "sf-btn",
                                }
                            }
                        });
                        let extractedArr = myCompanies.filter((item, index) => {
                            return item.clientId !== company.clientId;
                        });
                        setMyCompanies(extractedArr);
                    }).catch((error) => {
                        setIsLoader(false);
                        console.log(' deleteCompany erroor ', error);
                    });
                }
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
                                    editBusiness(params.id);
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title="Delete"
                            placement="right"
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
                                    deleteBusiness(params.row)
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
        { field: "clientId", headerName: "Company Id", width: 100 },
        { field: "compyName", headerName: "Company Name", width: 150 },
        { field: "compyDesc", headerName: "Description", width: 150 },
        { field: "url", headerName: "Company Url", width: 250 },
        { field: "addresses", headerName: "Address", width: 200, },
        { field: "contact", headerName: "Email/Phone", width: 250 },
    ];

    const getAddress = (item: any) => {
        let address = '';
        if (item && item?.addresses.length) {
            address = item.addresses[0]?.addressType + ':' + item.addresses[0]?.streetDetails + ',' +
                item.addresses[0]?.city + ',' + item.addresses[0]?.pincode;
            return address;
        } else {
            return address;
        }
    }
    const companyData = () => {
        let list: any[] = [];
        if (myCompanies && myCompanies.length > 0) {
            list = myCompanies.map((item, index) => {
                return {
                    id: item.clientId,
                    clientId: item?.clientId,
                    compyName: item?.compyName,
                    compyDesc: item?.compyDesc,
                    url: item.url,
                    addresses: getAddress(item),
                    contact: item?.contact[0]?.emailId + '/' + item?.contact[0]?.mobileNo,
                }
            })
            return list;
        } else {
            return list;
        }
    }

    const handlePageChange = (e: any) => {
        setPageNo(e);
    }

    const showCompanyList = () => {
        //const text = companyData();
        return (
            <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                <div className='primary-gradient'>
                    <div className='font-white p-md f-18px f-bold'>
                        {recordLabel}
                    </div>
                </div>
                <div style={{ height: 600, width: "100%" }}>
                    <DataGrid getRowHeight={() => 'auto'} paginationMode="server"
                        rows={companyData()}
                        componentsProps={{
                            row: {
                                onMouseEnter: onMouseEnterRow,
                                onMouseLeave: onMouseLeaveRow,
                            },
                        }}
                        columns={columns}
                        pageSize={10}
                        rowCount={totalRecords}
                        onPageChange={handlePageChange}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                </div>
            </Box>
        )
    }

    return (
        <>
            {isLoader && <LoaderFull />}
            <div className='c-box-shadow-blue'>
                {showCompanyList()}
            </div>
        </>

    )
}

export default ViewBusiness;

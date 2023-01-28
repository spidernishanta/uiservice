import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Api from '../../api/Api';
import { viewUserProps } from '../../api/ApiConfig';
import { LoaderFull } from '../atoms/loader/loader';
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PAGES } from "../../utils/Constants";
import { getLogInType } from '../../utils/CommonUtils';
import { UserPostData } from '../../api/ApiConfig';


let recordLabel = '';

const ViewUser = () => {
  const userView = window.location.hash;

  const api = new Api();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<Array<UserPostData>>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currentView, setCurrentView] = useState('');

  const pageNo = '0';
  const numberOfRecord = '10';

  useEffect(() => {
    if (userView !== currentView) {
      getUserList(pageNo, numberOfRecord);
      setCurrentView(userView);
    }
  }, [userView])


  const getUserList = (curentPage, numberOfRecords) => {
    // IN-PROGRESS , IN-ACTIVE , ACTIVE
    let companyStatus = 'ACTIVE'
    if (userView === '#inactive') {
      companyStatus = 'IN-ACTIVE';
      recordLabel = ' Inactive Users'
    } else if (userView === '#pending') {
      companyStatus = 'IN-PROGRESS';
      recordLabel = ' Pending Users '
    } else {
      companyStatus = 'ACTIVE';
      recordLabel = 'Active Users'
    }
    setIsLoader(true);
    const data: viewUserProps = {
      page: curentPage,
      size: numberOfRecords,
      status: companyStatus
    }
    const userType = getLogInType();
    api.getUserList(data, userType).then((resp) => {
      setIsLoader(false);
      setUserList(resp.methodReturnValue);
    }).catch((error) => {
      setIsLoader(false);
      console.log(' getUserList  ', error);
    });
  }

  const editUser = (userId: any) => {
    const pagePath = PAGES.USER.EDIT.path
    navigate(pagePath,
      {
        state: { editRecord: userId },
      }
    );
  }
  const deleteBusiness = (company: any) => {
    console.log(company);
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
            let extractedArr = userList.filter((item, index) => {
              return item.clientId !== company.clientId;
            });
            setUserList(extractedArr);
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
                  editUser(params.row.userInfo);
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
    { field: "name", headerName: "Name", width: 245 },
    { field: "address", headerName: "Address", width: 245, },
    { field: "phone", headerName: "Phone", width: 245 },
    { field: "email", headerName: "Email", width: 245 },
  ];

  const userData = () => {
    const user : any[] = [];
    if(userList && userList.length > 0) {
      const t = userList.map((item, index) => {
        return {
          id: item.userId || index,
          name: `${item.firstName} ${item.lastName}`,
          address: `${item.houseNo} ${item.address}`,
          phone: `${item.mobileNo}`,
          email: `${item.email}`,
          userInfo : item,
        }
      })
      return t;
    } else {
      return user;
    }
  }
  const showUserList = () => {
    return (
      <Box className='m-top-md m-bot-md m-left-md m-right-md'>
        <div className='primary-gradient'>
          <div className='font-white p-md f-18px f-bold'>
            {recordLabel}
          </div>
        </div>
        <div style={{ height: 370, width: "100%" }}>
          <DataGrid getRowHeight={() => 'auto'}
            rows={userData()}
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
      </Box>
    )
  }

  return (
    <>
      {isLoader && <LoaderFull />}
      <div className='c-box-shadow-blue'>
        {showUserList()}
      </div>
    </>

  )
}

export default ViewUser;


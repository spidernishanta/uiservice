import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { PAGES } from '../../../utils/Constants';
import DashboardChart from '../chart/dashboardChart';
import { CmsContext } from '../../../context/ContextProvider';
import Api from '../../../api/Api';

const UserDashboard = (props) => {
    const userType = props?.userType;
    const navigate = useNavigate();
    interface warehouse {
        city: any,
        clientId: any,
        houseNo: any,
        pincode: any,
        plotNo: any,
        state: any,
        status: any,
        streetAddrs: any,
        warehouseName: any,
        warehouseId: any
    }

    const cmsContent = useContext(CmsContext);
    const dashboardContent = cmsContent['dashboard'];

    const handelOnClick = (path: string) => {
        if (path === '/search-new') {
            //console.log("ok");

            const api = new Api();
            //const pin = '';
            const pin = '781036'
            api.searchwarehouse(pin).then((response) => {
                //console.log('Warehouse Search >>>>', response);
                const data: warehouse = response.data.methodReturnValue.warehouseViewBean;
                if (response.data.status == 'SUCCESS') {
                    navigate('/search-new', { state: data });
                }
            })
                .catch((error) => {
                    console.log(error);
                })



        }
        else {
            navigate(path);
        }
    }

    return (
        <>
            <div>
                <div className='p-bot-lg'>
                    <DashboardChart userType />
                </div>
            </div>
            <div>
                <div className='sf-flex-grid sf-justify'>
                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.Business.ADD.path) }}>
                        {dashboardContent?.addBusinessBtn}
                    </Button>

                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.FeaturedWH.path) }}>
                        {dashboardContent?.featuredBtn}
                    </Button>

                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.VIEW_USER.path) }}>
                        {dashboardContent?.addUserBtn}
                    </Button>
                </div>
                <div className='sf-flex-grid sf-justify'>
                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.Warehouse.ADD.path) }}>
                        {dashboardContent?.addWarehouseBtn}
                    </Button>

                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.ContactUs.path) }}>
                        {dashboardContent?.reportBtn}
                    </Button>

                    <Button className='m-sm sf-btn w100' size="lg" active onClick={() => { handelOnClick(PAGES.AddInfo.path) }}>
                        {dashboardContent?.contactUpdateBtn}
                    </Button>
                </div>
            </div>

        </>
    )
}

export default UserDashboard;
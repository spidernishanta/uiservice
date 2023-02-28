import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import CustomizedSteppers from '../../../pages/Steps';
//import Footer from '../components/footer/footer';
//import GuestNavbar from '../components/navbar/guest-navbar';
import OrderReview from '../../atoms/payment/orderReview';
import TopNavBar from '../../navbar/TopNavBar';
//import PaymentMsg from '../../atoms/payment/paymentMsg';
//import { type } from '@testing-library/user-event/dist/type';



const PaymentStatus = () => {
  const { state } = useLocation();
  const [waredata, setWaredata] = useState<Array<any>>([]);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(()=> {
  const warehouseData: any = state; 
  setWaredata(warehouseData);
  },[]);

  return (
    <>
      <TopNavBar />
      <CustomizedSteppers />
      <div className="App">
        <br />
        {<OrderReview warehouseData={waredata}/>}
        {/* {<PaymentMsg txStatus="success" orderAmount="100" referenceId="885704785" />} */}
        {/* {<Footer />} */}
        <button className="btn scroll-top btn-hover" onClick={handleScrollToTop}>
          <i className="lni lni-chevron-up"></i>
        </button>
      </div>
    </>
  );
};

export default PaymentStatus;
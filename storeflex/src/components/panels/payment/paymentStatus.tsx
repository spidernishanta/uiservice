import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import CustomizedSteppers from '../../../pages/Steps';
import TopNavBar from '../../navbar/TopNavBar';
import OrderReview from '../../atoms/payment/orderReview';

const PaymentStatus = () => {
  const { state } = useLocation();
  const [orderReviewData, setOrderReviewData] = useState<Array<any>>([]);
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(()=> {
  const orderData: any = state;
  console.log(orderData);
  setOrderReviewData(orderData)
  },[]);
  
  return (
    <>
      <TopNavBar />
      <CustomizedSteppers />
      <div className="App">
        <br />
        {<OrderReview orderReviewData={orderReviewData}/>}
        <button className="btn scroll-top btn-hover" onClick={handleScrollToTop}>
          <i className="lni lni-chevron-up"></i>
        </button>
      </div>
    </>
  );
};

export default PaymentStatus;
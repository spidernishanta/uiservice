import React from 'react';
import CustomizedSteppers from '../../../pages/Steps';
//import Footer from '../components/footer/footer';
//import GuestNavbar from '../components/navbar/guest-navbar';
import OrderReview from '../../atoms/payment/orderReview';
import TopNavBar from '../../navbar/TopNavBar';
import PaymentMsg from '../../atoms/payment/paymentMsg';
//import { type } from '@testing-library/user-event/dist/type';



const paymentStatus = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <TopNavBar />
      <CustomizedSteppers />
      <div className="App">
        <br />
        {<OrderReview />}
        {/* {<PaymentMsg txStatus="success" orderAmount="100" referenceId="885704785" />} */}
        {/* {<Footer />} */}
        <button className="btn scroll-top btn-hover" onClick={handleScrollToTop}>
          <i className="lni lni-chevron-up"></i>
        </button>
      </div>
    </>
  );
};

export default paymentStatus;
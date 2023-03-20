import React, {useEffect, useState} from 'react';
import { Box, Grid, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { PaymentPostData } from '../../../api/ApiConfig';
import InputBox from '../../atoms/textfield/InputBox';
import Api from '../../../../src/api/Api';
import LoaderSpinner from '../../atoms/spinner/spinner';

interface PaymentGatewayProps {
    openModal: boolean;
    data?: PaymentPostData;
    onModalClose(open?: boolean): void;
}

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PaymentGatewayModal = (props: PaymentGatewayProps) => {

  const api = new Api();
  const [isLoader, setIsLoader] = useState(false);
  const [open, setOpen] = useState(false);
  //  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsLoader(false);
    props.onModalClose(false); 
    setOpen(false);
  }

    useEffect(() => {
        setOpen(props.openModal);
    },[props.openModal])
  
  const tempPostData = {
      order_id: "sftesting1234",
      order_amount: 10.00,
      order_currency: "INR",
      order_note: "Additional order info",
      customer_details: {
          customer_id: "12345",
          customer_email: "abc@sflex.com",
          customer_phone: "1234567891"
      },
      order_meta: {
          return_url: '',
      }
  }

  tempPostData.order_meta.return_url = `http://52.66.213.74/home?order_id=${tempPostData.order_id}`;

  const PayNow = () => {
    const postData = tempPostData;
    api.paymentGateway(postData).then((resp) => {
      setIsLoader(false);
      console.log(' PayNow ', resp);
      }).catch((error) => {
        setIsLoader(false);
          console.log(' PayNow erroor ', error);
      });
  }
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <div>
            <Box sx={styleModal} className='m-top-md m-bot-md m-left-md m-right-md'>
                <div className='primary-gradient'>
                    <div className='font-white p-sm f-18px f-bold'>
                      Please verify details
                    </div>
                </div>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={6}>
                  <InputBox data={{ name: 'order_id', label: 'Order Id *', value: '', isDisabled: true}}/>
                  </Grid>
                  <Grid item xs={6}>
                      <InputBox data={{ name: 'order_amount', label: 'Order Number *', value: '', isDisabled: true}}/>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={6}>
                  <InputBox data={{ name: 'customer_id', label: 'Customer Id *', value: '', isDisabled: true }}/>
                  </Grid>
                  <Grid item xs={6}>
                      <InputBox data={{ name: 'customer_email', label: 'Email Id*', value: '', isDisabled: true }}/>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={6}>
                  <InputBox data={{ name: 'order_currency', label: 'Currency', value: '', isDisabled: true }}/>
                  </Grid>
                  <Grid item xs={6}>
                      <InputBox data={{ name: 'order_customer_phonenote', label: 'Contact Number *', value: '', isDisabled: true }}/>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={12}>
                  <InputBox data={{ name: 'order_note', label: 'Order Note', value: '' }}/>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <Button variant="contained" sx={{backgroundColor: '#fb8c00'}} onClick={() => { PayNow()}}>Pay Now</Button>
                </Grid>
            </Grid>
            </Box>
            {isLoader && (
                <LoaderSpinner />
            )}
        </div>
        </Modal>
      </div>
    );
  }
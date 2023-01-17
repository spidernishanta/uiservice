import React from 'react';
import { Container } from '@mui/material';
import CartContents from '../components/cart-contents/cart-contents';
import TopNavBar from '../components/navbar/TopNavBar';



const storeDetails = [
    {
        companyName: "My-Hall Self Storage Provider",
        storeTitle: "Self Storage - 1",
        size: "5'x5'x8'",
        price: "4500.00",
        location: "Six mile, Guwahati, 781005",
        minspace: "9,425 Sq. Ft.",
        availspace: "20,000 Sq. Ft.",
        displayImage: ""
    }
]


const Cart = () => {

    return (
        <>
            {<TopNavBar />}
            <Container component="main" maxWidth="xl" className='p-no'>
                <div className='font-gray f-24px p-top-xl'>Your Shopping Cart(1)</div>
                {<CartContents storeInfo={storeDetails} />}
            </Container>

        </>
    )
}

export default Cart;
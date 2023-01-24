import React, {useEffect,useState} from 'react';
import { Container } from '@mui/material';
import CartContents from '../components/cart-contents/cart-contents';
import TopNavBar from '../components/navbar/TopNavBar';
import { useLocation } from "react-router-dom"



// const storeDetails = [
//     {
//         companyName: "My-Hall Self Storage Provider",
//         storeTitle: "Self Storage - 1",
//         size: "5'x5'x8'",
//         price: "4500.00",
//         location: "Six mile, Guwahati, 781005",
//         minspace: "9,425 Sq. Ft.",
//         availspace: "20,000 Sq. Ft.",
//         displayImage: ""
//     }
// ]


const Cart = () => {
    const { state } = useLocation();
    const [warehouseData, setWarehouseData] = useState<Array<any>>([]);

    useEffect(() => {
        const stateWarehouseData: any = state;
        setWarehouseData(stateWarehouseData); 
      }, [])

    return (
        <>
            {<TopNavBar />}
            <Container component="main" maxWidth="xl" className='p-no'>
                <div className='font-gray f-24px p-top-xl'>Your Shopping Cart(1)</div>
                {<CartContents storeInfo={warehouseData} />}
            </Container>

        </>
    )
}

export default Cart;
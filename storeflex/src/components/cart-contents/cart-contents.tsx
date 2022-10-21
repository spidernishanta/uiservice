import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Grid, Box, Container, styled, Paper, Divider } from '@mui/material';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import './cart-content.scss';
interface CartContentsProps {
    storeInfo: any
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const PriceDetailsHeader = () => {
    return (
        <>
            <Box sx={{
                p: 1,
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#101010' : 'grey.50',
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                fontSize: '1rem',
                fontWeight: '700',

            }}>
                <span>
                    Price Details
                </span>
            </Box>
        </>
    )
}

const CartContents = (props: CartContentsProps) => {
    const data = props.storeInfo;
    // console.log(data);
    // const [storeDetails, setStoreData] = useState<Array<any>>([]);
    // useEffect(()=>{
    //     setStoreData(data);  
    // },[])
    return (
        // <div>
        //     <Grid container  className='p-top-xl' spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
        //         <Grid item xs={9}>
        //           Self Storage Rental<hr/>
        //         </Grid>
        //         <Grid item xs={3}>
        //          Due Amount
        //         </Grid>
        //     </Grid>
        //     <Grid container>
        //         <Grid item xs={12}>
        //             {/* {data.storeInfo} */}
        //             <img className='img-200x150'
        //                 src='../static/images/img3.jpg'
        //             />
        //         </Grid>
        //     </Grid>

        //     <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
        //         {/* <Grid item xs={6}>
        //         <InputBox data={{name:'zipcode', label:'Zip*', value: data.zip}}/>
        //         </Grid>
        //         <Grid item xs={6}>
        //         {data.country && 
        //         <InputBox data={{name:'country', label:'Country', value: data.country}}/>}
        //         </Grid> */}
        //     </Grid>
        // </div>






        <Box className='p-top-xl' sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
                <Container maxWidth="xl">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: 1,
                    }}>

                        <Grid item xs={9} sx={{ pl: 1 }}>

                            {data.map((data: any) => (

                                <Item key={data.id} sx={{ mb: 1 }}>
                                    <Grid item xs={12} sx={{ p: 2 }}>
                                        <div className='text-left'>
                                            <div className='header'> {data.companyName} </div>
                                           
                                        </div><hr/>
                                        <Grid container spacing={2}>
                                            <Grid item sm={3}>
                                                <div className='card'>
                                                    <div className='text-left'>
                                                    <img className='img-200x150'
                                                src='../static/images/store1.jpg'
                                            />
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={7}>
                                                <div className='card p-top-xl'>
                                                    <div className='text-left'>
                                                        <div className='sub-header'> {data.storeTitle} </div>
                                                        <div className='sub-header'> {data.size} </div>
                                                        <div> {data.location} </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item sm={2}>
                                                <div className='card p-top-xl'>
                                                    <div className='text-left'>
                                                        <span>{data.price} <i>Per Month</i></span>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Item>

                            ))}


                        </Grid>
                        <Grid item xs={3} sx={{ pl: 3 }}>

                            <Item sx={{ p: 0 }}>
                                <Grid item xs={12}>

                                    {PriceDetailsHeader()}

                                    <Grid container spacing={2} sx={{ p: 1 }}>
                                        <Grid item sm={12}>
                                            <div className='card'>
                                                <div className='text-left'>
                                                    <span className='text-left'>Price(2 Items):</span> <span className='text-right'> 45000.00</span>
                                                    <Divider sx={{ m: 2 }} />
                                                    Discount: 0.00
                                                    <Divider sx={{ m: 2 }} />

                                                    Total Amount: 45000.00
                                                    <Divider sx={{ m: 2 }} />
                                                </div>
                                                <div >
                                                    <Button variant="contained" color="warning" size="small"> Make Payment </Button>
                                                </div>

                                            </div>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Item>


                        </Grid>
                    </Box>
                </Container>
            </Grid>


        </Box>




    )

}

export default CartContents;
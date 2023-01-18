import React, {useState} from 'react';
import { Box, TextField, Button, Grid, Typography } from '@mui/material';
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';

const Payments = () => {

    return (
        <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()} />}
                right={
                    <div className='c-box-shadow-blue'>
                        <Box className='m-top-md m-bot-md m-left-md m-right-md'>
                            <div className='primary-gradient'>
                                <div className='font-white p-sm f-18px f-bold'>
                                    Bank Account Verification 
                                </div>
                            </div>
                        <Typography component="p" sx={{mt:1}}>Please enter bank account details</Typography>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullName"
                                    // required
                                    fullWidth
                                    id="fullName"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="given-mobile"
                                    name="mobileNo"
                                    // required
                                    fullWidth
                                    id="mobileNo"
                                    label="Mobile No"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="given-accountNo"
                                    name="accountNo"
                                    // required
                                    fullWidth
                                    id="accountNo"
                                    label="Account Number"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    autoComplete="given-ifsc"
                                    name="ifsc"
                                    // required
                                    fullWidth
                                    id="ifsc"
                                    label="IFSC"
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <Button variant="contained" sx={{backgroundColor: '#fb8c00'}}>Verify</Button>
                            </Grid>
                        </Grid>
                        </Box>
                    </div>
                }
            />
            <Footer />
        </AppContainer>
    )
}

export default Payments;
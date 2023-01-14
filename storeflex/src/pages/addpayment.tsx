import React from 'react';
import { Box, Container } from '@mui/material';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import TopNavBar from '../components/navbar/TopNavBar';
import Footer from '../components/footer/footer';
import SideNavBar from '../components/navbar/SideNavBar';
import { getUserType } from '../utils/CommonUtils';
import { Table } from 'react-bootstrap';

const AddPayment = () => {
    return (
        <>
            <AppContainer>
                <TopNavBar />
                <SplitPaneContainer
                    left={<SideNavBar userType={getUserType()} />}
                    right={
                        <Container component="main" maxWidth="xl" className='p-no'>
                            <div className='primary-gradient'>
                                <div className='font-white p-sm f-18px f-bold'>
                                    My Payment
                                    {/* <button className="primary-btn-outline" style={{ fontSize: '14px', float: 'right', borderRadius: 20, paddingLeft: '12px', paddingRight: '12px' }}><i className='mdi mdi-plus menu-icon'></i> Add New</button> */}
                                </div>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Payment Date</th>
                                        <th>Lease Period from-to</th>
                                        <th>Payment Mode</th>
                                        <th>Lease Amount</th>
                                        <th>Payment Amount</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ORD-101</td>
                                        <td>1/1/2023</td>
                                        <td>1/1/2023-31/1/2023</td>
                                        <td>Bank Transfer</td>
                                        <td>Rs.50000</td>
                                        <td>Rs.40000</td>
                                        <td>Rs.10000</td>
                                        
                                    </tr>
                                    <tr>
                                        <td>ORD-102</td>
                                        <td>1/12/2022</td>
                                        <td>1/12/2022-31/1/2022</td>
                                        <td>Cheque</td>
                                        <td>Rs.75000</td>
                                        <td>Rs.75000</td>
                                        <td>Rs.0</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Container>
                    }

                        />

            </AppContainer>
            <Footer />


        </>
    )
}

export default AddPayment;

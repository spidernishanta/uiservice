import React from 'react';
import { Container } from '@mui/material';
import SearchInfo from '../components/panels/search/SearchInfo';

const PgSearch = () => {

    return(
        <>
            <Container component="main" maxWidth="xl" className='p-no'>
            {SearchInfo()}
            </Container>
        </>
    )
}

export default PgSearch;
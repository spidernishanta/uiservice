import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './searchresult.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from 'react-bootstrap';


interface parentProps {
    officeData?: any;
    handleFilte?: any;
}


export default function Filter(props?: parentProps) {

    const [radioValue, setRadioValue] = React.useState('');




    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    const handleRadioFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        var filterValue = (event.target as HTMLInputElement).value;
        setRadioValue(filterValue);

        if (filterValue === 'ascending') {
            var office = props?.officeData;
            var sortedData = office.sort((a: any, b: any) => {
                return a.rate - b.rate
            });
            props?.handleFilte(sortedData, filterValue);
        }

        if (filterValue === 'descending') {
            var office = props?.officeData;
            var sortedData = office.sort((a: any, b: any) => {
                return b.rate - a.rate
            });
            props?.handleFilte(sortedData, filterValue);
        }

    }

    return (
        <>
            <div className="col-md-2 pr-1" style={{ backgroundColor: '#eee' }}>
                <button className="primary-btn" onClick={() => window.history.back()}><ArrowBackIcon /></button>
                <div className="card m-0">
                    <div className="col-md-12 p-1">
                        <span>
                            Filter And Sort Locations
                        </span>
                        <hr />

                        <div className="card-group-item">

                            <header className="card-header p-0">
                                <h6 className="title">Sorts By Price:</h6>
                            </header>


                            <div className="filter-content ml-2">
                                <div className="card-body">
                                    <label className="form-check">
                                        <input className="form-check-input" onChange={handleRadioFilter} type="radio" name="price" value="ascending" />
                                        <span className="form-check-label m-0">
                                            Lowest to Highest
                                        </span>
                                    </label>

                                    <label className="form-check">
                                        <input className="form-check-input" onChange={handleRadioFilter} type="radio" name="price" value="descending" />
                                        <span className="form-check-label m-0">
                                            Highest to Lowest
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <article className="card-group-item">
                            <header className="card-header p-0">
                                <h6 className="title">Choose by Storage Layout: </h6>
                            </header>
                            <div className="filter-content  ml-2">
                                <div className="card-body">
                                    <form>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="Floor Space" />
                                            <span className="form-check-label m-0">
                                                Floor Space
                                            </span>
                                        </label>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="Racking" />
                                            <span className="form-check-label m-0">
                                                Racking
                                            </span>
                                        </label>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="Secured Room" />
                                            <span className="form-check-label m-0">
                                                Secured Room
                                            </span>
                                        </label>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="Pick Module" />
                                            <span className="form-check-label m-0">
                                                Pick Module
                                            </span>
                                        </label>
                                        <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="Pick Dedicated Room" />
                                            <span className="form-check-label m-0">
                                                Pick Dedicated Room
                                            </span>
                                        </label>
                                    </form>

                                </div>
                            </div>
                        </article>

                        <article className="card-group-item">
                            <header className="card-header p-0">
                                <h6 className="title">Minimum Space: </h6>
                            </header>
                            <div className="filter-content  ml-2">
                                <div className="card-body">
                                    <form>
                                        <label className="form-check">
                                            Area
                                            <span className="input-group">
                                                <select className='form-control' name="" id="">
                                                    <option value='1" x 1"'>1" x 1"</option>
                                                    <option value='2" x 2"'>2" x 2"</option>
                                                    <option value='3" x 3"'>3" x 3"</option>
                                                </select>
                                            </span>
                                        </label>
                                    </form>

                                </div>
                            </div>
                        </article>

                        <article className="card-group-item">
                            <header className="card-header p-0">
                                <h6 className="title">Price Range: </h6>
                            </header>
                            <div className="filter-content  ml-2">
                                <div className="card-body">
                                    <form>
                                        <label className="form-check">
                                            Range
                                            <span className="input-group">
                                                <select className='form-control' name="" id="">
                                                    <option value="">&#x20B9;0.00 - &#x20B9;500.00</option>
                                                    <option value="">&#x20B9;500.00 - &#x20B9;1500.00</option>
                                                    <option value="">&#x20B9;1500.00 - &#x20B9;2500.00</option>
                                                    <option value="">&#x20B9;3000.00 - &#x20B9;4500.00</option>
                                                </select>
                                            </span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </article>

                        <article className="card-group-item">
                            <header className="card-header p-0">
                                <h6 className="title">Facility Qualification: </h6>
                            </header>
                            <div className="filter-content  ml-2">
                                <div className="card-body">
                                    <form>
                                        <label className="form-check">
                                            Qualification
                                            <span className="input-group">
                                                <select className='form-control' name="" id="">
                                                    <option value="">Qualification-1</option>
                                                    <option value="">Qualification-2</option>
                                                    <option value="">Qualification-3</option>
                                                </select>
                                            </span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>

            </div>



            {/* <Item sx={{ p: 0 }}>

            
                <Grid item xs={12}>

                    {filterHeader()}
                    <Grid container spacing={2} sx={{ p: 1 }}>
                        <Grid item sm={12}>
                            <div className='card'>
                                <div className='text-left'>
                                    {FIlterRadioButtons()}
                                    <Divider sx={{ m: 2 }} />
                                    {FIlterSliderRange()}
                                    <Divider sx={{ m: 2 }} />

                                    {CheckboxLabels()}
                                    <Divider sx={{ m: 2 }} />
                                </div>
                                <div className='text-right'>
                                    <Button variant="contained" color="info" size="small"> Apply </Button>
                                </div>

                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Item> */}


        </>
    )
}












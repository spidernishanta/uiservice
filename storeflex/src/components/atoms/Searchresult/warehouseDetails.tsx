import * as React from 'react';
import { useState, useEffect } from 'react';
import TopNavBar from '../../navbar/TopNavBar';
import { useNavigate, useLocation } from "react-router-dom";
import './searchresult.css';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Carousel from 'react-bootstrap/Carousel';
import Table from 'react-bootstrap/Table';
import Api from '../../../api/Api';
import { getWhCategories } from '../../../utils/CommonUtils';


const WarehouseDetails = () => {
  const [warehouseInfo, setWarehouseInfo] = useState<Array<any>>([]);
  const { state } = useLocation();
  const api = new Api();
  const [address, setAddress] = useState<Array<any>>([]);
  const [hours, setHours] = useState<Array<any>>([]);
  const [priceList, setPriceList] = useState<Array<any>>([]);

  useEffect(() => {
    const stateWarehouseData: any = state;
    setPriceList(stateWarehouseData.pricebean);
    console.log(stateWarehouseData);
    api.getWarehouseById(stateWarehouseData.warehouseId).then((response) => {
      if (response.status == 'SUCCESS') {
        setWarehouseInfo(response.methodReturnValue);
        setAddress(response.methodReturnValue.address);
        setHours(response.methodReturnValue.hours);
        // setPriceList(response.methodReturnValue.warehousepriceList);
        // console.log(response.methodReturnValue);
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const navigate = useNavigate();
  const addToCart = (e: any, selectedItem: any) => {
    navigate('/cart', { state: selectedItem });
  }

  return (
    <>
      <TopNavBar />
      <div className="col-md-12 col-xl-12 pt-5">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row">
              <div className="col-12 mb-4 mb-lg-0 border border-warning">
                <div className="row">
                  <div className="col-md-12 col-lg-8 col-xl-8 p-2">
                    <Carousel fade>
                      <Carousel.Item>
                        <img className="d-block  img-fluid border border-success" style={{ height: '50vh', width: '100%', objectFit: 'cover' }} src={'https://media.istockphoto.com/photos/warehouse-worker-picture-id1179825208'} />
                        <Carousel.Caption>

                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img className="d-block  img-fluid border border-success" style={{ height: '50vh', width: '100%', objectFit: 'cover' }} src={'https://media.istockphoto.com/id/1165357335/photo/male-worker-working-in-warehouse.webp?s=612x612&w=is&k=20&c=zcBK2kcxFDIBbd_aKXh_-kek_MGX30smjx64GURYGAU='} />

                        <Carousel.Caption>

                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <img className="d-block  img-fluid border border-success" style={{ height: '50vh', width: '100%', objectFit: 'cover' }} src={'https://media.istockphoto.com/id/980114338/photo/supervisor-and-employee-at-warehouse.webp?s=612x612&w=is&k=20&c=6TtBd269scsOMBrswgxy0tsa64_MsChdpXo_oBrz8yk='} />

                        <Carousel.Caption>

                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>

                  </div>


                  <div className="col-md-12 col-lg-4 col-xl-4 align-self-center p-2">
                    <div className="row">

                      <div className="col-6">
                        <div className="bg-image border border-success hover-zoom ripple rounded ripple-surface p-2">
                          <img src={'https://media.istockphoto.com/photos/warehouse-worker-picture-id1179825208'}
                            className="w-100" />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-image border border-success hover-zoom ripple rounded ripple-surface p-2">
                          <img src={'https://media.istockphoto.com/photos/warehouse-worker-picture-id1179825208'}
                            className="w-100" />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-image border border-success hover-zoom ripple rounded ripple-surface p-2">
                          <img src={'https://media.istockphoto.com/photos/warehouse-worker-picture-id1179825208'}
                            className="w-100" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="bg-image border border-success hover-zoom ripple rounded ripple-surface p-2">
                          <img src={'https://media.istockphoto.com/photos/warehouse-worker-picture-id1179825208'}
                            className="w-100" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center p-2" style={{ border: '0px' }}>
                      <button className='btn primary-btn-outline rounded-full btn-sm text-capitalize'>More Images</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-12 col-xl-12 p-3">
                <h5><BeenhereIcon />{warehouseInfo['warehouseName']}</h5>
                <div className="d-flex flex-row">
                  <span>{warehouseInfo['warehouseId']}</span>
                </div>
                <div className="mt-1 mb-0 text-muted small">
                  <span>{address.map((item, index) => (
                    <span key={index}>
                      <span>House No: {item.houseNo},&nbsp;&nbsp;</span>
                      <span>Street: {item.streetDetails},&nbsp;&nbsp;</span>
                      <span>Plot No: {item.plotNo},&nbsp;&nbsp;</span>
                      <span>City: {item.city},&nbsp;&nbsp;</span>
                      <span>Pin Code: {item.pincode},&nbsp;&nbsp;</span>
                      <span>State: {item.state},&nbsp;&nbsp;</span>
                      <span>Country: {item.country}&nbsp;&nbsp;</span>
                    </span>
                  ))}</span>
                </div>
                <div className="mb-2 text-muted small">
                  <span>Room Size</span>
                  <span className="text-primary"> • </span>
                  {/* <span>24x24</span> */}
                  <span className="text-primary"> • </span>
                  {/* <span>10x12<br /></span> */}
                </div>
                <p className="text-truncate mb-4 mb-md-0">
                  <h5> About </h5>
                  {warehouseInfo['descp']}
                </p>
              </div>


              <Table responsive>

                <tbody>
                  <tr>
                    <th>Available Space</th>
                    <td>{priceList['availspace']}</td>
                    <th>Price/Sq.Ft./30 days</th>
                    <td>&#x20B9;{priceList['ratesqtft']}</td>
                  </tr>

                  <tr>
                    <th>Minimum Order Quantity</th>
                    <td>{priceList['minordersqt']}</td>
                    <th>Clear Ceiling Height</th>
                    <td>{warehouseInfo['ceillingheight']}</td>
                  </tr>
                  <tr>
                    <th>Unloading/Palette</th>
                    <td>&#x20B9;{priceList['unloading']}</td>
                    <th>Loading/Palette</th>
                    <td>&#x20B9;{priceList['loading']}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{warehouseInfo['status']}</td>
                    <th>Available Days</th>
                    <td>{hours['openday']}</td>
                  </tr>

                  <tr>
                    <th>#Dock High Doors</th>
                    <td>{warehouseInfo['dockhighdoors']}</td>
                    <th>#At Grade Doors</th>
                    <td>{warehouseInfo['atgradedoors']}</td>
                  </tr>
                  <tr>
                    <th>#Start Lease</th>
                    <td>{priceList['startLease']}</td>
                    <th>#End Lease</th>
                    <td>{priceList['endLease']}</td>
                  </tr>
                </tbody>
              </Table>
              <div className="col-md-12 col-lg-12 col-xl-12 border-sm-start-none border-start p-3">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">Industry served</h4>
                </div>
                <li>{JSON.stringify(getWhCategories('WT', warehouseInfo['industryId'])).substring(1, JSON.stringify(getWhCategories('WT', warehouseInfo['industryId'])).length - 1)} </li>
              </div>

              <div className="col-md-12 col-lg-12 col-xl-12 border-sm-start-none border-start p-3">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">Storage Layout</h4>
                </div>
                <li>{JSON.stringify(getWhCategories('WS', warehouseInfo['storagesId'])).substring(1, JSON.stringify(getWhCategories('WS', warehouseInfo['storagesId'])).length - 1)}</li>
              </div>

              <div className="col-md-12 col-lg-12 col-xl-12 border-sm-start-none border-start p-3">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">Facility Qualifications</h4>
                </div>
                <li>{JSON.stringify(getWhCategories('WF', warehouseInfo['facilitiesId'])).substring(1, JSON.stringify(getWhCategories('WF', warehouseInfo['facilitiesId'])).length - 1)} </li>
              </div>


              <div className="col-md-12 col-lg-12 col-xl-12 border-sm-start-none border-start">
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">&#x20B9; {'155'}.00</h4>
                  <span className="text-danger"><s>&#x20B9; 200.99</s></span>
                </div>
                <h6 className="text-success"> Few space left.</h6>
                <div className="d-flex flex-column mt-4">

                  <button className="btn primary-btn rounded-full" style={{ marginTop: '5px' }} type="button" onClick={(e) => { addToCart(e, warehouseInfo) }}>
                    Proceed to Buy
                  </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default WarehouseDetails;
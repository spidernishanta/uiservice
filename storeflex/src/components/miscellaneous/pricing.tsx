import React from 'react';
import Carousel from "../carousel/carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import InputBox from '../atoms/textfield/InputBox';

const Pricing = () => {
  const [featureWHList, setFeatureWHList] = useState<Array<any>>([]);
  const api = new Api();

  const navigate = useNavigate();

  const WarehouseDetails = () => {
    navigate('/WarehouseDetails');
  }
  const [priceList, setPriceList] = useState<Array<any>>([]);

  const addToCart = () => {
    navigate('/cart');
  }

  useEffect(() => {
    api.featurewarehouse().then((resp) => {
      const data = resp.methodReturnValue;
      console.log(' getFeatureWH success >> ', data);
      if (resp?.methodReturnValue) {
        setFeatureWHList(data);
        setPriceList(data.warehousepriceList);
      }
    }).catch((error) => {
      console.log(' getFeatureWH error >> ', error);
    });

  }, [""]);



  return (
    <>
      <section id="pricing" className="pricing-area pricing-fifteen">
        <div className="section-title-three">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content">
                  <h2>FEATURED WAREHOUSES</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Custom Carousel*/}
        <div
          style={{
            maxWidth: 1200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 64,
          }}
        >
          <Carousel show={3} slide={true}>
            {
              featureWHList.map((ware) => (
                <Card border="warning" style={{ width: "18rem", marginRight: "25px", boxShadow: '1px 3px 9px #F4AAB9' }}>
                  <Card.Img variant="top" src="static\images/royal-palace.jpg" />

                  <Card.Body className="text-center">
                    <Card.Title>{ware.warehouseName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {ware.address[0].city}, {ware.address[0].state}
                    </Card.Subtitle>
                    <Card.Text>
                      {ware.descp}
                    </Card.Text>
                    <h6 className="amount">
                      &#x20B9;{parseFloat(ware.warehousepriceList[0].ratesqtft).toFixed(2)}<span className="duration">/month</span>
                    </h6><br />
                    <button className="btn primary-btn btn-sm" onClick={WarehouseDetails} >Details</button>
                    <p className="pt-1"><Card.Link href="/Cart"><u>Add to Wishlist</u></Card.Link></p>
                  </Card.Body>

                </Card>
              ))
            }
          </Carousel>
          {/* {featureWHList.map((ware) => (
            <input value={ware.warehouseName}></input>
          ))} */}
        </div>
      </section >
    </>
  );
};
export default Pricing;
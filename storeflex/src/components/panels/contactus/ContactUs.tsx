import { useState } from 'react';
import swal from 'sweetalert';
import { Contacts } from '../../atoms/contact/contacts';
import { EnquiryProps } from '../../../api/ApiConfig';
import Api from '../../../api/Api';
import { LoaderFull } from '../../atoms/loader/loader';
import { getUserEmail, getFirstName, getLastName } from '../../../utils/CommonUtils';
import { getUserLoggedIn } from '../../../utils/CommonUtils';

const ContactUs = () => {
  const isAuthenticated = getUserLoggedIn();

  const api = new Api();
  const contactList = [
    {
      country: 'India',
      countryFlag: '/images/country/india.png',
      address: 'S 3061, Akshar Business Park , Sector 25, Vashi, Navi Mumbai, Maharastra, India 400703',
      tel: '000 800 050 1417'
    },
    {
      country: 'USA',
      countryFlag: '/images/country/usa.png',
      address: 'PO Box: 234, Round Rock, Texas, USA - 78681',
      tel: '000 800 050 1417'
    }
  ];

  const [loader, setLoader] = useState(false);

  sessionStorage.setItem('firstName', getFirstName());
  sessionStorage.setItem('lastName', getLastName());
  sessionStorage.setItem('email', getUserEmail());

  const contactUsFields = {
    fname: "",
    mname: "",
    lname: "",
    subject: "",
    email: "",
    phone: "",
    message: ""
  }
  const [values, setValues] = useState(contactUsFields);

  const contactUsErrors = {
    nameError: "",
    subjectError: "",
    emailError: "",
    phoneError: "",
    messageError: ""
  }

  const [errors, setErrors] = useState(contactUsErrors);

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const sendMessage = () => {
    if (!values.fname) {
      setErrors({ ...errors, nameError: " *First Name is required. " });
    } else if (!values.subject) {
      setErrors({ ...errors, subjectError: " *Subject is required. " });
    } else if (!values.email) {
      setErrors({ ...errors, emailError: " *Email is required. " });
    } else if (!values.phone) {
      setErrors({ ...errors, phoneError: " *Phone is required. " });
    } else if (!values.message) {
      setErrors({ ...errors, messageError: " *Message is required. " });
    }
    else {

      const postData = {
        firstName: values.fname,
        middleName: values.mname,
        lastName: values.lname,
        email: values.email,
        mobileNo: values.phone,
        subject: values.subject,
        descp: values.message,
      } as EnquiryProps

      setLoader(true);
      api.enquiry(postData).then((response) => {
        swal('Your message has been sent successfully!', {
          icon: "success",
          buttons: {
            buttonOne: {
              text: "OK",
              visible: true,
              className: "sf-btn",
            }
          }
        });
        setValues(contactUsFields);
        setErrors(contactUsErrors);
        setLoader(false);
        console.log(' Company creation res >>>>>> ', response);
      }).catch((error) => {
        setLoader(false);
        swal('Error sending message please try again', {
          icon: "error",
          buttons: {
            buttonOne: {
              text: "OK",
              visible: true,
              className: "sf-btn",
            }
          }
        });
        console.log(' Error sending message please try again ', error);
      });
    }
  }

  return (
    <>
      {loader && <LoaderFull />}
      {/* <!--======  Start Section Title Three ======--> */}
      <div className="section-title-three">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <h5>Contact Us</h5>
                <h2 className="fw-bold">Reach out to us!</h2>
                <p>
                  Got a question about StoreFlex? Are you interested in partnering with us?
                  Have some suggestions or just want to say hi? Contact us:
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- container --> */}
      </div>
      {/* <!--====== End Section Title Three ======--> */}
      <div className="container">
        <div className="contact-head">
          <div className="inner-content">
            <div className="row">
              <div className="col-lg-8 col-12">
                <div className="form-main">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        {isAuthenticated ?
                          <input name="fname" type="text" placeholder="First Name" onChange={handleChange} value={values.fname = sessionStorage.getItem('firstName') || ''} readOnly />
                          : <input name="fname" type="text" placeholder="First Name" onChange={handleChange} value={values.fname} />
                        }
                        {errors.nameError && <p className="text-red">{errors.nameError}</p>}
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        <input name="mname" type="text" placeholder=" Middle Name" onChange={handleChange} value={values.mname} />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="form-group">
                        {isAuthenticated ?
                          <input name="lname" type="text" placeholder="Last Name" onChange={handleChange} value={values.lname = sessionStorage.getItem('lastName') || ''} readOnly />
                          : <input name="lname" type="text" placeholder="Last Name" onChange={handleChange} value={values.lname} />
                        }
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <input name="subject" type="text" placeholder="Subject" onChange={handleChange} value={values.subject} />
                        {errors.subjectError && <p className="text-red">{errors.subjectError}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        {isAuthenticated ?
                          <input name="email" type="email" placeholder="Email" onChange={handleChange} value={values.email = sessionStorage.getItem('email') || ''} readOnly />
                          : <input name="email" type="email" placeholder="Email" onChange={handleChange} value={values.email} />
                        }
                        {errors.emailError && <p className="text-red">{errors.emailError}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="form-group">
                        <input name="phone" type="number" placeholder="Phone" onChange={handleChange} value={values.phone} />
                        {errors.phoneError && <p className="text-red">{errors.phoneError}</p>}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group message">
                        <textarea name="message" placeholder="Message" onChange={handleChange} value={values.message} />
                        {errors.messageError && <p className="text-red">{errors.messageError}</p>}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group light-rounded-buttons">
                        <button onClick={() => { sendMessage() }} type="submit" className="btn primary-btn">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="contact-info">
                  <div className="single-head">
                    <div className='p-bot-md'>
                      <div>
                        {
                          contactList.map((list, index) => {
                            return (
                              <div key={`contact_${index}`} className='p-bot-md'>
                                <Contacts contact={list} />
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="single-info">
                      <a href="mailto:support@storeflex.com"><i className="lni lni-envelope"></i></a>
                      <ul>
                        <li><span>Mail Us</span></li>
                        <li>
                          <a href="mailto:support@storeflex.com"> support@storeflex.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
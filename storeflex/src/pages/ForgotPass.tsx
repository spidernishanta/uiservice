import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { validateMinLen, setUserLoggedIn, getRedirectionPage, sessionStorageSet } from '../utils/CommonUtils';
import Api from '../api/Api';
import { SignInPost } from '../api/ApiConfig';
import { USER_TYPE, PAGES, SESSION_TYPE } from '../utils/Constants';
import GoogleLogin from 'react-google-login';
import { gapi } from "gapi-script";
import { LoaderFull } from '../components/atoms/loader/loader';
import swal from 'sweetalert';
import { CheckBox, CheckBoxOutlineBlankTwoTone, Lock, RadioButtonChecked, Visibility } from '@mui/icons-material';
import IconButton from '@mui/material';
import InputAdornment from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Add } from '@mui/icons-material';
import { Navbar, Container } from 'react-bootstrap';
import faq from './faq';

const ForgotPass = () => {
    const navigate = useNavigate();
    const api = new Api();
    const [loader, setLoader] = useState(false);

    let userType = '';

    const url = window.location.href;

    if (url && url.indexOf(PAGES.SignIn.adminPath) !== -1) {
        userType = USER_TYPE.SfUser;
    } else {
        userType = USER_TYPE.SfClient;
    }

    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            plugin_name: "storeflex",
            scope: 'email',
        });
    });

    const [values, setValues] = useState({
        email: "",
        password: "",
        username: "",
    });

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };


    const SubmitSendLink = () => {
        swal('We sent an email to ' + values.email + ' with a link to get back into your account.', {
            title: "Email Sent",
            buttons: {
                buttonOne: {
                    text: "OK",
                    visible: true,
                    className: "sf-btn",
                }
            }
        }).then(willUpdate => {
            if (willUpdate) {
                window.location.href = '/home';
            }
        });
    }

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <>
            {loader && <LoaderFull />}
            <Navbar fixed="top" collapseOnSelect expand="md" className="sf-bg-color-primary w100" variant="dark">
                <div className='sf-flex sf-justify w100'>
                    <Container className='top-nav-container no-padding '>
                        <Navbar.Brand href="/home">
                            <span className='top-nav-logo'>
                                <img src="../../assets/images/white-logo.jpg" alt="Logo" />
                            </span>
                        </Navbar.Brand>
                    </Container>
                    {/* <div className=''>
                <a href="/home"><img src="assets/images/white-logo.jpg" alt="Logo" style={{ height: '8vh' }} /></a>
            </div> */}
                    <div className="link-white align-c">
                        <span><a className="sign-link p-top-5" href={PAGES.SignIn.userPath}>Sign In</a></span>
                        <span><a className="sign-link p-top-5" href={PAGES.SignUp.path}>Sign Up</a></span>
                    </div>
                </div></Navbar>
            <section className="signin-area signin-one">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="signin-form form-style-two rounded-buttons">
                                <div className="row">
                                    <div className="col-md-12 justify-content-center">
                                        <div className="form-input justify-content-center">
                                            <div className='pb-3' style={{ textAlign: 'center' }}>
                                                <LockOutlinedIcon className='my_svg_icons' />
                                            </div>
                                            <br /><br />
                                            <h4 className='pb-3' style={{ textAlign: 'center' }}>
                                                Trouble logging in?
                                            </h4>
                                            <div className='pb-3' style={{ textAlign: 'center' }}>
                                                Enter your email and we'll send you a link to get back into your account.
                                            </div>
                                            <div className="input-items default">
                                                <input type="text" placeholder="Email" name="email" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-input rounded-buttons">
                                            <button onClick={SubmitSendLink}
                                                className="btn primary-btn rounded-full sf-btn vertical-center"
                                                disabled={!values.email}
                                                type="submit"
                                            >
                                                Send login link
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <a href='/faq'>Can't reset your password?</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default ForgotPass;

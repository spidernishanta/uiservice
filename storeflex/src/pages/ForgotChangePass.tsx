import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { TextField, Typography, Box, Button, Grid, Link } from '@mui/material';
import { sessionStorageGet, validatePassword } from '../utils/CommonUtils';
import Api from '../api/Api';
import swal from 'sweetalert';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navbar } from 'react-bootstrap';
import { UpdatePassPost } from '../api/ApiConfig';


const ForgotChangePass = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const [loader, setLoader] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showPassword1, setShowPassword1] = React.useState(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const api = new Api();

    const [values, setValues] = useState({
        emailId: String(urlParams.get('email')),
        password: "",
        password1: ""
    });
    const [errors, setErrors] = useState({
        emailId: "",
        password: "",
        password1: ""
    });

    const onChangePass = () => {
        const data: UpdatePassPost = {
            emailId: values.emailId,
            password: values.password,
        }
        setLoader(true);
        api.updatePass(data).then((response) => {
            console.log(response);
            swal({
                title: "Well Done!",
                text: "Your password has been successfully changed. Please use your new password to login!",
                icon: "success",
                buttons: {
                    buttonOne: {
                        text: "OK",
                        value: "pc",
                        className: "sf-btn"
                    }
                }
            }).then(function (value) {
                if (value === "pc") {
                    logout('/home');
                    window.location.reload();

                }
            });
            setLoader(false);
        }).catch((error) => {
            console.log(error);
            swal({
                title: "Can't change password",
                text: error,
                icon: "error",
                dangerMode: true,
                closeOnClickOutside: false,
                buttons: {
                    confirm: { text: "OK", value: "Ok", className: "sf-btn" },
                },
            }).then(goTo => {
                if (goTo) {
                    window.location.href = "/changepass";
                }
            });
        })
    }

    const logout = (pagePath: string) => {
        sessionStorage.setItem('isLoggedIn', 'false');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            emailId: urlParams.get('email'),
            password: data.get('password'),
        });
    };

    const passwordValidation = (event: any) => {
        const passwordTemp = event.target.value;
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        if (!passwordTemp) {
            errors.password = "*Password is required."
        }
        else if (!validatePassword(passwordTemp)) {
            errors.password = "Enter valid password"
        }
        else {
            errors.password = ""
        }

    }

    const password1Validation = (event: any) => {
        const password1Temp = event.target.value;
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        if (!password1Temp) {
            errors.password1 = "*Please re-enter your password"
        }
        else if (values.password != password1Temp) {
            errors.password1 = "Passwords do not match"
        }
        else {
            errors.password1 = ""
        }

    }

    return (
        <Container component="main" maxWidth="xs" className='c-box-shadow p-no'>
            <div className='p-md'>
                <div className='text-center'>
                    <Navbar.Brand href="/home">
                        <span className='top-nav-logo'>
                            <img src="../../assets/images/white-logo.jpg" alt="Logo" />
                        </span>
                    </Navbar.Brand>
                </div>
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    className={errors.emailId ? "border-red" : ""}
                                    // required
                                    fullWidth
                                    id="emailId"
                                    label="Email Address"
                                    name="emailId"
                                    autoComplete="email"
                                    value={urlParams.get('email')}
                                    disabled
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl sx={{ m: 0, width: '50ch' }} variant="outlined" className={errors.password ? "border-red" : ""}>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={values.password}
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={passwordValidation}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="New Password"
                                    />
                                    {errors.password && <p className="text-red">{errors.password}</p>}
                                </FormControl>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;Passwords must have at least 8 Characters and contain at least  </p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;uppercase letters, lowercase letters, numbers and symbol</p>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl sx={{ m: 0, width: '50ch' }} variant="outlined" className={errors.password1 ? "border-red" : ""}>
                                    <InputLabel htmlFor="outlined-adornment-password">Re-enter New Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        name="password1"
                                        id="password1"
                                        // autoComplete="new-password"
                                        value={values.password1}
                                        type={showPassword1 ? 'text' : 'password'}
                                        onChange={password1Validation}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword1}
                                                    onMouseDown={handleMouseDownPassword1}
                                                    edge="end"
                                                >
                                                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Re-enter New Password"
                                    />
                                    {errors.password1 && <p className="text-red">{errors.password1}</p>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button className='primary-gradient'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 4, mb: 4 }}
                            onClick={() => { onChangePass() }}
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </div>
        </Container>
    );
};

export default ForgotChangePass;
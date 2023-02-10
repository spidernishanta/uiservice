import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { TextField, Box, Button, Grid } from '@mui/material';
import { validatePassword } from '../utils/CommonUtils';
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
import { getUserEmail } from '../utils/CommonUtils';
import { ChangePassPost } from '../api/ApiConfig';
import { AppContainer } from '../components/containers/containers';
import TopNavBar from '../components/navbar/TopNavBar';
import Footer from '../components/footer/footer';


const ChangePass = () => {
    sessionStorage.setItem('emailId', getUserEmail());

    const [loader, setLoader] = useState(false);
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleMouseDownOldPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
        emailId: "",
        oldPassword: "",
        password: "",
        password1: ""
    });
    const [errors, setErrors] = useState({
        emailId: "",
        oldPassword: "",
        password: "",
        password1: ""
    });

    const onChangePass = () => {
        const data: ChangePassPost = {
            emailId: values.emailId,
            oldPassword: values.oldPassword,
            password: values.password,
        }
        setLoader(true);
        api.changePass(data).then((response) => {
            console.log(response);
            swal({
                title: "Password Changed",
                text: "Please login with the new password",
                icon: "success",
                buttons: {
                    buttonOne: {
                        text: "Log In",
                        value: "pc",
                        className: "sf-btn"
                    }
                }
            }).then(function (value) {
                if (value === "pc") {
                    logout('/home');

                }
                else {
                    logout('/home');
                }
                window.location.reload();
            });
            setLoader(false);
        }).catch((error) => {
            console.log(error);
            swal({
                title: "StoreFlex cannot change the password",
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
            emailId: data.get('emailId'),
            oldPassword: data.get('oldPassword'),
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
        else if (values.oldPassword == passwordTemp) {
            errors.password = "Your new password cannot be the same as your current password"
        }
        else {
            errors.password = ""
        }

    }

    const oldPasswordValidation = (event: any) => {
        const oldPasswordTemp = event.target.value;
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        if (!oldPasswordTemp) {
            errors.oldPassword = "Old Password is required."
        }
        else {
            errors.oldPassword = ""
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
        <>
            <AppContainer>
                <TopNavBar />
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
                                            value={sessionStorage.getItem('emailId')}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl sx={{ m: 0, width: '50ch' }} variant="outlined" className={errors.oldPassword ? "border-red" : ""}>
                                            <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                name="oldPassword"
                                                id="oldPassword"
                                                value={values.oldPassword}
                                                type={showOldPassword ? 'text' : 'password'}
                                                onChange={oldPasswordValidation}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowOldPassword}
                                                            onMouseDown={handleMouseDownOldPassword}
                                                            edge="end"
                                                        >
                                                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Old Password"
                                            />
                                            {errors.oldPassword && <p className="text-red">{errors.oldPassword}</p>}
                                        </FormControl>
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
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;Passwords must have at least 8 characters and contain at least </p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp;uppercase letters, lowercase letters, numbers and symbols</p>
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
                <Footer />
            </AppContainer>
        </>
    );
};

export default ChangePass;
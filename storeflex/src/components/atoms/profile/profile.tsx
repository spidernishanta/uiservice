import React from 'react';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { ProfileBtn } from '../button/button';
import './profile.scss';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

interface ProfileMenuProps {
    isSigned?: boolean;
    profileImg?: string;
}

export const ProfileMenu = (props?: ProfileMenuProps) => {
    const profileImgUrl = props?.profileImg;
    const isSigned = props?.isSigned;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const goToNextPage = (pagePath: string) => {
        navigate(pagePath);
    }

    const logout = (pagePath: string) => {
        sessionStorage.setItem('isLoggedIn', 'false');
        navigate(pagePath);
    }

    const createSwalButton = async () => {
        let swalButton1 = await swal({
            title: "List Space",
            buttons: {
                buttonOne: {
                    text: "Existing Company",
                    value: true,
                    visible: true,
                },
                buttonTwo: {
                    text: "New Company",
                    value: false,
                    visible: true,
                }
            }
        }).then(function (value) {
            if (value) { window.location.href = "/warehouse/add"; }
            else { window.location.href = "/business/add"; }

        });
    }

    const signOutList = () => {
        return (
            <>
                <MenuItem>
                    <ListItemText>Sign Up</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Login</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>List Space</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Search Space</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Help</ListItemText>
                </MenuItem>
            </>
        )
    }
    const signInList = () => {
        return (
            <>
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/dashboard') }}>Dashboard</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Messages</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/search-new') }}>Search Space</a></ListItemText>
                </MenuItem>

                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/myorders') }}>Orders</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/cart') }}>Wishlists</a></ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText><a onClick={() => createSwalButton()}>List Space</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/bookings') }}>Bookings</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText onClick={() => goToNextPage("/view-profile")}>Edit Profile</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/contactus') }}>Contact Us</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText><a onClick={() => { goToNextPage('/faq') }}>FAQ</a></ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText><a onClick={() => { logout("/home") }}>Log out</a></ListItemText>
                </MenuItem>
            </>
        )
    }

    const showList = () => {
        if (isSigned) {
            return (<>{signInList()}</>);
        } else {
            return (<>{signOutList()}</>);
        }
    }
    const profileMenuList = () => {
        return (
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {showList()}
            </Menu>
        );
    }

    return (
        <>
            <div className='sf-flex profile-menu-container'>
                <IconButton size="large" edge="start" color="inherit" aria-label="profile" onClick={handleClick} >
                    <ProfileBtn showProfileImg={isSigned} profileImg={profileImgUrl} />
                </IconButton>
                {profileMenuList()}
            </div>
        </>
    )
}
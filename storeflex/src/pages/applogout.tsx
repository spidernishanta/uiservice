import { NoBackpackSharp } from "@mui/icons-material";
import { useEffect } from "react";
import swal from "sweetalert";

const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

const AppLogout = ({ children }) => {

    let timer;

    const handleLogoutTimer = () => {
        timer = setTimeout(() => {
            resetTimer();
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer);
            });
            logoutAction();
        }, 1800000); // after 30 min auto logout occurs 1800000
    };

    const resetTimer = () => {
        if (timer) clearTimeout(timer);
    };

    useEffect(() => {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer();
                handleLogoutTimer();
            });
        });
    }, []);

    const logoutAction = () => {
        sessionStorage.clear();
        swal({
            title: 'Session out - Login again',
            text: 'Since you have been inactive for a while, we have logged you out of StoreFlex to keep your work secure. To log back in, refresh your browser, or click on Log-in below.\n\n' +
                'We apologize for this inconvenience.\nThanks for helping us keep StoreFlex secure!',
            icon: "warning",
            buttons: {
                buttonOne: {
                    text: "Log-in",
                    value: "al",
                    visible: true,
                    className: "sf-btn",
                }
            }
        }).then(function (value) {
            if (value == "al") { window.location.href = "/signin"; }
            else { window.location.href = "/signin"; }
        });
    };

    return children;
};

export default AppLogout;
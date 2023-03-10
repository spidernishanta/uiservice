import { NoBackpackSharp } from '@mui/icons-material';
import { PAGES, SESSION_TYPE } from './Constants';

export const CHARACTER_ONLY = /^[A-Za-z ,.'-]+$/;
export const regex_email = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const regex_specialChar = /^[A-Za-z ]+$/;
export const regex_pass = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/gm;
export const regex_url = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
export const regex_phone = /^[0-9]{10}$/;
export const regex_gstid = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const regex_city = /^[A-Za-z]+$/;
export const regex_pincode = /^[0-9]{6}(?:-[0-9]{5})?$/;
export const regex_availableSpace = /^[1-9]\d{2,5}$/;
export const regex_rate = /^[1-9]\d{1,3}$/

export const validateCharacterLength = (text: string = '', minLen: number = 4, maxLen: number = 20) => {
    const isValid = (text?.length < minLen || text?.length > maxLen) ? false : true;
    return isValid;
}

export const validateCharacterOnly = (text: any) => {
    const isValid = CHARACTER_ONLY.test(text) ? false : true;
    return isValid;
}

export const validateAreaSpace = (price: any) => {
    const isValid = regex_availableSpace.test(price) ? true : false;
    return isValid;
}

export const validateRate = (price: any) => {
    const isValid = regex_rate.test(price) ? true : false;
    return isValid;
}

export const validateSpecialCharExistance = (text: string) => {
    const isValid = (regex_specialChar.test(text)) ? true : false;
    return isValid;
}

export const validateEmail = (email: string) => {
    const isValid = regex_email.test(String(email).toLocaleLowerCase()) ? true : false;
    return isValid;
}

export const validateMinLen = (val: string, trim?: boolean) => {
    const minLen = 4;
    if (val) {
        const value = trim ? val.trim() : val;
        return value.length >= minLen ? true : false;
    } else {
        return false;
    }
}

export const validatePassword = (password: string) => {
    const isValid = regex_pass.test(String(password)) ? true : false;
    return isValid;
}

export const validateCompanyName = (companyName: string) => {
    const isValid = false;
    return isValid;
}

export const validateWebUrl = (webUrl: string) => {

    const isValid = regex_url.test(String(webUrl)) ? true : false;

    return isValid;
}

export const validatePhone = (phone: any) => {
    const isValid = regex_phone.test(String(phone)) ? true : false;

    return isValid;
}

export const validateGst = (gst: string) => {

    const isValid = regex_gstid.test(String(gst)) ? true : false;

    return isValid;
}

export const validatePinCode = (pincode: any) => {
    const isValid = regex_pincode.test(pincode) ? true : false;
    return isValid;
}

export const validateCity = (city?: string) => {

    const isValid = regex_city.test(String(city)) ? true : false;

    return isValid;
}

export const validateState = (state: string) => {

    const isValid = false;

    return isValid;
}

export const validateCountry = (country: string) => {

    const isValid = false;

    return isValid;
}

export const setUserLoggedIn = (val: string | boolean) => {
    if (val) {
        sessionStorage.setItem('isLoggedIn', String(val));
    } else {
        sessionStorage.setItem('isLoggedIn', 'false');
    }
}
export const getUserLoggedIn = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
        return true;
    } else {
        return false;
    }
}

export const getUserType = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.loginType;
    } else {
        return null;
    }
}

export const getUserEmail = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.email;
    } else {
        return null;
    }
}

export const getName = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    sessionStorage.setItem("space", " ");
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return (obj.firstName + sessionStorage.getItem("space") + obj.lastName);
    } else {
        return null;
    }
}

export const getMobileNo = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.mobileNo;
    } else {
        return null;
    }
}

export const getroleType = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.roleType;
    } else {
        return null;
    }
}

export const getRedirectionPage = (redirectUrl?: string) => {
    if (redirectUrl === '/storeflexhome') {
        return PAGES.Home.path;
    } else if (redirectUrl === 'SL') {    // Storeflex User Dashboard
        return PAGES.Dashboard.path;
    } else if (redirectUrl === 'CL') {  // Storeflex Client Dashboard
        return PAGES.Dashboard.path;
    } else if (redirectUrl === 'CU') {    // Storeflex Customer Dashboar
        return PAGES.Dashboard.path;
    } else {
        return PAGES.Home.path;      // If redirect url is missing then redirect to home
    }
}

export const sessionStorageSet = (data: any, name: string) => {
    if (data && name) {
        sessionStorage.setItem(name, JSON.stringify(data));
    }
}

export const sessionStorageGet = (name: string) => {
    return sessionStorage.getItem(name);
}

export const getLogInType = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.loginType;
    } else {
        return null;
    }
}

export const setLogInType = (val: string) => {
        const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
        if (data && JSON.parse(data)) {
            const obj = JSON.parse(data);
            obj.loginType = val;
            sessionStorage.setItem(SESSION_TYPE.login_resp,JSON.stringify(obj));
        }
    } 
    

export const getFirstName = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.firstName;
    } else {
        return null;
    }
}

export const getLastName = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.lastName;
    } else {
        return null;
    }
}

export const getIntent = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.intent;
    } else {
        return null;
    }
}

export const getWhCategories = (type?: string, ids?: string) => {
    const   warehouseCategories = sessionStorageGet(SESSION_TYPE.wh_categories);
    if (type && ids && warehouseCategories && JSON.parse(warehouseCategories)) {
        const whCategories =  JSON.parse(warehouseCategories);
        
        if(whCategories && type === 'WF') {
            const facilities = whCategories?.methodReturnValue?.facilities;
            const idArry = ids.split("|");
            const values = idArry.map((id) => {
                if( facilities[id] ) {
                    //return {[id] : facilities[id]};
                    return facilities[id];
                } else {
                    return null;
                }
            });
            return values
    
        } else if(whCategories && type === 'WT') {
            const industries = whCategories?.methodReturnValue?.industries;
            const idArry = ids.split("|");
            const values = idArry.map((id) => {
                if( industries[id] ) {
                    //return {[id] : industries[id]};
                    return industries[id];
                } else {
                    return null;
                }
            });
            return values
    
        } else if(whCategories && type === 'WS') {
            const storages = whCategories?.methodReturnValue?.storages;
            const idArry = ids.split("|");
            const values = idArry.map((id) => {
                if( storages[id] ) {
                    //return {[id] : storages[id]};
                    return storages[id];
                } else {
                    return null;
                }
            });
            return values
    
        } else {
            return null;
        }
    } else {
        return null;
    }

}

export const getUserId = () => {
    const data = sessionStorage.getItem(SESSION_TYPE.login_resp);
    if (data && JSON.parse(data)) {
        const obj = JSON.parse(data);
        return obj.userId;
    } else {
        return null;
    }
}
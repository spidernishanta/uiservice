// import React from 'react';
import axios from 'axios';
import {
    ApiConfig, SlLoginProps, SignInPost, SignUpPost, GetStatesProp, GetCitiesProp, AddCompanyPostData,
    ViewCompaniesProps, ViewWarehouseProps, viewWarehouseAdminProps, EnquiryProps, viewUserProps,
    WarehousePostData, UserPostData, SearchProps, ChangePassPost, GetForgotPassProp, UpdatePassPost, BankInfo,
    AddOrderPostData,WarehouseId
} from './ApiConfig';
import { sessionStorageSet, sessionStorageGet } from '../utils/CommonUtils';
import { SESSION_TYPE } from '../utils/Constants';


// let axiosConfig = {
//     headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         "Access-Control-Allow-Origin": "*",
//     }
//   };

export default class Api {
    baseUrl: any;
    apiUrl: ApiConfig;
    constructor() {
        this.apiUrl = new ApiConfig();
        this.baseUrl = process.env.REACT_APP_API_URL;
    }

    async getTest() {
        const url = this.apiUrl.testApi;
        return await axios.get(url).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            console.log(' error >> ', error);
            return Promise.reject(error);
        });
    }

    async slLogin(postData: SlLoginProps): Promise<any> {
        const url = this.baseUrl + this.apiUrl.slLoginApi;
        try {
            const response = await axios.post(url, postData);
            return Promise.resolve(response);
        }
        catch (error) {
            console.log(' error : signIn', error);
            return Promise.reject(error);
        }
    }

    async signIn(postData: SignInPost, userType: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.signinApi}?userType=${userType}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : signIn ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : signIn', error);
            return Promise.reject(error);
        }
    }

    async signUp(postData: SignUpPost, roleType: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.userUrl}?roleType=${roleType}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else if (response?.data?.statusCode === 603) {
                //console.log(response.data.message);
                return Promise.reject(response?.data?.message);
            }
            else {
                //console.log(' error : signUp', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log('error: SignUp', error);
            return Promise.reject(error);
        }
    }

    async changePass(postData: ChangePassPost): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.ChangePassUrl}?emailId=${sessionStorage.getItem('emailId')}&oldPassword=${postData.oldPassword}&password=${postData.password}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else if (response?.data?.statusCode === 603) {
                return Promise.reject(response?.data?.message);
            }
            else {
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log('error: ChangePass', error);
            return Promise.reject(error);
        }
    }

    async updatePass(postData: UpdatePassPost): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.UpdatePassUrl}?emailId=${postData.emailId}&password=${postData.password}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else if (response?.data?.statusCode === 603) {
                return Promise.reject(response?.data?.message);
            }
            else {
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log('error: UpdatePass', error);
            return Promise.reject(error);
        }
    }

    async getStatesByCountry(requestObject: GetStatesProp): Promise<any> {
        const url = this.baseUrl + this.apiUrl.getStatesUrl + '?countryId=' + requestObject.countryCode;
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getStatesByCountry', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getStatesByCountry', error);
            return Promise.reject(error);
        }
    }

    async ForgotPass(requestObject: GetForgotPassProp): Promise<any> {
        const url = this.baseUrl + this.apiUrl.ForgotPassUrl + '?emailId=' + requestObject.emailId;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getForgotPass ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : Get Forgot Pass', error);
            return Promise.reject(error);
        }
    }

    async getCitiesByState(requestObject: GetCitiesProp): Promise<any> {
        const url = this.baseUrl + this.apiUrl.getCitiesUrl + '?stateCode=' + requestObject.state;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getCitiesByState ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : Get Company', error);
            return Promise.reject(error);
        }
    }

    async addCompany(postData: AddCompanyPostData): Promise<any> {
        const url = this.baseUrl + this.apiUrl.addCompanyUrl;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : addCompany ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : addCompany', error);
            return Promise.reject(error);
        }
    }

    async deleteCompany(clientId: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.deleteCompanyUrl}?clientId=${clientId}`;
        try {
            const response = await axios.delete(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : deleteCompany ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : deleteCompany', error);
            return Promise.reject(error);
        }
    }

    async uploadCompanyPhoto(imageFile: any, clientId: string): Promise<any> {
        const postData = {
            clientPhoto: imageFile
        }
        const url = `${this.baseUrl}${this.apiUrl.uploadCompanyPhotoApi}?clientId=${clientId}`;
        try {
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            const response = await axios.post(url, postData, config);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : uploadCompanyPhoto ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : uploadCompanyPhoto', error);
            return Promise.reject(error);
        }
    }
    async updateCompany(postData: AddCompanyPostData): Promise<any> { console.log(postData);
        const url = this.baseUrl + this.apiUrl.addCompanyUrl;
        try {
            const response = await axios.post(url, postData);
            if (response.status === 200) { console.log(response);
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : updateCompany  ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error :  updateCompany', error);
            return Promise.reject(error);
        }
    }

    async getMyCompanies(getData: ViewCompaniesProps): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.getCompaniesApi}?page=${getData.page}&size=${getData.size}&status=${getData.status}`;
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getMyCompanies ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getMyCompanies', error);
            return Promise.reject(error);
        }
    }

    async getCompanyList(): Promise<any> {
        const url = this.baseUrl + this.apiUrl.getCompanyListApi;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getCompanyList ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getCompanyList', error);
            return Promise.reject(error);
        }
    }

    async getCompanyById(chId: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.getCompanyByIdUrl}?clientId=${chId}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getCompanyById ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getCompanyById', error);
            return Promise.reject(error);
        }
    }
    async addWarehouse(postData: WarehousePostData): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.addWarehouseUrl}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : addWarehouse ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : addWarehouse', error);
            return Promise.reject(error);
        }
    }

    async searchwarehouse(getData?: any): Promise<any> {
        const url = this.baseUrl + this.apiUrl.searchwarehouse + '?pincode=' + getData + '&page=0&size=10';
        try {
            const response = await axios.get(url);
            return Promise.resolve(response);
        }
        catch (error) {
            console.log(' error : Get Company', error);
            return Promise.reject(error);
        }
    }

    async getGuestsearchwarehouse(data: SearchProps): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.guestsearchwarehouseApi}?searchBy=${data.search}&page=${data?.page || 0}&size=${data?.size || 3}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getGuestsearchwarehouse ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getGuestsearchwarehouse ', error);
            return Promise.reject(error);
        }
    }

    async getWarehouseByClientId(getData: ViewWarehouseProps): Promise<any> {
        const url = this.baseUrl + this.apiUrl.getWarehouseByClientIdUrl + '?clientId=' + getData.clientId + '&page=' + getData.page + '&size=' + getData.size;
        try {
            const response = await axios.get(url);
            return Promise.resolve(response);
        }
        catch (error) {
            console.log(' error : Get Warehouse', error);
            return Promise.reject(error);
        }
    }

    async getWarehouseById(whId: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.getWarehouseByIdUrl}?warehouseId=${whId}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getWarehouseById ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getWarehouseById', error);
            return Promise.reject(error);
        }
    }

    async getWarehouseAdmin(getData: viewWarehouseAdminProps): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.getWarehouseAdminUrl}?page=${getData.page}&size=${getData.size}&status=${getData.status}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getWarehouseAdmin ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : Get Warehouse', error);
            return Promise.reject(error);
        }
    }

    async getWarehouseCategories(forceCall?: boolean): Promise<any> {
        const url = this.baseUrl + this.apiUrl.getWarehouseCategoriesApi;
        const warehouseCategories = sessionStorageGet(SESSION_TYPE.wh_categories);
        if (!forceCall && warehouseCategories && JSON.parse(warehouseCategories)) {
            const whCategories = JSON.parse(warehouseCategories);
            return Promise.resolve(whCategories);
        } else {
            try {
                const response = await axios.get(url);
                if (response?.data?.statusCode === 600) {
                    sessionStorageSet(response.data, SESSION_TYPE.wh_categories);
                    return Promise.resolve(response?.data);
                } else {
                    console.log(' error : getWarehouseCategories ', response);
                    return Promise.reject(response);
                }
            }
            catch (error) {
                console.log(' error : getWarehouseCategories', error);
                return Promise.reject(error);
            }
        }
    }
    async enquiry(postData: EnquiryProps): Promise<any> {
        const url = this.baseUrl + this.apiUrl.enquiry;
        try {
            const response = await axios.post(url, postData);
            if (response.status === 200) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : enquiry ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : enquiry', error);
            return Promise.reject(error);
        }
    }
    async getUserList(getData?: viewUserProps, userType?: string): Promise<any> {
        let url = ''
        if (userType === 'SL') {
            url = `${this.baseUrl}${this.apiUrl.slUsersUrl}?page=${getData?.page}&size=${getData?.size}&status=${getData?.status}`;
        } else {
            url = `${this.baseUrl}${this.apiUrl.slUsersUrl}?page=${getData?.page}&size=${getData?.size}&status=${getData?.status}?clientId=${userType}`;
            // ?clientId=CL-119&status=ACTIVE&page=0&size=3
        }

        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600 || response?.data?.statusCode === 603) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getUserList ', response);
                return Promise.reject(response);
            }

        }
        catch (error) {
            console.log(' error : getUserList', error);
            return Promise.reject(error);
        }
    }
    async postUser(data: UserPostData, roleType?: string, clientCodes?: string): Promise<any> {
        const url = `${this.baseUrl}${this.apiUrl.userUrl}?roleType=${roleType}&clientCodes=${clientCodes}`;
        try {
            const response = await axios.post(url, data);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : postUser ', response);
                return Promise.reject(response);
            }

        }
        catch (error) {
            console.log(' error : postUser ', error);
            return Promise.reject(error);
        }
    }

    async asyncValidationBankDetails(bankInfo: BankInfo): Promise<any> {
        let axiosConfig = {
            headers: {
                "Authorization": "Bearer ofmNMTl88y3_K0nV_jR"
            }
        };
        const url = `${this.apiUrl.getValidationBank}?phone=${bankInfo.phone}&name=${bankInfo.name}&bankAccount=${bankInfo.bankAccount}&ifsc=${bankInfo.ifsc}`;
        try {
            const response = await axios.get(url, axiosConfig);
            console.log(response);
            if (response?.data?.statusCode === 600) {
                sessionStorageSet(response.data, SESSION_TYPE.wh_categories);
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getWarehouseCategories ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : asyncValidationBankDetails', error);
            return Promise.reject(error);
        }
    }

    async getAuthorisationBank(bankInfo: BankInfo): Promise<any> {
        let axiosConfig = {
            headers: {
                'X-Client-Id': 'admin@skaplink.com',
                'X-Client-Secret': 'Kari0356!',
                'cache-control': 'no-cache'
            }
        };
        const url = `${this.apiUrl.authorisationBank}`;
        try {
            const response = await axios.post(url, axiosConfig);
            console.log('<< getAuthorisationBank >>', response);
            if (response?.data?.statusCode === 600) {
                sessionStorageSet(response.data, SESSION_TYPE.wh_categories);
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getWarehouseCategories ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getAuthorisationBank', error);
            return Promise.reject(error);
        }
    }
    async postOrder(postData: AddOrderPostData): Promise<any> {
        //console.log(postData);
        const url = `${this.baseUrl}${this.apiUrl.postOrderUrl}`;
        try {
            const response = await axios.post(url, postData);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : postOrder', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : postOrder', error);
            return Promise.reject(error);
        }
    }
    async getWarehouseOrdersList(wareId: WarehouseId): Promise<any> {
        //console.log(postData);
        const url = `${this.baseUrl}${this.apiUrl.getWarehouseOrdersList}?warehouseId=${wareId.warehouseId}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.statusCode === 600) {
                return Promise.resolve(response?.data);
            } else {
                console.log(' error : getWarehouseOrderList ', response);
                return Promise.reject(response);
            }
        }
        catch (error) {
            console.log(' error : getWarehouseOrderList', error);
            return Promise.reject(error);
        }
    }
}
import { WarehousePostData } from "../api/ApiConfig";
export interface BusinessDetails {
  businessid: string;
  name: string;
  address: string;
  phone: number;
  weburl: string;
  gstn: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  description: string;
}
export interface StoreDetails {
  businessid: string;
  storeid: string;
  name: string;
  address: string;
  phone: number;
  gstn: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  description: string;
}

export interface officeData {
  id: number;
  name: string;
  rate: number;
}

export interface EditBusinessDetails {
  clientId: string;
  addressId: string;
  contactId: string;
  compyName: string;
  address: string;
  phone: string | number;
  url: string;
  gstn: string;
  city: string;
  state: string;
  pincode: string | number;
  country: string;
  compyDesc: string;
}
export interface EditWarehouseDetails {
  city: string;
  clientId: string;
  descp: string;
  houseNo: string;
  pincode: string;
  plotNo: string | number;
  profilePicName: string;
  state: string;
  status: string;
  streetAddrs: string;
  warehouseId: string | number;
  warehouseName: string;
  country: string;
  companyName: string;
}

export interface EditCompanyUserDetails {
  userId: string;
  address: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  houseNo: string | number;
  lastName: string;
  middleName: string;
  mobileNo: string;
  photoName: string;
  pincode: string | number;
  roleType: string;
  status: string;
  userPhoto: string;
}

export interface StateList {
  [key: string]: string;
}
export interface StateResponse {
  methodReturnValue: StateList[];
  statusCode?: number;
  status?: string;
}

export interface objectData {
  val?: string;
  error?: string;
  isUpdated?: boolean;
  id?: string;
  attributeName?: string;
}

export interface CompanyInfoList {
  methodReturnValue?: MethodReturnValue;
  statusCode: number;
  status?: string;
}

export interface MethodReturnValue {
  totalRecords?: number;
  clientList?: ClientList[];
  industry?: string;
  industries?: Industries;
  storage?: string;
  storages?: Storages;
  facility?: string;
  facilities?: Facilities;
}

export interface Industries {
  [key: string]: string;
}

export interface Storages {
  [key: string]: string;
}

export interface Facilities {
  [key: string]: string;
}
export interface ClientList {
  clientId?: string;
  compyName: string;
  compyDesc: string;
  photo?: Photo[];
  photoName?: string;
  url?: string;
  gstNo: string;
  addresses: Address[];
  contact: Contact[];
}

export interface Address {
  addressId?: string;
  addressType?: string;
  plotNo?: string;
  houseNo?: string;
  streetDetails?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface Contact {
  contactId?: string;
  contactName?: string;
  mobileNo?: string;
  landLine?: string;
  landLineExt?: string;
  emailId?: string;
}
export interface Photo {
  [key: string]: string;
}

export interface WarehouseCategories {
  methodReturnValue?: MethodReturnValue;
  statusCode: number;
  status?: string;
}

export interface WarehouseInfo {
  methodReturnValue?: WarehousePostData;
  statusCode?: number;
  status?: string;
}
export interface Warehouseprice {
  idforui?: string;
  priceId?: string;
  availspace?: string;
  ratesqtft?: string;
  minordersqt?: string;
  createBy?: string;
  createDate?: string;
  updatedBy?: string;
  updateDate?: string;
  startLease?: number | string;
  endLease?: number | string;
  loading?: string;
  unloading?: string;
}

export interface WhsHours {
  id?: string;
  warehouseId?: string;
  openday?: string;
  starttime?: string;
  endtime?: string;
  openall?: boolean;
  isUpdated?: boolean;
}

export interface LoadUnloadAmount {
  loadamt?: string | number;
  unloadamt?: string | number;
}

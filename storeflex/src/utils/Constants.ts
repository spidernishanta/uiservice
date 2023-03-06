import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SigninPage";
//import SignUpNew from "../pages/signup-new";
import SignUp from "../pages/signup";
import DashboardPage from "../pages/DashboardPage";
import BusinessPage from "../pages/BusinessPage";
import AddInfo from "../pages/addinfo";
import PgSearch from "../pages/PgSearch";

import PgSearchNew from "../pages/PgSearchNew";

import Cart from "../pages/cart";
import ContactUsPage from "../pages/ContactUsPage";
import faq from "../pages/faq";
import ErrorPage from "../pages/ErrorPage";
import DeleteUser from "../pages/deleteuser";
import UpdateUser from "../pages/updateuser";
import AddPayment from "../pages/addpayment";
import DeletePayment from "../pages/deletepayment";
import UpdatePayment from "../pages/updatepayment";
import SearchBusiness from "../pages/searchbusiness";
import BusinessReport from "../pages/businessreport";
import LocationReport from "../pages/locationreport";
import TermsAndConditions from "../pages/termsandconditions";
import PrivacyPolicy from "../pages/privacy";
import paymentStatus from "../components/panels/payment/paymentStatus";
import MyOrders from "../pages/myOrders";
import ViewUser from "../pages/viewuser";
import editCompanyUser from "../pages/editCompanyUser";
import DiscoverMore from "../pages/discovermore";
import Bookings from "../pages/bookings";
import PaymentPage from "../pages/PaymentPage";
import PaymentHistory from "../components/panels/payment/PaymentHistory";
import UserProfile from "../pages/userProfile";
import SiteMap from "../pages/SiteMap";
import WarehousePage from "../pages/WarehousePage";
import UserPage from "../pages/UserPage";

import PaymentReport from "../pages/paymentReport";
import PaymentRecievable from "../components/panels/payment/PaymentRecievable";

import WarehouseDetails from "../components/atoms/Searchresult/warehouseDetails";
import SignInCustomer from "../pages/signin-customer";
import ForgotPass from "../pages/ForgotPass";
import ChangePass from "../pages/ChangePass";
import PaymentVerify from "../components/panels/payment/PaymentVerify";
import ForgotChangePass from "../pages/ForgotChangePass";

export enum USER_TYPE {
  SfUser = "SL",
  SfClient = "CL",
  SfCustomer = "CU",
}

export enum ACTIONS_TYPE {
  add = "ADD",
  delete = "DELETE",
  edit = "EDIT",
  view = "VIEW",
}

export enum ROLE_TYPE {
  admin = 'ADMIN',
  guest = 'GUEST',
}

export enum STATUS_TYPE {
  active = 'ACTIVE',
  inactive = 'IN-ACTIVE',
  pending = 'PENDING',
}

export const PAGES = {
  Home: {
    path: "/home",
    Component: HomePage,
  },
  SignIn: {
    path: "/signin",
    adminPath: "/signin#admin",
    userPath: "/signin#user",
    Component: SignInPage,
  },
  SignInCustomer: {
    path: "/signin-customer",
    Component: SignInCustomer,
  },
  SignUp: {
    path: "/signup",
    Component: SignUp,
  },
  ForgotPassword: {
    path: "/reset",
    Component: ForgotPass,
  },
  ForgotChangePassword: {
    path: "/forgotpassword",
    Component: ForgotChangePass,
  },
  ChangePassword: {
    path: "/changepass",
    Component: ChangePass,
  },
  Dashboard: {
    path: "/dashboard",
    Component: DashboardPage,
  },
  Business: {
    path: "/business",
    Component: BusinessPage,
    ADD: {
      path: "/business/add",
      Component: BusinessPage,
    },
    VIEW: {
      path: "/business/view",
      Component: BusinessPage,
    },
    EDIT: {
      path: "/business/edit",
      Component: BusinessPage,
    }
  },
  Warehouse: {
    path: "/warehouse",
    Component: WarehousePage,
    ADD: {
      path: "/warehouse/add",
      Component: WarehousePage,
    },
    EDIT: {
      path: "/warehouse/edit",
      Component: WarehousePage,
    },
    VIEW: {
      path: "/warehouse/view",
      Component: WarehousePage,
    },
  },
  USER: {
    path: "/user",
    Component: UserPage,
    ADD: {
      path: "/user/add",
      Component: UserPage,
    },
    EDIT: {
      path: "/user/edit",
      Component: UserPage,
    },
    VIEW: {
      path: "/user/view",
      Component: UserPage,
    },
  },
  AddInfo: {
    path: "/user/add",
    Component: AddInfo,
  },
  PgSearch: {
    path: "/search",
    Component: PgSearch,
  },

  PgSearchNew: {
    path: "/search-new",
    Component: PgSearchNew,
  },
  Cart: {
    path: "/cart",
    Component: Cart,
  },
  ContactUs: {
    path: "/contactus",
    Component: ContactUsPage,
  },
  FAQ: {
    path: "/faq",
    Component: faq,
  },
  Error: {
    path: "/error",
    Component: ErrorPage,
  },
  DELETE_USER: {
    path: "/deleteuser",
    Component: DeleteUser,
  },
  UPDATE_USER: {
    path: "/updateuser",
    Component: UpdateUser,
  },
  ADD_PAYMENT: {
    path: "/add-payment",
    Component: AddPayment,
  },
  DELETE_PAYMENT: {
    path: "/deletepayment",
    Component: DeletePayment,
  },
  UPDATE_PAYMENT: {
    path: "/updatepayment",
    Component: UpdatePayment,
  },
  SEARCH_BUSINESS: {
    path: "/searchbusiness",
    Component: SearchBusiness,
  },
  BUSINESS_REPORT: {
    path: "/businessreport",
    Component: BusinessReport,
  },
  LOCARTION_REPORT: {
    path: "/locationreport",
    Component: LocationReport,
  },
  TERMSANDCONDITIONS: {
    path: "/termsandconditions",
    Component: TermsAndConditions,
  },
  PRIVACYPOLICY: {
    path: "/privacypolicy",
    Component: PrivacyPolicy,
  },
  PAYMENT_STATUS: {
    path: "/paymentStatus",
    Component: paymentStatus,
  },
  MY_ORDERS: {
    path: "/myorders",
    Component: MyOrders,
  },
  SITE_MAP: {
    path: "/sitemap",
    Component: SiteMap,
  },
  VIEW_USER: {
    path: "/user/view#active",
    Component: ViewUser,
  },
  EDIT_COMPANY_USER: {
    path: "/editCompanyUser",
    Component: editCompanyUser,
  },
  DISCOVER_MORE: {
    path: "/discovermore",
    Component: DiscoverMore,
  },
  BOOKINGS: {
    path: "/bookings",
    Component: Bookings,
  },
  PAYMENT_RECIEVABLE: {
    path: "/paymentRecievable",
    Component: PaymentRecievable,
  },
  PAYMENT_HISTORY: {
    path: "/paymentHistory",
    Component: PaymentHistory,
  },

  PAYMENT_REPORT: {
    path: "/PaymentReport",
    Component: PaymentReport,
  },
  PAYMENTS: {
    path: "/payment",
    Component: PaymentPage,
    VERIFY: {
      path: "/payment/verify",
      Component: PaymentVerify,
      id: 'VERIFY',
    },
    HISTORY: {
      path: "/payment/history",
      Component: PaymentHistory,
      id: 'HISTORY'
    }
  },
  USER_PROFILE: {
    path: "/view-profile",
    Component: UserProfile,
  },
  WAREHOUSE_DETAILS: {
    path: "/WarehouseDetails",
    Component: WarehouseDetails,
  },
};

export enum SESSION_TYPE {
  login_resp = "LOGIN_RESP",
  wh_categories = "WH_CATEGORYS",
}


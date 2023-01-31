
import TopNavBar from '../components/navbar/TopNavBar';
import SideNavBar from '../components/navbar/SideNavBar';
import { AppContainer, SplitPaneContainer } from '../components/containers/containers';
import Footer from '../components/footer/footer';
import { getUserType } from '../utils/CommonUtils';
import { PAGES } from "../utils/Constants";
import PaymentVerify from '../components/panels/payment/PaymentVerify';
import PaymentHistory from '../components/panels/payment/PaymentHistory';

const PaymentPage = (props) => {
    console.log(' @@@@@@ ', props);
    if(props.id === PAGES.PAYMENTS.VERIFY.id) {
        return(
            <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()}/>}
                right={<PaymentVerify />}
            />
            <Footer/>
        </AppContainer>
        )
    } else if(props.id === PAGES.PAYMENTS.HISTORY.id) {
        return(
            <AppContainer>
            <TopNavBar />
            <SplitPaneContainer
                left={<SideNavBar userType={getUserType()}/>}
                right={<PaymentHistory />}
            />
            <Footer/>
        </AppContainer>
        )
    } else {
        return (<div> Invalid Page URL ..</div>)
    }
    
}

export default PaymentPage;
import React, { useState } from 'react';
import { Grid, TextareaAutosize } from '@mui/material';
import swal from 'sweetalert';
import InputBox from '../../atoms/textfield/InputBox';
import { InputError } from '../../atoms/textfield/InputError';
import Accordion from 'react-bootstrap/Accordion';
import AddressDetails from '../../atoms/addressforms/AddressDetails';
import { BusinessDetails } from '../../../utils/ResponseSchema';
import { validateCharacterLength, validateWebUrl, validateGst } from '../../../utils/CommonUtils';
import Api from '../../../../src/api/Api';
import { AddCompanyPostData, Address, Contact } from '../../../../src/api/ApiConfig';
import LoaderSpinner from '../../atoms/spinner/spinner';
import { objectData } from '../../../utils/ResponseSchema';

interface AddBusinessProps {
    profileData?: BusinessDetails;
    onSave?(isSaved: boolean): void;
    action?: string;
}

const AddBusiness = (props: AddBusinessProps) => {
    const api = new Api();
    const [step, setStep] = useState(1);
    const profile = {} as BusinessDetails;
    const [businessProfile, setBusinessProfile] = useState(profile);
    const [isLoader, setLoaderState] = useState(false);

     // Conpany Information 
     const [companyNameInfo, setCompanyNameInfo] = useState<objectData>({});
     const [companyUrlInfo, setCompanyUrlInfo] = useState<objectData>({});
     const [gstIdInfo, setGstIdInfo] = useState<objectData>({});
     const [companyDescription, setCompanyDescription] = useState<objectData>({});
     const [photoName, setPhotoName] = useState<objectData>({});
     
    // Address Information 
    const [companyAddressInfo, setCompanyAddressInfo] = useState<Address>({});

    // Contact Information 
    const [contactNameInfo, setContactNameInfo] = useState<objectData>({});
    const [mobileNoInfo, setMobileNoInfo] = useState<objectData>({});
    const [emailIdInfo, setEmailIdInfo] = useState<objectData>({});
    const [landLineExtInfo, setLandLineExtInfo] = useState<objectData>({});
    const [landLineNoInfo, setLandLineNoInfo] = useState<objectData>({});

    const maxiLength = 500;
    const selectedCountryCode = '01';

    const onCompanyNameChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = " *Company Name is required. ";
        } else if (!validateCharacterLength(obj.val, 4, 50)) {
            obj.error = " Company Name must be between 4 characters to 50 characters."
        } else {
            obj.error = '';
        }
        setCompanyNameInfo(obj);
    }

    const onCompanyUrlChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = "*Company url is required."
        } else if (!validateWebUrl(obj.val)) {
            obj.error = " Enter a valid Company Url "
        } else {
            obj.error = '';
        }
        setCompanyUrlInfo(obj);
    }

    const onGstIdChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (!obj.val) {
            obj.error = "*GST number is mandatory"
        } else if (!validateGst(obj.val)) {
            obj.error = "Enter a valid GST number"
        } else {
            obj.error = '';
        }
        setGstIdInfo(obj);
    }

    const onCompanyDescriptionChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        // if (!obj.val) {
        //     obj.error = "*GST number is mandatory"
        // } else if (!validateGst(obj.val)) {
        //     obj.error = "Enter a valid GST number"
        // } else {
        //     obj.error = '';
        // }
        setCompanyDescription(obj);
    }

    const onPhotoNameChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        // if (!obj.val) {
        //     obj.error = "*Enter Phone Number";
        // } else if (!validatePhone(obj.val)) {
        //     obj.error = "Enter a valid Phone Number"
        // } else {
        //     obj.error = '';
        // }
        setPhotoName(obj);
    }

    const onProfileSave = (isSaved: boolean) => {
        if (props?.onSave) {
            return props.onSave(true);
        } else {
            console.log(' No Event ');
        }
    }

    const handelOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        console.log(' #### name ', name);
        console.log(' #### name ', value);
    }

    const onContactNameChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 30)) {
            obj.error = '';
        } else {
            obj.error = 'Alphabets only'
        }
        setContactNameInfo(obj);
    }
    const onMobileNoChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 30)) {
            obj.error = '';
        } else {
            obj.error = 'Alphabets only'
        }
        setMobileNoInfo(obj);
    }

    const onEmailIdChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 30)) {
            obj.error = '';
        } else {
            obj.error = 'Alphabets only'
        }
        setEmailIdInfo(obj);
    }

    const onLandlineExtChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 30)) {
            obj.error = '';
        } else {
            obj.error = 'Alphabets only'
        }
        setLandLineExtInfo(obj);
    }
    const onLandlineNoChange = (event: any) => {
        const obj = {
            val: event.target.value || '',
            error: ''
        } as objectData;
        if (validateCharacterLength(obj.val, 4, 30)) {
            obj.error = '';
        } else {
            obj.error = 'Alphabets only'
        }
        setLandLineNoInfo(obj);
    }

    const onAddressUpdate = (data: Address) => {
        const addressData = {} as Address;
        addressData.addressType = data.addressType;
        addressData.city = data.city;
        addressData.country = data.country;
        addressData.state = data.state;
        addressData.pincode = data.pincode;
        addressData.plotNo = data.plotNo;
        addressData.houseNo = data.houseNo;
        addressData.streetDetails = data.streetDetails;
        console.log(addressData);
        setCompanyAddressInfo(addressData);
    }
    const buildContactInfo = () => {
        const contactInfo = {} as Contact;
        contactInfo.contactName = contactNameInfo.val;
        contactInfo.mobileNo = mobileNoInfo.val;
        contactInfo.emailId = emailIdInfo.val;
        contactInfo.landLineExt = landLineExtInfo.val;
        contactInfo.landLine = landLineNoInfo.val;
        return contactInfo;
    }
    
    const onSave = () => {
        const postData = {} as AddCompanyPostData ;
        postData.compyName = companyNameInfo.val;
        postData.compyDesc = companyDescription.val;
        postData.url = companyUrlInfo.val;
        postData.gstNo = gstIdInfo.val;
        postData.addresses = [companyAddressInfo];
        postData.contact = [ buildContactInfo()];
        
        setLoaderState(true);

        api.addCompany(postData).then((response) => {
            setLoaderState(false); setStep(3);
            swal('Success! Your company has been created successfully!', {
                icon: "success",
            });
            console.log(' Company creation res >>>>>> ', response);
        }).catch((error)=>{
            setLoaderState(false);
            console.log(' Company creation erroor ', error);
        });

        // switch (step) {
        //     case 1:
        //         // console.log("businessProfile=", values)
        //         setLoaderState(false);
        //         setStep(2);
        //         break;
        //     case 2: setLoaderState(false); setStep(3); break;
        //     case 3:
        //         swal('Success! Your company has been created successfully!', {
        //             icon: "success",
        //         });
        //         break;
        // }
    }

    const showCompanyInformation = () => {
        return (
            <div>
                <div className='m-bot-md'>
                    <div className='m-bot-md p-md'>
                        <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                            <Grid item xs={9}>
                                <InputBox data={{ name: 'companyname', label: 'Company Name*', value: businessProfile.name }}
                                    onChange={onCompanyNameChange} onBlur={handelOnBlur}
                                />
                                <InputError errorText={companyNameInfo.error}/>

                                <InputBox data={{ name: 'companyurl', label: 'Company URL*', value: businessProfile.weburl }}
                                    onChange={onCompanyUrlChange} onBlur={handelOnBlur}
                                />
                                 <InputError errorText={companyUrlInfo.error}/>

                                <InputBox data={{ name: 'gstid', label: 'GST Number*', value: businessProfile.gstn }}
                                    onChange={onGstIdChange} onBlur={handelOnBlur}
                                />
                                <InputError errorText={gstIdInfo.error}/>
                                
                                <Grid item xs={12}>
                                    <div> Business Description </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextareaAutosize
                                        minRows={3}
                                        maxRows={4}
                                        maxLength={maxiLength}
                                        onChange={onCompanyDescriptionChange}
                                        aria-label='Add your business description'
                                        placeholder='Add your business description'
                                        style={{ width: '100%' }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <InputBox data={{ name: 'photoname', label: 'Photo Name', value: businessProfile.weburl }}
                                    onChange={onPhotoNameChange} onBlur={handelOnBlur}
                                />
                                <img src="/assets/images/placeholder.png" alt="Image" style={{ width: '100%', height: '25vh', marginTop: '10px' }} />
                                <input type="file" className="form-control" />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
    const showAddressInformation = () => {
        return (
            <div>
                <div className='m-bot-md'>
                    
                    <div className='p-md'>
                        {
                            <AddressDetails
                                addresLine1={businessProfile.address}
                                city={businessProfile.city}
                                state={businessProfile.state}
                                zip={businessProfile.zip}
                                country={businessProfile.country}
                                countryCode={selectedCountryCode}
                                onUpdate={onAddressUpdate}
                            />}
                    </div>
                </div>
            </div>
        );
    }
    const showContactInformation = () => {
        return (
            <div>
                <div className='m-bot-md'>
                    <div className='m-bot-md p-md'>
                        <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }} className='p-top-md'>
                            <Grid item xs={12}>
                                <InputBox data={{ name: 'contactname', label: 'Contact Name*', value: '' }}
                                    onChange={onContactNameChange}
                                />
                                 {contactNameInfo.error && <p className="text-red">{contactNameInfo.error}</p>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }} className='p-top-md'>
                            <Grid item xs={6}>
                                <InputBox data={{ name: 'mobileno', label: 'Mobile No.*', value: '' }}
                                    onChange={onMobileNoChange}
                                />
                                {mobileNoInfo.error && <p className="text-red">{mobileNoInfo.error}</p>}
                            </Grid>
                            <Grid item xs={6} >
                                <InputBox data={{ name: 'emailid', label: 'Email*', value: '' }}
                                    onChange={onEmailIdChange}
                                />
                                {emailIdInfo.error && <p className="text-red">{emailIdInfo.error}</p>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }} className='p-top-md'>
                            <Grid item xs={6}>
                                <InputBox data={{ name: 'landlineext', label: 'Landline Extension*', value: '' }}
                                    onChange={onLandlineExtChange} />
                                {landLineExtInfo.error && <p className="text-red">{landLineExtInfo.error}</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <InputBox data={{ name: 'landlineno', label: 'Landline No.*', value: '' }}
                                    onChange={onLandlineNoChange}
                                />
                                 {landLineNoInfo.error && <p className="text-red">{landLineNoInfo.error}</p>}
                            </Grid>
                        </Grid>
                    </div>
                </div>
               
            </div>
        );
    }

    return (
        <>
            {isLoader && (
                <LoaderSpinner />
            )}
            {/* {step == 1 && (
                <> {CompanyInformation()}</>
            )}
            {step == 2 && (
                <> {AddressInformation()}</>
            )}
            {step == 3 && (
                <> {ContactInformation()}</>
            )} */}
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className='primary-gradient'>
                        <div className='font-white p-sm f-18px f-bold'>Company Information</div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <> {showCompanyInformation()}</>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                    <div className='primary-gradient'>
                        <div className='font-white p-sm f-18px f-bold'>Address Information</div>
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <> {showAddressInformation()}</>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                    <div className='primary-gradient'>
                        <div className='font-white p-sm f-18px f-bold'>Contact Information</div>
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <> {showContactInformation()}</>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='p-md align-r' style={{ float: 'right' }}>
                    <button className='btn primary-btn-outline rounded-full' onClick={() => { setStep(2) }}> Cancel </button>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button className="btn primary-btn rounded-full" onClick={() => { onSave() }}> Save </button>
            </div>
        </>

    );
}

export default AddBusiness;
import React, { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import InputBox from "../../../atoms/textfield/InputBox";
import { WhsHours } from "../../../../utils/ResponseSchema";

interface WarehouseHoursProps {
    onWarehouseHoursUpdate?: (data: any) => void;
    data?: WhsHours;
}

const daysArry = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
let sendUpdate = false;
const WarehouseHours = (props: WarehouseHoursProps) => {

    const [selectedDays, setSelectedDays] = useState({});
    const [defaultHours, setDefaultHours] = useState<WhsHours>({});
    const [updatedHours, setUpdatedHours] = useState<WhsHours>({});

    useEffect(() => {
        defaultDataProcess(props?.data || {});
    },[]);

    useEffect(() => {
        if(sendUpdate) {
            onChangeUpdateInfo();
        }
    }, [updatedHours]);

    useEffect(() => {
        let tempSelectedDays = '';
        if(updatedHours.openall ) {
            tempSelectedDays = 'alldays';
        } else {
            const dayArry: string[] = [];
            for (const status in selectedDays) {
                if(selectedDays[status]) {
                    dayArry.push(status);
                }
            }
            tempSelectedDays = dayArry.join('|');
        }
        if(sendUpdate) {
            setUpdatedHours({...updatedHours, openday: tempSelectedDays});
        }
    }, [selectedDays]);

    const defaultDataProcess = (hrsData: WhsHours) => {
        sendUpdate = false;
        setDefaultHours(hrsData);
        setUpdatedHours({...updatedHours, openall: hrsData?.openall || false});
    }

    const onChangeUpdateInfo = () => {
        if(props?.onWarehouseHoursUpdate) {
            const tempObj = updatedHours;
            tempObj.isUpdated = true;
            props.onWarehouseHoursUpdate(tempObj);
        }
    }

    const availableAllDay = (isAllDay?: boolean) => {
        sendUpdate = true;
        if (isAllDay) {
            setUpdatedHours({...updatedHours, openall: true});
        } else {
            setUpdatedHours({...updatedHours, openall: false});
        }
    }
    const selectDays = (evn: any) => {
        const traget = evn.target.value;
        const status = evn.target.checked || false;
        sendUpdate = true;
        setSelectedDays({ ...selectedDays, [traget]: status });
    }

    const checkSelectedDays = (dayName: string) => {
        if (updatedHours.openall) {
            return true;
        } else {
            return selectedDays[dayName] ? true : false;
        }
    }

    const getMeridian = (time: string) => {
        let timeVal = time;
        if(time) {
            const splitTime = timeVal.split(':');
            const hours = Number(splitTime[0]);
            // const minutes = Number(splitTime[1]);
            if(hours < 12 ) {
                timeVal = `${timeVal}:AM`;
                return timeVal;
            } else {
                timeVal = `${timeVal}:PM`; 
                return timeVal;
            }
        } else {
            return "0:00";
        }
    }

    const onEndTimeChange = (event: any) => {
        sendUpdate = true;
        if(event.target.value) {
            const totime = getMeridian(event.target.value);
            setUpdatedHours({...updatedHours, endtime: totime});
        }
    }
    const onStartTimeChange = (event: any) => {
        sendUpdate = true;
        if(event.target.value) {
            const fromtime = getMeridian(event.target.value)
            setUpdatedHours({...updatedHours, starttime: fromtime});
        }
    }

    const showTime = () => {
        const desabled = updatedHours.openall || false;
        return(
            <div>
                <Grid className='mt-1' container spacing={2} columns={{ xs: 6, sm: 12, md: 12 }}>
                <Grid item xs={3}>
                    <div> Select Time Range </div>
                </Grid>
                <Grid item xs={8}>
                    <div className='sf-flex'>
                        <div className="m-right-md">
                            <InputBox data={{ type: 'time',  name: 'fromdate', label: 'From', isDisabled: desabled}}
                                onChange={onStartTimeChange} 
                            />
                        </div>
                        <div>
                            <InputBox data={{ type: 'time',  name: 'todate', label: 'To', isDisabled: desabled}}
                                onChange={onEndTimeChange}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
            </div>
        )
    }

    return (
        <>
            <div className='m-bot-lg'>
                <div className='primary-gradient m-bot-md'>
                    <div className='font-white p-sm f-18px f-bold'>Facility Hours</div>
                </div>

                <div className='p-md'>
                    <div>
                        <div>
                            <div className='sf-flex'>
                                <div className="m-right-md">
                                    <input type="radio" name="week" id="days" onChange={() => { availableAllDay(false) }} checked={!updatedHours.openall}/> Select Days Of Works
                                </div>
                                <div>
                                    <input type="radio" name="week" id="alldays" onChange={() => { availableAllDay(true) }} checked={updatedHours.openall}/> Available 24x7
                                </div>
                            </div>
                            <div className='sf-flex sf-justify p-top-md'>
                            {
                                daysArry.map((item, index) => {
                                    const keyId =  item.toLowerCase();
                                    return (
                                        <div key={keyId}> 
                                            <input type="checkbox" name={keyId} id={keyId} value={item} onChange={selectDays} checked={checkSelectedDays(item)} /> {item}
                                        </div>  
                                    )
                                })
                            }
                            </div>
                            <br />
                            {showTime()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WarehouseHours;
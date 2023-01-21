import React from 'react';
import  AddUser from './addUser';
import ViewUser from './viewUser';
import EditUser from './editUser';
import { ACTIONS_TYPE } from '../../utils/Constants';

interface UserInfoProps {
    onSave?(isSaved: boolean): void;
    action?: string;
}

const UserInfo = (props: UserInfoProps) => {
    if(ACTIONS_TYPE.add === props?.action) {
        return (
            <AddUser />
         );
    }else  if(ACTIONS_TYPE.edit === props?.action) {
        return (
            <EditUser />
         );
    } else {
        return (
            <ViewUser />
         );
    }
}
export default UserInfo;
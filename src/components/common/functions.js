import React, { Component } from "react";
import Const from '../common/constant'
import { NetInfo, AsyncStorage } from 'react-native';
class commonFunctions extends Component {
    static getEmployeesListFromServer(OrganizationID) {
        NetInfo.isConnected.fetch().done(
            (isConnected) => {
                if (isConnected) {
                    body = {
                        OrganizationID:OrganizationID
                    }
                    fetch(Const.API_ROOT + Const.GET_EMPLOYEES, {
                        method: 'POST',
                        headers: Const.API_HEADER,
                        body: JSON.stringify(body),
                    }).then((response) => response.json())
                        .then((responseJson) => {
                            this._storeData('AllEmployeesList', responseJson['employees'] ? responseJson['employees'] : [])
                        })
                        .catch((error) => {
                        });
                }
            })
    }
    static _storeData = async (key, data) => {
        try {
            if (data.length) {
                await AsyncStorage.setItem(key, JSON.stringify(data));
            }
        } catch (error) {
            // Error saving data
        }
    }
    static _getStoreData = async (key) => {
        try {
            var value = await AsyncStorage.getItem(key);
            value = JSON.parse(value)
            return value;
        } catch (error) {
            // Error saving data
        }
    }
}

export default commonFunctions
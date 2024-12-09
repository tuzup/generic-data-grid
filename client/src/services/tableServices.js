import * as api from '../api';

export const getAllDataService = async (setAlert, setAlertMessage) => {
    try {
        const response  = await api.getAllData();
        return response.data;
    } catch (error) {
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error.response.data);
        return false;
    }
}

export const getSingleDataService = async (id, setAlert, setAlertMessage) => {
    try {
        const response = await api.getSingleData(id);
        return response.data;
    } catch (error) {
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error?.response?.data);
        return false;
    }
}

export const deleteDataService = async (id, setAlert, setAlertMessage) => {
    try {
        const response = await api.deleteData(id);
        return response.data;
    } catch (error) {
        console.log(error);
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error?.response?.data);
        return false;
    }
}

export const initializeDataService = async (setAlert, setAlertMessage) => {
    try {
        const response = await api.initializeData();
        return response.data;
    } catch (error) {
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error?.response?.data);
        return false;
    }
}

export const searchDataService = async (searchJson, setAlert, setAlertMessage) => {
    try {
        const response = await api.searchData(searchJson);
        return response.data;
    } catch (error) {
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error?.response?.data?.error);

        return false;
    }
}

export const filterDataService = async (filterJson, setAlert, setAlertMessage) => {
    try {
        console.log("Inside Filter " + filterJson);
        const response = await api.filterData(filterJson);
        return response.data;
    } catch (error) {
        setAlert(true);
        console.log(error);
        if(error.status === 500) setAlertMessage('Oops! Seems like the server is down. Please try again later');
        else
        setAlertMessage('Oops! Something went worng : ' + error?.response?.data?.message);

        return false;
    }
}
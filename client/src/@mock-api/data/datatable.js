
    import { SERVICE_URL } from 'config';
    import axios from 'axios';
    axios.defaults.baseURL = SERVICE_URL;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const LoginService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/login`, requestData);
            return callback(response.data);
        } catch (error) {
            return callback(error);;
            // console.error(error);
        }
    }
    const AddDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/add-device`, requestData);
            return callback(response.data);
        } catch (error) {
            return callback(error);;
            // console.error(error);
        }
    }
    const AddAreaService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/addArea`, requestData, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
            });
            return callback(response.data);
        } catch (error) {
            return callback(error);;
            // console.error(error);
        }
    }
    const ListAreaService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/areaList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const SingleAreaService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/areaSingle`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const SingleDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/deviceareaList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const ListDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/deviceList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const DeleteDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/devicedelete`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const UpdateDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/deviceupdate`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const ReassignDeviceService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/reassigndevice`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const DeviceDetailsService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/devicedetails`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const DeviceAreaListService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/areaSingleName`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const DeviceAlertHistoryListService = async (requestData, callback) => {
        try {
            const response = await axios.post(`/devicealertList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const SingleDeviceDataService = async (requestData, callback) => {
            try {
                const response = await axios.post(`/sigleDevice`, requestData);
                return callback(response);
            } catch (error) {
                throw error;
                // console.error(error);
            }
    }
    const SetDeviceParameterService = async (requestData, callback) => {
        try {
            
            const response = await axios.post(`/deviceparameter`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const AddComment = async (requestData, callback) => {
        try {
            const response = await axios.post(`/comment_device`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const Commentlist = async (requestData, callback) => {
        try {
            const response = await axios.post(`/commentlist`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    const DeviceNotificationCloseServices = async (requestData, callback) => {
        try {
            const response = await axios.post(`/closeNotify`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    }
    // Member MOdule function 
    const AddMember = async (requestData, callback) => {
        try {
            const response = await axios({
                method  : "POST",
                url     : "/add-member",
                data    : requestData,
                headers : {
                  "Content-Type": "multipart/form-data"
                }
            });
            return callback(response.data);
        } catch (error) {
            return callback(error);;
            // console.error(error);
        }
    }
    const ListMember = async (requestData, callback) => {
        try {
            const response = await axios.post(`/memberList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    } 
    const MemberDetails = async (requestData, callback) => {
        try {
            const response = await axios.post(`/memberDetails`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    } 
    const EditMember = async (requestData, callback) => {
        try {
            
            const response = await axios({
                method  : "POST",
                url     : "/edit-member",
                data    : requestData,
                headers : {
                  "Content-Type": "multipart/form-data"
                }
            });
            return callback(response.data);
        } catch (error) {
            return callback(error);;
        }
    }
    const AddTeam = async (requestData, callback) => {
        try {
            const response = await axios({
                method  : "POST",
                url     : "/add-team",
                data    : requestData,
            });
            return callback(response.data);
        } catch (error) {
            return callback(error);
            // console.error(error);
        }
    }
    const TeamListData = async (requestData, callback) => {
        try {
            const response = await axios.post(`/teamList`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
        }
    } 
    const TeamDetails = async (requestData, callback) => {
        try {
            const response = await axios.post(`/teamDetails`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
            // console.error(error);
        }
    } 
    const teamAllotedHistory = async (requestData, callback) => {
        try {
            const response = await axios.post(`/teamAllotedHistory`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
        }
    } 
    const TeamMembers = async (requestData, callback) => {
        try {
            const response = await axios.post(`/teamMembers`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
        }
    } 
    const EditTeam = async (requestData, callback) => {
        try {
            const response = await axios({
                method  : "POST",
                url     : "/edit-team",
                data    : requestData,
            });
            return callback(response.data);
        } catch (error) {
            return callback(error);
            // console.error(error);
        }
    }
    const memberAllotedHistory = async (requestData, callback) => {
        try {
            const response = await axios.post(`/memberAllotedHistory`, requestData);
            return callback(response);
        } catch (error) {
            throw error;
        }
    } 
    export {
        LoginService, AddDeviceService, AddAreaService,
        ListAreaService, SingleAreaService, SingleDeviceService,
        ListDeviceService, DeleteDeviceService, ReassignDeviceService, DeviceDetailsService, DeviceAreaListService,
        UpdateDeviceService, DeviceAlertHistoryListService, SingleDeviceDataService,
        SetDeviceParameterService, AddComment, Commentlist, DeviceNotificationCloseServices, AddMember, ListMember, MemberDetails, EditMember, AddTeam, TeamListData, TeamDetails, teamAllotedHistory, TeamMembers, EditTeam, memberAllotedHistory
    }

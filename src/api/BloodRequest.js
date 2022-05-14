import API from './base';

const BloodRequest = {
  getSpecificBloodRequest: async (id) => {
    const options = {
      method: 'GET',
      url: `/blood_requests/${id}`,      
    }
    return await API.request(options);
  },
  getBloodRequests: async () => {
    const options = {
      method: 'GET',
      url: '/blood_requests'
    }
    return await API.request(options);
  },
  create: async (payload) => {
    const options = {
        method: 'POST',
        url: '/blood_requests',
        data: payload,
    };

    return await API.request(options);
  }
}

export default BloodRequest;
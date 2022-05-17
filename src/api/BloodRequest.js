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
  getOpenBloodRequestsForDonor: async (authuser) => {
    const options = {
      method: 'GET',
      url: `/blood_requests`,
      params: {blood_type_id: authuser.blood_type_id, user_id: authuser.id}
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
  },
  update: async (id, payload) => {
    const options = {
        method: 'PATCH',
        url: `/blood_requests/${id}`,
        data: payload,
    };

    return await API.request(options);
  },
  close: async (id) => {
    const options = {
        method: 'PATCH',
        url: `/blood_requests/${id}/close`,        
    };

    return await API.request(options);
  }
}

export default BloodRequest;
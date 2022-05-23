import API from './base';

const Appointment = {
  getOrgAllAppointments: async (param) => {
    let params = {transaction_type: 'allappointments_of_org'};
    if (param){
      params = {...params, keyword: param}
    }
    const options = {
      method: 'GET',
      url: '/appointments',
      params
    }
    return await API.request(options);
  },
  getDonorAllAppointments: async (param) => {
    let params = {transaction_type: 'allappointments_of_donor'}
    if (param){
      params = {...params, keyword: param}
    }
    const options = {
      method: 'GET',
      url: '/appointments',
      params
    }
    return await API.request(options);
  },
  getSpecificAppointment: async (id) => {
    const options = {
      method: 'GET',
      url: `/appointments/${id}`,      
    }
    return await API.request(options);
  },
  create: async (payload) => {
    const options = {
        method: 'POST',
        url: '/appointments',
        data: payload,
    };
    return await API.request(options);
  },
  update: async (id, payload) => {
    const options = {
        method: 'PATCH',
        url: `/appointments/${id}`,
        data: payload,
    };
    return await API.request(options);
  },
  complete: async (id) => {
    const options = {
        method: 'PATCH',
        url: `/appointments/${id}/complete`,
    };
    return await API.request(options);
  },
  cancel: async (id) => {
    const options = {
        method: 'PATCH',
        url: `/appointments/${id}/cancel`,
    };
    return await API.request(options);
  },
}

export default Appointment;
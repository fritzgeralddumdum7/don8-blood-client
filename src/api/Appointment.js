import API from './base';

const Appointment = {
  getOrgAllAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {transaction_type: 'allappointments_of_org'}
    }
    return await API.request(options);
  },
  getOrgDoneAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {transaction_type: 'completedappointments_of_org'}
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
  getDonorAllAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {transaction_type: 'allappointments_of_donor'}
    }
    return await API.request(options);
  },
  getDonorDoneAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {transaction_type: 'completedappointments_of_donor'}
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
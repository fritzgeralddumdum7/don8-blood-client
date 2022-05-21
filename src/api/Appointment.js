import API from './base';

const Appointment = {
  getOrgAllAppointments: async (organization_id) => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {organization_id}
    }
    return await API.request(options);
  },
  getOrgDoneAppointments: async (organization_id) => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {is_completed: true, organization_id: organization_id}
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
  getDonorAllAppointments: async (id) => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {user_id: id}
    }
    return await API.request(options);
  },
  getDonorDoneAppointments: async (user_id) => {
    const options = {
      method: 'GET',
      url: '/appointments',
      params: {is_completed: true, user_id: user_id}
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
import API from './base';

const Appointment = {
  getAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments'
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
  getDonorAppointments: async (id) => {
    const options = {
      method: 'GET',
      url: `/appointments?user_id=${id}`
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
}

export default Appointment;
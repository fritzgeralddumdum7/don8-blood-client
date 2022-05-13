import API from './base';

const Appointment = {
  getAppointments: async () => {
    const options = {
      method: 'GET',
      url: '/appointments'
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
  }
}

export default Appointment;
import API from './base';

const BloodType = {
    getBloodTypes: async () => {
        const options = {
            method: 'GET',
            url: '/test'
        }

        return await API.request(options);
    }
}

export default BloodType;

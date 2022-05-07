import API from './base';

const Organization = {
    getOrganizations: async () => {
        const options = {
            method: 'GET',
            url: '/organizations'
        }

        return await API.request(options);
    }
}

export default Organization;

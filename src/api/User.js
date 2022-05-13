import API from './base';

const Organization = {
	register: async (data) => {
		const options = {
			method: 'POST',
			url: '/signup',
			data
		}
		return await API.request(options);
	}
}

export default Organization;
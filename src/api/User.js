import API from './base';

const Organization = {
	register: async (data) => {
		const options = {
			method: 'POST',
			url: '/signup',
			data
		}
		return await API.request(options);
	},
	login: async (data) => {
		const options = {
			method: 'POST',
			url: '/login',
			data
		}
		return await API.request(options);
	},
	validate: async (data) => {
		const options = {
			method: 'POST',
			url: '/login',
			data
		}
		return await API.request(options);
	}
}

export default Organization;
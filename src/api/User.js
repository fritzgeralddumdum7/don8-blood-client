import API from './base';

const Organization = {
	upsert: async (data, method = 'POST') => {
		const options = {
			method,
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
	logout: async () => {
		const options = {
			method: 'DELETE',
			url: '/logout'
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
	},
	profile: async () => {
		const options = {
			method: 'GET',
			url: '/profile'
		}
		return await API.request(options);
	},
	validatePassword: async (data) => {
		const options = {
			method: 'POST',
			url: '/validate-password',
			data
		}
		return await API.request(options);
	},
	updatePassword: async (data) => {
		const options = {
			method: 'PUT',
			url: '/update-password',
			data
		}
		return await API.request(options);
	},
	getByRole: async (role) => {
		const options = {
			method: 'GET',
			url: '/users',
			params: {role}
		}
		return await API.request(options);
	}
}

export default Organization;
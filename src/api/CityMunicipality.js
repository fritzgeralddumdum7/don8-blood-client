import API from './base';

const CityMunicipality = {
	getCityMunicipalities: async (province_id) => {
		const options = {
			method: 'GET',
			url: `/city_municipalities?province_id=${province_id}`
		}
		console.log(province_id);
		return await API.request(options);
	}
}

export default CityMunicipality;
import API from './base';

const Case = {
  getCases: async () => {
    const options = {
      method: 'GET',
      url: '/cases'
    }
    return await API.request(options);
  }
}

export default Case;
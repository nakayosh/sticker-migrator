import axios from 'axios';

export default () => axios.create({
  transformResponse: [(data) => {
    try {
      return JSON.parse(data);
    } catch (Exception) {
      return data;
    }
  }],
});

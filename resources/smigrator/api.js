import axios from 'axios';
import csrfToken from './csrf_token';

export default () => axios.create({
  headers: {
    'X-CSRF-TOKEN': csrfToken,
  },

  transformResponse: [(data) => {
    try {
      return JSON.parse(data);
    } catch (Exception) {
      return data;
    }
  }],
});

import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '19711248-907051f488dd34261d2a66683';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

// const fetchImg = ({ q = '', page = 1 }) => {
//   return axios
//     .get(
//       `/?q=${q}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`,
//     )
//     .then(response => response.data.hits);
// };

const fetchImg = async ({ q = '', page = 1 }) => {
  try {
    const { data } = await axios.get('', {
      params: { q, page },
    });
    return data.hits;
  } catch (error) {
    console.log('error', { error });
    return [];
  }
};

fetchImg.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default { fetchImg };

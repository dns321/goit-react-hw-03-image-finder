import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '19711248-907051f488dd34261d2a66683';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImg = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(
      `/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=15`,
    )
    .then(response => response.data.hits);
};

fetchImg.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default { fetchImg };

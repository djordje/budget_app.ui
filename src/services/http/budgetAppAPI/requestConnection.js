import axios from 'axios';

const requestConnection = axios.create({
  baseURL: process.env.REACT_APP_BUDGET_APP_API_URL
});

export default requestConnection;
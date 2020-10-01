import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig

const instance = axios.create({
  baseURL: API_URL
});

export default instance;

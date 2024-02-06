import axios from 'axios';

export const get = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    // Error handling is up to you
    throw error;
  }
};

export const post = async (url, data, config = {}) => {
  try {
    const response = await axios.post(url, data, config);
    return response.data;
  } catch (error) {
    // Error handling is up to you
    throw error;
  }
};

export const put = async (url, data, config = {}) => {
  try {
    const response = await axios.put(url, data, config);
    return response.data;
  } catch (error) {
    // Error handling is up to you
    throw error;
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    // Error handling is up to you
    throw error;
  }
};

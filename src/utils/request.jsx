import axios from 'axios';

// const API_DOMAIN = 'http://localhost:3002/';

const API_DOMAIN = 'https://database-course.onrender.com/';

const request = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, 
});

// Hàm GET
export const get = async (path) => {
  try {
    const response = await request.get(path);
    return response.data;
  } catch (error) {
    console.error('GET error:', error);
    throw error.response || error;
  }
};

// Hàm POST
export const post = async (path, data = {}) => {
  try {
    const response = await request.post(path, data);
    return response.data;
  } catch (error) {
    console.error('POST error:', error);
    throw error.response || error;
  }
};

// Hàm PATCH
export const patch = async (path, id, data = {}) => {
  try {
    const response = await request.patch(`${path}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('PATCH error:', error);
    throw error.response || error;
  }
};

// Hàm DELETE
export const del = async (path, id) => {
  try {
    const response = await request.delete(`${path}/${id}`);
    return response.data;
  } catch (error) {
    console.error('DELETE error:', error);
    throw error.response || error;
  }
};

export default request;

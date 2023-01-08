import axios from 'axios';

const baseURL = 'https://api.dev.pastorsline.com/api';
// const baseURL = 'https://api.dev.pastorsline.com/api/contacts.json';

const APIService = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

APIService.interceptors.request.use(
  async request => {
    if (!request.params) {
      request.params = {};
    }
    if (!request.headers) request.headers = {};
    request.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs`;
    request.baseURL = baseURL;
    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

export default APIService;
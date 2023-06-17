import axios, { AxiosInstance } from 'axios';

require('dotenv').config();
const midtransAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.MIDTRANS_UAT_BASEURL, // Replace with your base URL
  headers: {
    'Content-Type': 'application/json'
  },
});

midtransAxiosInstance.interceptors.request.use((config) => {
    // Encode username and password in Base64
    const base64Token = Buffer.from(
      `${process.env.MIDTRANS_SERVER_KEY}:`
    ).toString('base64');
  
    // Set Authorization header with Basic authentication
    config.headers.Authorization = `Basic ${base64Token}`;
  
    return config;
  });

export default midtransAxiosInstance;

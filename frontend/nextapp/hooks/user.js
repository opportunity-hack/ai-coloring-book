import React from 'react';
import { get, post, put, del } from './network.js';



async function fetchData() {
  try {
    const data = await get('https://dummyjson.com/products/1');
    console.log(data)
    return data;
    // return data
  } catch (error) {
    console.error('There was an error fetching the data:', error);
    // Handle error
  }
}

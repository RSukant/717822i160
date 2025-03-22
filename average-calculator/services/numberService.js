const axios = require("axios");
const { API_URLS, HEADERS } = require("../config");

const fetchNumbers = async (type) => {
  try {
    const response = await axios.get(API_URLS[type], { headers: HEADERS, timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching numbers (${type}):`, error.message);
    return [];
  }
};

module.exports = { fetchNumbers };

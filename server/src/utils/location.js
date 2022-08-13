const axios = require("axios");

async function getLocation(ip, data, error) {
  try {
    const data = await axios.get(
      `https://api.ipfind.com/?ip=${ip.data.ip}&auth=614829d3-066a-4dd7-aaec-6a27bb82a58f`
    );

    return data;
  } catch (error) {}
}

module.exports = getLocation;

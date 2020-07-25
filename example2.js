const threeCommasAPI = require('./index')

const api = new threeCommasAPI({
  apiKey: '1',
  apiSecret: '1'
})

const ping = async function () {
  const response = await api.ping();
  console.log('response', response);
};

ping();

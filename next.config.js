/** @type {import('next').NextConfig} */
const cron = require('node-cron');
const axios = require('axios');
const getSheetData = require('./pages/lib/get-sheet-data');

const schedule6AM = '0 24 7 * * *'
cron.schedule(schedule6AM, async () => { // every day at 10:05:25 => 25 5 10 * * *
  try {
    console.info('Say scheduled hello')

    /* const sheetDataResponse = await axios.get('http://localhost:3000/api/get-sheet-data')

    if(sheetDataResponse.status !== 200){
      throw new Error('failed to get data from sheet')
    }

    const { sheetData } = sheetDataResponse.data
    console.log(sheetData); */

    const sheetData = await getSheetData()
    console.log(newData);

    // TODO: filter by today date

    //TODO: check if the components exists in the stock

    // TODO: sent email

  } catch (e) {
    console.error(e);
  }
});

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

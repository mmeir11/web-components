/** @type {import('next').NextConfig} */
const cron = require('node-cron');
const axios = require('axios');
const getSheetData = require('./pages/lib/get-sheet-data');
const sendEmail = require('./pages/lib/sendEmail');
const getMultipleFutureElectronics = require('./pages/lib/get-multiple-future-electronics');

const schedule6AM = '0 24 7 * * *'
cron.schedule(schedule6AM, async () => { // every day at 10:05:25 => 25 5 10 * * *
  try {
    console.info('Say scheduled hello')

    const sheetData = await getSheetData()
    console.log(newData);

    // TODO: filter by today date and get the parts as string array

    const parts = [
      "BAV99S,115",
      "BAT54STA",
      "NCP1070S0TGEVB"
    ]

    const electronicsData = await getMultipleFutureElectronics(parts)
    const mappedElectronicsData = mapMultipleElectronicsData()

    console.log(mappedElectronicsData);

    //TODO: check if the components exists in the stock

    // TODO: sent email
    let isEmailsSend
    const emailInfo = {
      to,
      from,
      subject,
      text,
      html,
      templateID
    }

    isEmailsSend = await sendEmail(emailInfo)
  } catch (e) {
    console.error(e);
  } finally {
    console.log(`email send: ${isEmailsSend}`);
  }
});

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['media.futureelectronics.com'],
  },


  publicRuntimeConfig: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    // GOOGLE_APPLICATION_CREDENTIALS789789789789789789789: process.env.GOOGLE_APPLICATION_CREDENTIALS789789789789789789789,
    FUTURE_ELECTRONICS_KEY: process.env.FUTURE_ELECTRONICS_KEY,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY: process.env.FUTURE_ELECTRONICS_KEY,
    FUTURE_ELECTRONICS_URL: process.env.FUTURE_ELECTRONICS_URL,
  }
}

module.exports = nextConfig

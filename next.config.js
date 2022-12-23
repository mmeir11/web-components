/** @type {import('next').NextConfig} */
const cron = require('node-cron');
const axios = require('axios');
const getSheetData = require('./lib/get-sheet-data');
const sendEmail = require('./lib/sendEmail');
const getMultipleFutureElectronics = require('./lib/get-multiple-future-electronics');

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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.http2 = false;
    }
    return config;
  },

  publicRuntimeConfig: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY,
    NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL: process.env.NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
    NEXT_PUBLIC_SPREADSHEET_ID: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
    // GOOGLE_APPLICATION_CREDENTIALS789789789789789789789: process.env.GOOGLE_APPLICATION_CREDENTIALS789789789789789789789,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY: process.env.NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY: process.env.NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY,
    NEXT_PUBLIC_FUTURE_ELECTRONICS_URL: process.env.NEXT_PUBLIC_FUTURE_ELECTRONICS_URL,
  }
}

module.exports = nextConfig

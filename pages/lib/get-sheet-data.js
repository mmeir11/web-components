const { google } = require('googleapis')
const { NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL, NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY, NEXT_PUBLIC_SPREADSHEET_ID } = require('../../consts')

const getSheetData = async () => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      NEXT_PUBLIC_GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (NEXT_PUBLIC_GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheetName = 'all'
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: NEXT_PUBLIC_SPREADSHEET_ID,
      range: sheetName,
    });

    const rows = response.data.values;

    if (rows.length) {
      const data = rows.map((row) => ({
        title: row[2],
        subtitle: row[3],
        code: row[4],
        browser: row[5],
        short_name: row[17],
        emojipedia_slug: row[18],
        descriptions: row[19],
      }));

      return data
    }

    return []
  } catch (err) {
    console.log(err);
  }
  return [];
}

module.exports = getSheetData
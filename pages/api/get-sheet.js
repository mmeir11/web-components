import { google } from 'googleapis'
import { GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, SPREADSHEET_ID } from '../../constants.js'

const getSheetData = async (req, res) => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheetName = 'Priority'
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: sheetName,
    });

    const rows = response.data.values;

    let sheetData = []
    if (rows.length) {
      sheetData = rows.slice(1).map((row) => ({
        partNumber: row[0],
        stock: row[1],
      }));
    }


    res.status(200).json({ sheetData })
    return { sheetData }
  } catch (err) {
    console.log(err);
  }
}

export default getSheetData
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getSheetData from '../lib/get-sheet-data';

export default async function handler(req, res) {
  try {
    const sheetData = await getSheetData()

    res.status(200).json({ sheetData })
  } catch (err) {
    console.log(err);

    res.status(400)
  }
}


// export default function handler(req, res) {

//   res.status(200).json({ name: 'John Doe' })
// }

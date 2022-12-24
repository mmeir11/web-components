import * as XLSX from 'xlsx'

const createExcelInBase64 = ({ workbook, sheetName = 'Sheet', data, headers = [] }) => {
    // Create an empty workbook
    const wb = workbook || XLSX.utils.book_new();

    data.unshift(headers)
    // Add a sheet with some data
    const sheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, sheet, sheetName);

    // Generate the Excel file in binary format
    // const binaryExcel = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    // Convert the binary data to base64
    // const base64Excel = Buffer.from(binaryExcel, 'binary').toString('base64');

    const base64Excel2 = XLSX.write(wb, { type: 'base64', compression: true });

    return base64Excel2;
}

export default createExcelInBase64
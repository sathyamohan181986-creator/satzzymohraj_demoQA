import * as XLSX from 'xlsx';
import path from 'path';

export function readExcelData(){
    const filepath = path.join(__dirname, '../test_data/data.xlsx');
    const workbook = XLSX.readFile(filepath); //your data sheet path
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data; //return all rows
}
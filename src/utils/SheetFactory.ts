import ExcelJS, { Column } from 'exceljs';

export class SheetFactory {
  private workbook;

  private currentWorksheet;

  constructor(title = 'Relatório') {
    this.workbook = new ExcelJS.Workbook();
    this.workbook.creator = 'Medium Tutorial';
    this.currentWorksheet = this.workbook.addWorksheet(title);
  }

  addEmptyRow() {
    this.currentWorksheet.addRow([]);
  }

  setColumnSizes(sizes: number[]) {
    this.currentWorksheet.columns = sizes.map(
      (size) => ({ width: size } as Column),
    );
  }

  addTitleRow(values: any[]) {
    this.addEmptyRow();

    const upperCasedValues = values.map((value) => String(value).toUpperCase());
    const row = this.currentWorksheet.addRow(upperCasedValues);

    row.font = { size: 18, bold: true };
    row.height = 22;
  }

  addSubtitleRow(values: any[]) {
    this.addEmptyRow();

    const row = this.currentWorksheet.addRow(values);

    row.font = { size: 17 };
    row.height = 20;
  }

  addRows(rows: any[]) {
    this.currentWorksheet.addRows(rows);
  }

  async finishSheet() {
    const buffer = await this.workbook.xlsx.writeBuffer();
    return buffer;
  }
}

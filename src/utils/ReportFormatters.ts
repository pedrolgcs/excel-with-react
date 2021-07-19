import Excel from "exceljs";

// types
import { IUsers } from "../types/IUsers";
import { IPurchases } from "../types/IPurchases";

class ReportFormatters {
  public static async users(file: FileList): Promise<IUsers[]> {
    const users: IUsers[] = [];

    // get file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file[0]);

    // create a workbook
    const workbook = new Excel.Workbook();

    return new Promise((resolve) => {
      reader.onload = () => {
        const buffer = reader.result as Buffer;

        workbook.xlsx.load(buffer).then((workbook) => {
          workbook.eachSheet((sheet) => {
            sheet.eachRow((row, rowIndex) => {
              if (rowIndex > 1) {
                const line = row.values as Array<any>;

                const user = {
                  id: line[1],
                  name: line[2],
                  purchases_value: Number(line[3]),
                };

                users.push(user);
              }
              resolve(users);
            });
          });
        });
      };
    });
  }

  public static async purchases(file: FileList): Promise<IPurchases[]> {
    const purchases: IPurchases[] = [];

    // get file
    const reader = new FileReader();
    reader.readAsArrayBuffer(file[0]);

    // create a workbook
    const workbook = new Excel.Workbook();

    return new Promise((resolve) => {
      reader.onload = () => {
        const buffer = reader.result as Buffer;

        workbook.xlsx.load(buffer).then((workbook) => {
          workbook.eachSheet((sheet) => {
            sheet.eachRow((row, rowIndex) => {
              if (rowIndex > 1) {
                const line = row.values as Array<any>;

                const purchase = {
                  id: line[1],
                  product: line[2],
                  value: Number(line[3]),
                  user_id: line[4],
                };

                purchases.push(purchase);
              }
              resolve(purchases);
            });
          });
        });
      };
    });
  }
}

export { ReportFormatters };

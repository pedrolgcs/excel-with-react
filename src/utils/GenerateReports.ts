// types
import { IUsers } from "../types/IUsers";
import { IPurchases } from "../types/IPurchases";

// helpers
import { formatCurrency } from "../helpers/formatCurrency";

// utils
import { SheetFactory } from "./SheetFactory";

class GenerateReports {
  public static async users(
    users: IUsers[],
    purchases: IPurchases[]
  ): Promise<Blob> {
    users.forEach((user) => {
      purchases.forEach((purchase) => {
        if (user.id === purchase.user_id) {
          user.purchases_value += purchase.value;
        }
      });
    });

    const sheet = new SheetFactory();

    sheet.setColumnSizes([30, 30, 50]);

    sheet.addTitleRow(["Relatório"]);

    sheet.addSubtitleRow(["ID", "Nome", "valor das compras"]);

    const userRows = users.map(({ id, name, purchases_value }) => [
      id,
      name,
      formatCurrency(purchases_value),
    ]);

    sheet.addRows(userRows);

    const buffer = await sheet.finishSheet();

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    return new Blob([buffer], { type: fileType });
  }
}

export { GenerateReports };

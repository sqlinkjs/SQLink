/** this is a new feature introducing in 1.1.8 and it basically gives you the enums 
 * for the table to avoid typo's while you query your database/tables
*/

import { STRINGS } from "./../strings.js";
import { SQLog } from "../utils/logger/logger.js";
import { getPool } from "../mysql/connector.js";
import clipboardy from "clipboardy";

export async function generateEnum() {
    try {
        const tableName = process.argv[3];
        if (!tableName) {
            SQLog.error(STRINGS.ENUM_INVALID_TABLE, false);
            throw new Error(STRINGS.INVALID_TABLE_NAME);
        }
        const pool = getPool();
        let query = `SHOW COLUMNS FROM ${tableName}`;
        let [rows] = await pool.query(query)
        let enumString = generateEnumString(rows, tableName);
        SQLog.enum(enumString)
        pool.end();
        SQLog.success(STRINGS.ENUM_GENERATED_SUCCESS, true);
        clipboardy.writeSync(enumString);
        SQLog.success(STRINGS.ENUM_COPIED_CLIPBOARD, true);
        return
    } catch (error) {
        SQLog.error(STRINGS.ENUM_GENERATION_FAILED +":"+error.message, false);
        process.exit(1);
    }
}

function generateEnumString(rows, tableName) {
    try {
        const enumString = `export enum ${tableName.toUpperCase()}_Enum {\n${rows.map((row) => {
            let enumRow = row.Field;
            return `\t${enumRow} = "${enumRow}"`
        }).join(",\n")}\n}`
        return enumString
    } catch (error) {
        throw new Error(error.message)
    }
}
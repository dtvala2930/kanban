import { DataSource, type DataSourceOptions } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "~configs/app.config";

export const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

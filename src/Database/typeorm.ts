import { DataSource } from 'typeorm';
import config from './ormConfig';
export const dataSource = new DataSource(config);

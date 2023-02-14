import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    synchronize: false,
    logging: false,
    // ssl:{
    //     rejectUnauthorized:false,
    // }
};

export default config;

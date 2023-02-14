import { DataSource } from 'typeorm';
import config from './ormConfig';

export const dbHelperConnection = {
    client: null as unknown as DataSource,

    async connect(): Promise<void> {
        this.client = new DataSource(config);
        await this.client.initialize();
    },

    async disconnect(): Promise<void> {
        await this.client.destroy();
        this.client = null as any;
    },
};

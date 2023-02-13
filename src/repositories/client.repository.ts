import IClient from '../interfaces/client.interface';
import db from '../Database/dbConection';

export class Client {
    async getAllClients(): Promise<IClient[]> {
        // Aqui criamos o metodo para trazer de client todos os clientes inseridos na tabela
        const response = await db.query('SELECT * FROM client');
        const result = response.rows.map((client: IClient) => client);
        console.log(result);

        return result;
    }

    async postClient({ username, password }: Partial<IClient>): Promise<void> {
        // aqui o metodo insere um client na tabela de clientes
        await db.query('INSERT INTO client(username, password) VALUES ($1, $2)', [
            username,
            password,
        ]);
    }

    async getClientById(id: string): Promise<IClient | undefined> {
        // busca o client pelo uid
        const response = await db.query(`SELECT * FROM client WHERE uid=$1`, [id]);
        if (response.rowCount === 0) return undefined;
        const result = response.rows[0];
        console.log(result);

        return result;
    }

    async putClient(client: Partial<IClient>): Promise<void> {
        await db.query(
            'UPDATE client SET username = $1, password = $2, updated_at = $3,  WHERE uid = $4',
            [client.username, client.password, client.updated_at, client.uid]
        );
    }

    async deleteClient(id: string): Promise<boolean> {
        const result = await db.query('DELETE FROM client WHERE uid = $1', [id]);
        return result.rowCount !== 0;
    }
}

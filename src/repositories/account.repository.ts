import IAccount from '../interfaces/account.interface';
import db from '../Database/dbConection';

export default class Account {
    async getAllAccounts(): Promise<IAccount[]> {
        const response = await db.query('SELECT * FROM account');
        const result = response.rows.map((account: IAccount) => account);
        console.log(result);

        return result;
    }

    async postAccount({ number_account, client_id }: Partial<IAccount>): Promise<void> {
        // aqui o metodo insere um client na tabela de clientes
        await db.query(
            'INSERT INTO account(number_account, balance,client_id) VALUES ($1, $2,$3)',
            [number_account, 0, client_id]
        );
    }

    async getAccountById(id: string): Promise<IAccount | undefined> {
        // busca o client pelo uid
        const response = await db.query(`SELECT * FROM account WHERE uid=$1`, [id]);
        if (response.rowCount === 0) return undefined;
        const result = response.rows[0];
        console.log(result);

        return result;
    }

    async putAccountBalance(account: Partial<IAccount>): Promise<void> {
        await db.query('UPDATE account SET balance = $1,  updated_at = $2,  WHERE uid = $3', [
            account.balance,
            account.updated_at,
            account.uid,
        ]);
    }

    async deleteAccount(id: string): Promise<boolean> {
        const result = await db.query('DELETE FROM account WHERE uid = $1', [id]);
        return result.rowCount !== 0;
    }
}

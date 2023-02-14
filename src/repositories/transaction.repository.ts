import ITransaction from '../interfaces/transaction.interface';
import { dbHelperConnection } from '../Database/db-helper-connection';

export default class Transaction {
    async getAllTransactions(): Promise<ITransaction[]> {
        const response = await dbHelperConnection.client.query('SELECT * FROM transactions');
        const result = response.rows.map((transactions: ITransaction) => transactions);
        console.log(result);

        return result;
    }

    async postTransactions({
        trans_value,
        trans_type,
        account_id,
    }: Partial<ITransaction>): Promise<void> {
        // aqui o metodo insere um client na tabela de clientes
        await dbHelperConnection.client.query(
            'INSERT INTO transactions(trans_value,trans_type,account_id) VALUES ($1, $2,$3)',
            [trans_value, trans_type, account_id]
        );
    }

    async getTransactionsById(id: string): Promise<ITransaction | undefined> {
        // busca o client pelo uid
        const response = await dbHelperConnection.client.query(
            `SELECT * FROM transactions WHERE uid=$1`,
            [id]
        );
        if (response.rowCount === 0) return undefined;
        const result = response.rows[0];
        console.log(result);

        return result;
    }

    async putTransactionsBalance(transactions: Partial<ITransaction>): Promise<void> {
        await dbHelperConnection.client.query(
            'UPDATE transactions SET trans_value = $1,trans_type = $2,  updated_at = $3  WHERE uid = $4',
            [
                transactions.trans_value,
                transactions.trans_type,
                transactions.updated_at,
                transactions.uid,
            ]
        );
    }

    async deleteTransaction(id: string): Promise<boolean> {
        const result = await dbHelperConnection.client.query(
            'DELETE FROM transactions WHERE uid = $1',
            [id]
        );
        return result.rowCount !== 0;
    }
}

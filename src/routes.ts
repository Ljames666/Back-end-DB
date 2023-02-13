import { Express, Request, Response } from 'express';
import { Client } from './repositories/client.repository';
import Account from './repositories/account.repository';
import Transaction from './repositories/transaction.repository';

export default (app: Express) => {
	app.get('/', (req: Request, res: Response) =>
		res.send('<h1>Transactions Api</h1>')
	);

	const clienBank = new Client();

	app.get('/client', async (req: Request, res: Response) => {
		const result = await clienBank.getAllClients();
		res.status(200).send(result);
	});

	app.post('/client', (req: Request, res: Response) => {
		const { username, password } = req.body;
		clienBank.postClient({ username, password });
		res.status(201).send('ok');
	});
	app.put('/client/:uid', (req: Request, res: Response) => {
		const { uid } = req.params;
		const { username, password } = req.body;
		const client = {
			username,
			password,
			update_at: new Date(),
			uid,
		};
		clienBank.putClient(client);
		res.status(200).send('Modified Successfully');
	});

	app.delete('/client/:uid', (req: Request, res: Response) => {
		const { uid } = req.params;
		clienBank.deleteClient(uid);
		res.status(200).end();
	});

	// rotas de contas

	const account = new Account();
	const transaction = new Transaction();

	app.get('/account', async (req: Request, res: Response) => {
		const result = await account.getAllAccounts();
		res.status(200).send(result);
	});

	app.get('/account/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		const transactions = (await transaction.getAllTransactions()).filter(
			(transaction) => transaction.account_id === id
		);

		account.updateAccountBalance(transactions, id);

		const result = await account.getAccountById(id);

		res.status(200).send(result);
	});

	app.post('/account', async (req: Request, res: Response) => {
		const { number_account, client_id } = req.body;

		account.postAccount({ number_account, client_id });

		res.status(201).send('Conta criada com sucesso');
	});

	app.put('/account', async (req: Request, res: Response) => {
		const { balance, uid } = req.body;

		const updated_at = new Date();

		account.putAccountBalance({ balance, updated_at, uid });

		res.status(200).send('Saldo atualizado com sucesso');
	});

	app.delete('/account/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		account.deleteAccount(id);

		res.status(200).send('Conta deletada com sucesso');
	});

	// rotas de transações

	app.get('/transactions', async (req: Request, res: Response) => {
		const result = await transaction.getAllTransactions();

		res.status(200).send(result);
	});

	app.get('/transactions/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		const result = await transaction.getTransactionsById(id);

		res.status(200).send(result);
	});

	app.post('/transactions', async (req: Request, res: Response) => {
		const { trans_value, trans_type, account_id } = req.body;

		transaction.postTransactions({
			trans_value,
			trans_type,
			account_id,
		});

		res.status(201).send('Transação efetuada com sucesso');
	});

	app.put('/transactions', async (req: Request, res: Response) => {
		const { trans_value, trans_type, uid } = req.body;

		const updated_at = new Date();

		transaction.putTransactionsBalance({
			trans_value,
			trans_type,
			updated_at,
			uid,
		});

		res.status(200).send('Transação atualizada com sucesso');
	});

	app.delete('/transactions/:id', async (req: Request, res: Response) => {
		const { id } = req.params;

		transaction.deleteTransaction(id);

		res.status(200).send('Transação excluída com sucesso');
	});
};

import { Express, Request, Response } from 'express';
import { Client } from './repositories/client.repository';
import Account from './repositories/account.repository';

export default (app: Express) => {
    app.get('/', (req: Request, res: Response) => res.send('<h1>Transactions Api</h1>'));

    const clienBank = new Client();

    app.get('/client', async (req: Request, res: Response) => {
        const result = await clienBank.getAllClients();
        res.status(200).send(result);
    });

    app.post('/client', (req: Request, res: Response) => {
        const { username, password } = req.body;
        clienBank.postClient({ username, password });
        res.status(200).send('ok');
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

    app.get('/account', async (req: Request, res: Response) => {
        const result = await account.getAllAccounts();
        res.status(200).send(result);
    });
};

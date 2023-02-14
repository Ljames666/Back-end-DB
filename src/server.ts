import express from 'express';
import cors from 'cors';
import appRoutes from './routes';
import { dbHelperConnection } from './Database/db-helper-connection';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json(), cors());

appRoutes(app);

dbHelperConnection
    .connect()
    .then(() => {
        app.listen(port, () => console.log(`tá on na porta: ${port}`));
    })
    .catch((err) => console.error(err));

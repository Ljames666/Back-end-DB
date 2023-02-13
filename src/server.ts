import express from 'express';
import cors from 'cors';
import appRoutes from './routes';

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json(), cors());

appRoutes(app);

app.listen(port, () => console.log(`tá on na porta: ${port}`));

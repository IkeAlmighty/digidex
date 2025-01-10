import express from 'express';
import routes from './routes/index.js'

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.use(routes);

app.listen(PORT, () => console.log(`express server listening on port ${PORT}`));
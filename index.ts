import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/accomplice/discord', async (req: Request, res: Response) => {
	console.log('Hello there');
	res.sendStatus(200);
});

app.post('/accomplice/discord', async (req: Request, res: Response) => {
	console.log(req.body);
	
	fetch(process.env.DISCORD_HOOK_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: 'I\'m a bot',
			content: "hello there",
		}),
	})
	.then(r => res.sendStatus(200));
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

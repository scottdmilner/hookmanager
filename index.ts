import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { verifyMessage } from './util';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/accomplice/discord', async (req: Request, res: Response) => {
	console.log('Hello there');
	res.sendStatus(200);
});

app.post('/accomplice/discord', (req: Request, res: Response) => {
	console.log(req.body);

	if (!verifyMessage(req, process.env.SECRET_TOKEN as string)) {
		console.log('Bad request!');
		res.sendStatus(401);
		return;
	}
	
	const message = `
	**A thing has happened!** :confetti_ball:
There was a \`${req.body.data.meta.type}\` on the entity \`${req.body.data.entity.id}\`!
Have a great day :relaxed:`

	fetch(process.env.DISCORD_HOOK_URL as string, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: 'ShBotGrid',
			content: message,
		}),
	})
	.then((fetchResponse) => {
		if (fetchResponse.ok) res.sendStatus(200);
		else                  res.sendStatus(500);
	});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
